"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

// Définition des planètes et leurs propriétés
interface Planet {
  name: string
  solarName: string // Nom du système solaire
  radius: number
  distance: number
  rotationSpeed: number
  orbitSpeed: number
  color: string
  path: string
  description: string
  diameter: string
  distanceFromSun: string
  orbitalPeriod: string
  texture?: string
  rings?: boolean
  moons?: { distance: number; radius: number; color: string }[]
}

// Données des constellations
const constellationData = [
  {
    name: "Orion",
    positions: [
      [-150, 30, -180],
      [-140, 50, -190],
      [-130, 70, -200],
      [-160, 60, -210],
      [-170, 40, -220],
      [-120, 20, -230],
      [-110, 0, -240],
    ],
    size: 2.0,
    color: [1.0, 0.9, 0.8],
  },
  {
    name: "Cassiopée",
    positions: [
      [50, 100, -150],
      [70, 110, -160],
      [90, 100, -170],
      [110, 120, -180],
      [130, 110, -190],
    ],
    size: 1.7,
    color: [0.8, 0.8, 1.0],
  },
  {
    name: "Scorpion",
    positions: [
      [-80, -50, 200],
      [-60, -60, 210],
      [-40, -65, 220],
      [-20, -70, 230],
      [0, -80, 240],
      [20, -90, 250],
      [40, -100, 260],
      [60, -110, 270],
      [80, -105, 280],
      [100, -95, 290],
    ],
    size: 1.9,
    color: [1.0, 0.7, 0.7],
  },
  {
    name: "Taureau",
    positions: [
      [180, 20, 150],
      [190, 30, 160],
      [200, 40, 170],
      [210, 30, 180],
      [220, 20, 190],
      [230, 10, 200],
      [240, 0, 210],
    ],
    size: 1.8,
    color: [0.9, 0.8, 0.6],
  },
  {
    name: "Cygne",
    positions: [
      [0, 150, 180],
      [20, 160, 190],
      [40, 170, 200],
      [60, 180, 210],
      [80, 190, 220],
      [40, 170, 200],
      [40, 150, 200],
      [40, 130, 200],
    ],
    size: 1.7,
    color: [0.8, 0.9, 1.0],
  },
  {
    name: "Sagittaire",
    positions: [
      [-200, -30, 100],
      [-190, -40, 110],
      [-180, -50, 120],
      [-170, -40, 130],
      [-160, -30, 140],
      [-170, -20, 150],
      [-180, -10, 160],
      [-170, -40, 130],
      [-160, -50, 120],
      [-150, -60, 110],
    ],
    size: 1.6,
    color: [1.0, 0.8, 0.6],
  },
  {
    name: "Lion",
    positions: [
      [150, 30, 100],
      [170, 40, 110],
      [190, 35, 120],
      [210, 30, 130],
      [230, 25, 140],
      [210, 30, 130],
      [200, 10, 135],
      [190, -10, 140],
      [210, 30, 130],
      [200, 50, 135],
      [190, 70, 140],
    ],
    size: 1.7,
    color: [0.9, 0.8, 0.7],
  },
  {
    name: "Poissons",
    positions: [
      [-100, -20, -150],
      [-90, -30, -160],
      [-80, -40, -170],
      [-70, -50, -180],
      [-60, -60, -190],
      [-50, -70, -200],
      [-40, -60, -210],
      [-30, -50, -220],
      [-20, -40, -230],
      [-10, -30, -240],
    ],
    size: 1.5,
    color: [0.7, 0.8, 0.9],
  },
  {
    name: "Gémeaux",
    positions: [
      [0, 80, -180],
      [10, 90, -170],
      [20, 100, -160],
      [30, 110, -150],
      [20, 100, -160],
      [10, 110, -170],
      [0, 120, -180],
      [-10, 110, -190],
      [-20, 100, -200],
      [-10, 110, -190],
      [0, 120, -180],
    ],
    size: 1.6,
    color: [0.8, 0.9, 0.8],
  },
  {
    name: "Croix du Sud",
    positions: [
      [0, -120, -100],
      [0, -140, -100],
      [0, -160, -100],
      [0, -140, -100],
      [-10, -140, -100],
      [10, -140, -100],
    ],
    size: 2.2,
    color: [1.0, 0.9, 0.9],
  },
  {
    name: "Andromède",
    positions: [
      [100, 120, 100],
      [110, 130, 110],
      [120, 140, 120],
      [130, 150, 130],
      [140, 160, 140],
      [150, 170, 150],
      [160, 180, 160],
    ],
    size: 1.7,
    color: [0.9, 0.7, 0.9],
  },
  {
    name: "Bélier",
    positions: [
      [-200, 100, -100],
      [-180, 120, -120],
      [-160, 130, -140],
      [-140, 125, -160],
      [-120, 110, -180],
      [-100, 95, -200],
    ],
    size: 1.6,
    color: [1.0, 0.8, 0.6],
  },
  {
    name: "Cancer",
    positions: [
      [50, 50, 50],
      [70, 60, 70],
      [90, 55, 90],
      [110, 65, 110],
      [130, 60, 130],
    ],
    size: 1.5,
    color: [0.7, 0.9, 1.0],
  },
  {
    name: "Vierge",
    positions: [
      [100, 0, -100],
      [120, 10, -110],
      [140, 20, -120],
      [160, 10, -130],
      [180, 0, -140],
      [200, -10, -150],
    ],
    size: 1.7,
    color: [0.9, 1.0, 0.8],
  },
  {
    name: "Balance",
    positions: [
      [-100, 100, 100],
      [-80, 110, 110],
      [-60, 120, 120],
      [-40, 110, 130],
      [-20, 100, 140],
    ],
    size: 1.6,
    color: [1.0, 0.9, 0.7],
  },
  {
    name: "Capricorne",
    positions: [
      [100, -100, 100],
      [110, -110, 110],
      [120, -120, 120],
      [130, -110, 130],
      [140, -100, 140],
    ],
    size: 1.6,
    color: [0.8, 0.7, 1.0],
  },
  {
    name: "Verseau",
    positions: [
      [-100, 200, 0],
      [-80, 210, 10],
      [-60, 220, 20],
      [-40, 210, 30],
      [-20, 200, 40],
    ],
    size: 1.5,
    color: [0.7, 0.8, 1.0],
  },
  {
    name: "Grande Ourse",
    positions: [
      [-200, 200, -50],
      [-180, 180, -40],
      [-160, 160, -30],
      [-140, 180, -20],
      [-120, 200, -10],
      [-100, 220, 0],
      [-80, 240, 10],
    ],
    size: 2.2,
    color: [0.9, 0.9, 1.0],
  },
  {
    name: "Petite Ourse",
    positions: [
      [-150, 150, -30],
      [-140, 140, -20],
      [-130, 130, -10],
      [-120, 140, 0],
      [-110, 150, 10],
    ],
    size: 1.9,
    color: [0.9, 0.9, 0.8],
  },
]

export function SolarSystem3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const controlsRef = useRef<OrbitControls | null>(null)
  const planetsRef = useRef<THREE.Mesh[]>([])
  const planetsDataRef = useRef<Planet[]>([])
  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const [followingPlanet, setFollowingPlanet] = useState<THREE.Mesh | null>(null)
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)
  const animationRef = useRef<number | null>(null)
  const initialCameraPositionRef = useRef<THREE.Vector3 | null>(null)
  const initialControlsTargetRef = useRef<THREE.Vector3 | null>(null)
  const originalOrbitSpeedsRef = useRef<Map<THREE.Mesh, number>>(new Map())
  const [controlsEnabled, setControlsEnabled] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    // Configuration des planètes mise à jour
    const planets: Planet[] = [
      {
        name: "A propos",
        solarName: "Mercure",
        radius: 0.8,
        distance: 10,
        rotationSpeed: 0.01,
        orbitSpeed: 0.005,
        color: "#c0c0c0",
        path: "/a-propos",
        description:
            "Découvrez mon parcours, mes compétences et ma passion pour le développement web. Cette section présente mon profil professionnel et personnel.",
        diameter: "4 880 km",
        distanceFromSun: "57,9 millions km",
        orbitalPeriod: "88 jours",
        texture: "/textures/mercury.jpg",
      },
      {
        name: "Réalisations",
        solarName: "Vénus",
        radius: 1.2,
        distance: 16,
        rotationSpeed: 0.008,
        orbitSpeed: 0.003,
        color: "#e39e54",
        path: "/realisations",
        description:
            "Explorez mon portfolio de projets et réalisations. Cette galerie présente mes travaux les plus significatifs et démontre mes compétences techniques.",
        diameter: "12 104 km",
        distanceFromSun: "108,2 millions km",
        orbitalPeriod: "225 jours",
        texture: "/textures/venus.jpg",
      },
      {
        name: "Veille",
        solarName: "Terre",
        radius: 1.0,
        distance: 22,
        rotationSpeed: 0.012,
        orbitSpeed: 0.002,
        color: "#4dabf7",
        path: "/veille",
        description:
            "Ma veille technologique où je partage des articles, ressources et réflexions sur les dernières tendances du développement web et des technologies émergentes.",
        diameter: "12 756 km",
        distanceFromSun: "149,6 millions km",
        orbitalPeriod: "365,25 jours",
        texture: "/textures/earth.jpg",
        moons: [{ distance: 2, radius: 0.27, color: "#c0c0c0" }],
      },
      {
        name: "Contact",
        solarName: "Mars",
        radius: 0.9,
        distance: 28,
        rotationSpeed: 0.009,
        orbitSpeed: 0.001,
        color: "#fa5252",
        path: "/contact",
        description:
            "Entrez en contact avec moi pour discuter de collaborations, opportunités professionnelles ou simplement échanger sur des sujets techniques.",
        diameter: "6 792 km",
        distanceFromSun: "227,9 millions km",
        orbitalPeriod: "687 jours",
        texture: "/textures/mars.jpg",
        moons: [
          { distance: 1.8, radius: 0.1, color: "#c0c0c0" },
          { distance: 2.2, radius: 0.08, color: "#c0c0c0" },
        ],
      },
      {
        name: "Laboratoire",
        solarName: "Jupiter",
        radius: 1.8,
        distance: 34,
        rotationSpeed: 0.015,
        orbitSpeed: 0.0008,
        color: "#fcc419",
        path: "/laboratoire",
        description:
            "Espace d'expérimentation où je teste de nouvelles idées, concepts et technologies avant de les intégrer dans mes projets principaux.",
        diameter: "142 984 km",
        distanceFromSun: "778,5 millions km",
        orbitalPeriod: "11,86 ans",
        texture: "/textures/jupiter.jpg",
        moons: [
          { distance: 2.5, radius: 0.15, color: "#c0c0c0" },
          { distance: 3.0, radius: 0.12, color: "#e0e0e0" },
          { distance: 3.5, radius: 0.18, color: "#d0d0d0" },
          { distance: 4.0, radius: 0.14, color: "#c8c8c8" },
        ],
      },
      {
        name: "Autre",
        solarName: "Saturne",
        radius: 1.6,
        distance: 42,
        rotationSpeed: 0.01,
        orbitSpeed: 0.0006,
        color: "#e9d8a6",
        path: "/test",
        description:
            "Contenu supplémentaire et ressources diverses qui ne rentrent pas dans les autres catégories mais qui complètent mon univers numérique.",
        diameter: "120 536 km",
        distanceFromSun: "1,4 milliard km",
        orbitalPeriod: "29,46 ans",
        texture: "/textures/saturn.jpg",
        rings: true,
        moons: [
          { distance: 2.5, radius: 0.12, color: "#d0d0d0" },
          { distance: 3.0, radius: 0.1, color: "#c0c0c0" },
        ],
      },
    ]

    planetsDataRef.current = planets

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 30, 40)
    cameraRef.current = camera
    initialCameraPositionRef.current = camera.position.clone()

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 1)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    rendererRef.current = renderer

    if (containerRef.current) {
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild)
      }
      containerRef.current.appendChild(renderer.domElement)
      renderer.domElement.style.touchAction = "none"
      renderer.domElement.style.outline = "none"
      renderer.domElement.style.display = "block"
    }

    // Post-processing setup
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.7, 0.5, 0.75)
    composer.addPass(bloomPass)

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.minDistance = 10
    controls.maxDistance = 200
    controls.maxPolarAngle = Math.PI
    controls.minPolarAngle = 0
    controls.autoRotate = false
    controls.enableRotate = true
    controls.rotateSpeed = 0.5
    controls.enableZoom = true
    controls.zoomSpeed = 1.0
    controls.enablePan = true
    controls.panSpeed = 0.8
    controls.screenSpacePanning = true
    controls.target.set(0, 0, 0)
    initialControlsTargetRef.current = controls.target.clone()
    controlsRef.current = controls

    // Keyboard controls
    const keysPressed = { z: false, q: false, s: false, d: false, a: false, e: false }

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (key in keysPressed) {
        keysPressed[key as keyof typeof keysPressed] = true
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (key in keysPressed) {
        keysPressed[key as keyof typeof keysPressed] = false
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    // Fonction pour créer le champ d'étoiles avec constellations
    const createStarfield = () => {
      const starCount = 3000
      const starGeometry = new THREE.BufferGeometry()
      const starPositions = new Float32Array(starCount * 3)
      const starSizes = new Float32Array(starCount)
      const starColors = new Float32Array(starCount * 3)

      // Ajouter d'abord les étoiles des constellations
      let posIndex = 0
      constellationData.forEach((constel) => {
        constel.positions.forEach(([x, y, z]) => {
          const i3 = posIndex * 3
          starPositions[i3] = x
          starPositions[i3 + 1] = y
          starPositions[i3 + 2] = z
          starSizes[posIndex] = constel.size
          starColors[i3] = constel.color[0]
          starColors[i3 + 1] = constel.color[1]
          starColors[i3 + 2] = constel.color[2]
          posIndex++
        })
      })

      // Ajouter les étoiles aléatoires pour le reste
      for (let i = posIndex; i < starCount; i++) {
        const i3 = i * 3
        const radius = Math.random() * 100 + 400
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)

        starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
        starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        starPositions[i3 + 2] = radius * Math.cos(phi)

        starSizes[i] = Math.random() * 1.2 + 0.3

        const colorChoice = Math.random()
        if (colorChoice > 0.95) {
          starColors[i3] = 0.8 + Math.random() * 0.2
          starColors[i3 + 1] = 0.3 + Math.random() * 0.3
          starColors[i3 + 2] = 0.2
        } else if (colorChoice > 0.85) {
          starColors[i3] = 0.8 + Math.random() * 0.2
          starColors[i3 + 1] = 0.8 + Math.random() * 0.2
          starColors[i3 + 2] = 0.3
        } else if (colorChoice > 0.7) {
          starColors[i3] = 0.3 + Math.random() * 0.2
          starColors[i3 + 1] = 0.5 + Math.random() * 0.2
          starColors[i3 + 2] = 0.8 + Math.random() * 0.2
        } else {
          starColors[i3] = 0.7 + Math.random() * 0.3
          starColors[i3 + 1] = 0.7 + Math.random() * 0.3
          starColors[i3 + 2] = 0.9 + Math.random() * 0.1
        }
      }

      starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
      starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1))
      starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3))

      const starMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
          uTime: { value: 0 },
        },
        vertexShader: `
          uniform float uPixelRatio;
          uniform float uTime;
          
          attribute float size;
          attribute vec3 color;
          
          varying vec3 vColor;
          
          void main() {
            vColor = color;
            
            float twinkle = sin(uTime * 0.3 + position.x * 0.01 + position.y * 0.02 + position.z * 0.03) * 0.3 + 0.7;
            twinkle *= sin(uTime * 0.2 + position.z * 0.04) * 0.2 + 0.8;
            
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z) * twinkle;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            float distanceToCenter = length(gl_PointCoord - 0.5);
            float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
            
            float glow = 1.0 - smoothstep(0.0, 1.0, distanceToCenter);
            vec3 finalColor = mix(vColor * 0.5, vColor, strength);
            
            gl_FragColor = vec4(finalColor, glow * 0.8);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      const stars = new THREE.Points(starGeometry, starMaterial)
      scene.add(stars)

      // Ajouter les lignes des constellations
      constellationData.forEach((constellation) => {
        const positions = constellation.positions
        for (let i = 0; i < positions.length - 1; i++) {
          const points = [
            new THREE.Vector3(positions[i][0], positions[i][1], positions[i][2]),
            new THREE.Vector3(positions[i + 1][0], positions[i + 1][1], positions[i + 1][2]),
          ]
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
          const lineMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color(constellation.color[0], constellation.color[1], constellation.color[2]),
            transparent: true,
            opacity: 0.4,
          })
          const line = new THREE.Line(lineGeometry, lineMaterial)
          scene.add(line)
        }

        // Ajouter le nom de la constellation
        if (constellation.positions.length > 0) {
          const centerPos = constellation.positions[Math.floor(constellation.positions.length / 2)]
          const canvas = document.createElement("canvas")
          canvas.width = 256
          canvas.height = 128
          const context = canvas.getContext("2d")
          if (context) {
            context.fillStyle = "rgba(0, 0, 0, 0)"
            context.fillRect(0, 0, canvas.width, canvas.height)
            context.font = "Bold 24px Arial"
            context.fillStyle = `rgba(${constellation.color[0] * 255}, ${constellation.color[1] * 255}, ${constellation.color[2] * 255}, 0.8)`
            context.textAlign = "center"
            context.fillText(constellation.name, canvas.width / 2, canvas.height / 2)

            const texture = new THREE.CanvasTexture(canvas)
            const material = new THREE.SpriteMaterial({
              map: texture,
              transparent: true,
              depthTest: false,
            })
            const sprite = new THREE.Sprite(material)
            sprite.position.set(centerPos[0], centerPos[1] + 10, centerPos[2])
            sprite.scale.set(40, 20, 1)
            scene.add(sprite)
          }
        }
      })

      return { stars, material: starMaterial }
    }

    // Créer les météorites
    const createMeteors = () => {
      const meteorGroup = new THREE.Group()
      scene.add(meteorGroup)
      const meteorCount = 75
      const meteorsData: any[] = []

      for (let i = 0; i < meteorCount; i++) {
        const size = Math.random() * 2.5 + 0.3
        const meteorGeometry = new THREE.IcosahedronGeometry(size, 0)

        const positions = meteorGeometry.attributes.position.array
        for (let j = 0; j < positions.length; j += 3) {
          positions[j] += (Math.random() - 0.5) * 0.2
          positions[j + 1] += (Math.random() - 0.5) * 0.2
          positions[j + 2] += (Math.random() - 0.5) * 0.2
        }
        meteorGeometry.computeVertexNormals()

        const meteorMaterial = new THREE.MeshStandardMaterial({
          color: 0xaaaaaa,
          roughness: 0.8,
          metalness: 0.2,
          emissive: 0x333333,
        })

        const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial)

        const radius = Math.random() * 300 + 200
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)

        meteor.position.x = radius * Math.sin(phi) * Math.cos(theta)
        meteor.position.y = radius * Math.sin(phi) * Math.sin(theta)
        meteor.position.z = radius * Math.cos(phi)

        // Créer la traînée
        const trailGeometry = new THREE.BufferGeometry()
        const trailMaterial = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(0x88ccff) },
          },
          vertexShader: `
            uniform float uTime;
            attribute float size;
            attribute float opacity;
            varying float vOpacity;
            
            void main() {
              vOpacity = opacity;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_Position = projectionMatrix * mvPosition;
              gl_PointSize = size * (300.0 / -mvPosition.z);
            }
          `,
          fragmentShader: `
            uniform vec3 uColor;
            varying float vOpacity;
            
            void main() {
              float distanceToCenter = length(gl_PointCoord - 0.5);
              float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
              gl_FragColor = vec4(uColor, strength * vOpacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })

        const trailLength = 25
        const trailPositions = new Float32Array(trailLength * 3)
        const trailSizes = new Float32Array(trailLength)
        const trailOpacities = new Float32Array(trailLength)

        for (let j = 0; j < trailLength; j++) {
          trailPositions[j * 3] = meteor.position.x
          trailPositions[j * 3 + 1] = meteor.position.y
          trailPositions[j * 3 + 2] = meteor.position.z
          trailSizes[j] = (1 - j / trailLength) * 3.5 + 1.0
          trailOpacities[j] = (1 - j / trailLength) * 0.7
        }

        trailGeometry.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3))
        trailGeometry.setAttribute("size", new THREE.BufferAttribute(trailSizes, 1))
        trailGeometry.setAttribute("opacity", new THREE.BufferAttribute(trailOpacities, 1))

        const trail = new THREE.Points(trailGeometry, trailMaterial)
        meteorGroup.add(trail)
        meteorGroup.add(meteor)

        meteorsData.push({
          meteor,
          trail,
          trailPositions,
          trailGeometry,
          direction: new THREE.Vector3(
              (Math.random() - 0.5) * 0.3,
              (Math.random() - 0.5) * 0.3,
              (Math.random() - 0.5) * 0.3,
          ).normalize(),
          speed: Math.random() * 0.5 + 0.2,
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02,
          },
          material: trailMaterial,
        })
      }

      return { meteorGroup, meteorsData }
    }

    const { meteorGroup, meteorsData } = createMeteors()
    const { stars, material: starMaterial } = createStarfield()

    // Créer le soleil
    const createSun = () => {
      const sunTexture = new THREE.TextureLoader().load("/placeholder.svg?height=512&width=512")
      const sunGeometry = new THREE.SphereGeometry(5, 64, 64)
      const sunMaterial = new THREE.MeshStandardMaterial({
        map: sunTexture,
        emissive: 0xcc6600,
        emissiveIntensity: 0.6,
        roughness: 0.8,
        metalness: 0.2,
      })

      const sun = new THREE.Mesh(sunGeometry, sunMaterial)
      sun.rotation.x = 0.1
      sun.userData = { rotationSpeed: 0.002 }
      scene.add(sun)

      return { sun, sunMaterial }
    }

    const { sun, sunMaterial } = createSun()

    // Créer les orbites
    const createOrbitLines = () => {
      const orbitLines: THREE.Line[] = []
      planets.forEach((planet) => {
        const orbitGeometry = new THREE.BufferGeometry()
        const orbitMaterial = new THREE.LineBasicMaterial({
          color: new THREE.Color(planet.color).multiplyScalar(0.5),
          transparent: true,
          opacity: 0.4,
        })

        const vertices = []
        const segments = 128
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2
          vertices.push(planet.distance * Math.cos(theta), 0, planet.distance * Math.sin(theta))
        }

        orbitGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
        const orbit = new THREE.Line(orbitGeometry, orbitMaterial)
        scene.add(orbit)
        orbitLines.push(orbit)
      })

      return orbitLines
    }

    const orbitLines = createOrbitLines()

    // Créer les planètes
    const createPlanets = () => {
      const planetMeshes: THREE.Mesh[] = []
      const textureLoader = new THREE.TextureLoader()

      planets.forEach((planet) => {
        const planetGeometry = new THREE.SphereGeometry(planet.radius, 32, 32)
        let planetMaterial

        if (planet.texture) {
          const texture = textureLoader.load(
              `/placeholder.svg?height=512&width=512&query=${planet.solarName}+planet+texture`,
          )
          planetMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.5,
            metalness: 0.2,
            emissive: new THREE.Color(0x222222),
            emissiveIntensity: 0.2,
          })
        } else {
          planetMaterial = new THREE.MeshStandardMaterial({
            color: planet.color,
            roughness: 0.5,
            metalness: 0.2,
            emissive: new THREE.Color(0x222222),
            emissiveIntensity: 0.2,
          })
        }

        const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial)
        const angle = Math.random() * Math.PI * 2
        planetMesh.position.x = planet.distance * Math.cos(angle)
        planetMesh.position.z = planet.distance * Math.sin(angle)
        planetMesh.rotation.x = Math.random() * 0.4 - 0.2

        scene.add(planetMesh)
        planetMeshes.push(planetMesh)

        // Créer l'étiquette
        const createLabelSprite = (text: string, color: string, size = 1.2) => {
          const canvas = document.createElement("canvas")
          canvas.width = 256
          canvas.height = 128
          const context = canvas.getContext("2d")
          if (context) {
            context.fillStyle = "rgba(0, 0, 0, 0)"
            context.fillRect(0, 0, canvas.width, canvas.height)
            context.font = "Bold 36px Arial"
            context.fillStyle = color
            context.textAlign = "center"
            context.textBaseline = "middle"
            context.fillText(text, canvas.width / 2, canvas.height / 2)

            const texture = new THREE.CanvasTexture(canvas)
            const material = new THREE.SpriteMaterial({
              map: texture,
              transparent: true,
              depthTest: false,
            })
            const sprite = new THREE.Sprite(material)
            sprite.scale.set(size * 5, size * 2.5, 1)
            return sprite
          }
          return null
        }

        const label = createLabelSprite(planet.name, planet.color)
        if (label) {
          label.position.y = planet.radius * 2.5
          planetMesh.add(label)
        }

        // Ajouter les anneaux si nécessaire
        if (planet.rings) {
          const ringGeometry = new THREE.RingGeometry(planet.radius * 1.4, planet.radius * 2.4, 64)
          const ringMaterial = new THREE.MeshStandardMaterial({
            color: 0xf0e9d2,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9,
            roughness: 0.6,
            metalness: 0.2,
            emissive: 0xf0e9d2,
            emissiveIntensity: 0.2,
          })

          const ring = new THREE.Mesh(ringGeometry, ringMaterial)
          ring.rotation.x = Math.PI / 2 + 0.2
          planetMesh.add(ring)
        }

        // Ajouter les lunes si nécessaire
        if (planet.moons) {
          planet.moons.forEach((moon, moonIndex) => {
            const moonGeometry = new THREE.SphereGeometry(moon.radius, 16, 16)
            const moonTexture = textureLoader.load("/placeholder.svg?height=256&width=256")
            const moonMaterial = new THREE.MeshStandardMaterial({
              map: moonTexture,
              roughness: 0.6,
              metalness: 0.1,
              emissive: new THREE.Color(0x222222),
              emissiveIntensity: 0.2,
            })

            const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial)
            const moonOrbit = new THREE.Group()
            planetMesh.add(moonOrbit)

            moonMesh.position.x = moon.distance
            moonOrbit.rotation.y = (moonIndex * Math.PI) / 4
            moonOrbit.rotation.x = moonIndex * 0.2
            moonOrbit.add(moonMesh)

            moonMesh.userData = {
              orbitSpeed: 0.02 + moonIndex * 0.005,
              rotationSpeed: 0.01,
            }
          })
        }

        // Ajouter l'effet de halo
        const glowGeometry = new THREE.SphereGeometry(planet.radius * 1.15, 32, 32)
        const glowMaterial = new THREE.ShaderMaterial({
          uniforms: {
            c: { value: 0.2 },
            p: { value: 3.0 },
            glowColor: { value: new THREE.Color(planet.color) },
          },
          vertexShader: `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 glowColor;
            uniform float c;
            uniform float p;
            varying vec3 vNormal;
            void main() {
              float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
              gl_FragColor = vec4(glowColor, intensity * 0.3);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
          depthWrite: false,
        })

        const glow = new THREE.Mesh(glowGeometry, glowMaterial)
        planetMesh.add(glow)

        planetMesh.userData = {
          orbitAngle: angle,
          orbitSpeed: planet.orbitSpeed,
          rotationSpeed: planet.rotationSpeed,
          name: planet.name,
          solarName: planet.solarName,
          path: planet.path,
          radius: planet.radius,
          planetData: planet,
        }

        originalOrbitSpeedsRef.current.set(planetMesh, planet.orbitSpeed)
      })

      return planetMeshes
    }

    const planetMeshes = createPlanets()
    planetsRef.current = planetMeshes

    // Éclairage
    const ambientLight = new THREE.AmbientLight(0x555555)
    scene.add(ambientLight)

    const sunLight = new THREE.PointLight(0xffffff, 3, 150, 1)
    scene.add(sunLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
    scene.add(hemisphereLight)

    // Gestionnaires d'événements
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return

      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

      composer.setSize(window.innerWidth, window.innerHeight)

      if (starMaterial.uniforms) {
        starMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 1.5)
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
      setTooltipPosition({ x: event.clientX, y: event.clientY })
    }

    const preventDefaultBehavior = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    renderer.domElement.addEventListener("contextmenu", preventDefaultBehavior)
    renderer.domElement.addEventListener("selectstart", preventDefaultBehavior)
    renderer.domElement.addEventListener("dragstart", preventDefaultBehavior)

    // Fonctions de zoom et reset
    const zoomToPlanet = (planet: THREE.Mesh) => {
      if (!cameraRef.current || !controlsRef.current) return

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }

      controlsRef.current.enabled = false
      setControlsEnabled(false)

      const planetPosition = new THREE.Vector3()
      planet.getWorldPosition(planetPosition)

      const radius = planet.userData.radius || 1
      const zoomDistance = radius * 3
      const offset = new THREE.Vector3(zoomDistance * 0.7, zoomDistance * 0.5, zoomDistance * 0.7)
      const targetPosition = planetPosition.clone().add(offset)

      const startPosition = cameraRef.current.position.clone()
      const startTarget = controlsRef.current.target.clone()

      const duration = 1.5
      const startTime = clock.getElapsedTime()

      planet.userData.orbitSpeed = 0
      setSelectedPlanet(planet.userData.planetData)

      const animateZoom = () => {
        const currentTime = clock.getElapsedTime()
        const elapsed = currentTime - startTime

        if (elapsed < duration) {
          const t = elapsed / duration
          const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

          cameraRef.current!.position.lerpVectors(startPosition, targetPosition, easeT)
          controlsRef.current!.target.lerpVectors(startTarget, planetPosition, easeT)
          controlsRef.current!.update()

          animationRef.current = requestAnimationFrame(animateZoom)
        } else {
          cameraRef.current!.position.copy(targetPosition)
          controlsRef.current!.target.copy(planetPosition)
          controlsRef.current!.update()

          controlsRef.current!.enabled = true
          setControlsEnabled(true)
        }
      }

      animationRef.current = requestAnimationFrame(animateZoom)
    }

    const resetView = () => {
      if (
          !cameraRef.current ||
          !controlsRef.current ||
          !initialCameraPositionRef.current ||
          !initialControlsTargetRef.current
      )
        return

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }

      controlsRef.current.enabled = false
      setControlsEnabled(false)

      const startPosition = cameraRef.current.position.clone()
      const startTarget = controlsRef.current.target.clone()

      const targetPosition = initialCameraPositionRef.current.clone()
      const targetTarget = new THREE.Vector3(0, 0, 0)

      const duration = 1.5
      const startTime = clock.getElapsedTime()

      planetsRef.current.forEach((planet) => {
        const originalSpeed = originalOrbitSpeedsRef.current.get(planet)
        if (originalSpeed !== undefined) {
          planet.userData.orbitSpeed = originalSpeed
        }
      })

      setSelectedPlanet(null)

      const animateReset = () => {
        const currentTime = clock.getElapsedTime()
        const elapsed = currentTime - startTime

        if (elapsed < duration) {
          const t = elapsed / duration
          const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

          cameraRef.current!.position.lerpVectors(startPosition, targetPosition, easeT)
          controlsRef.current!.target.lerpVectors(startTarget, targetTarget, easeT)
          controlsRef.current!.update()

          animationRef.current = requestAnimationFrame(animateReset)
        } else {
          cameraRef.current!.position.copy(targetPosition)
          controlsRef.current!.target.copy(targetTarget)
          controlsRef.current!.update()

          controlsRef.current!.enabled = true
          setControlsEnabled(true)
        }
      }

      animationRef.current = requestAnimationFrame(animateReset)
    }

    // Gestionnaire de clic
    let lastClickTime = 0

    const handleClick = () => {
      if (!cameraRef.current || !sceneRef.current) return

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current)
      const intersects = raycasterRef.current.intersectObjects(planetsRef.current, false)

      if (intersects.length > 0) {
        const planet = intersects[0].object
        if (planet.userData && planet.userData.path) {
          if (Date.now() - lastClickTime < 300) {
            router.push(planet.userData.path)
          } else {
            console.log("Suivre la planète:", planet.userData.solarName)
            setFollowingPlanet(planet)
            zoomToPlanet(planet)
          }
          lastClickTime = Date.now()
        }
      } else {
        console.log("Arrêter de suivre")
        setFollowingPlanet(null)
        resetView()
      }
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)
    renderer.domElement.addEventListener("wheel", handleWheel, { passive: false })

    // Boucle d'animation
    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      if (sunMaterial instanceof THREE.ShaderMaterial && sunMaterial.uniforms) {
        sunMaterial.uniforms.uTime.value = elapsedTime
      }

      if (sun && sun.userData && sun.userData.rotationSpeed) {
        sun.rotation.y += sun.userData.rotationSpeed
      }

      if (starMaterial.uniforms) {
        starMaterial.uniforms.uTime.value = elapsedTime
      }

      // Animation des planètes
      planetMeshes.forEach((planet) => {
        planet.rotation.y += planet.userData.rotationSpeed

        if (planet.userData.orbitSpeed > 0) {
          planet.userData.orbitAngle += planet.userData.orbitSpeed
          const orbitRadius = planetsDataRef.current.find((p) => p.name === planet.userData.name)?.distance || 10

          planet.position.x = orbitRadius * Math.cos(planet.userData.orbitAngle)
          planet.position.z = orbitRadius * Math.sin(planet.userData.orbitAngle)
        }

        planet.children.forEach((child) => {
          if (child instanceof THREE.Sprite) {
            if (cameraRef.current) {
              const cameraPosition = cameraRef.current.position.clone()
              const planetPosition = new THREE.Vector3()
              planet.getWorldPosition(planetPosition)
              const directionToCamera = cameraPosition.sub(planetPosition).normalize()
              child.position.y = planet.userData.radius * 2.5
            }
          }
        })
      })

      // Animation des lunes
      planetMeshes.forEach((planet) => {
        planet.children.forEach((child) => {
          if (child instanceof THREE.Group) {
            child.rotation.y += 0.01
            child.children.forEach((moon) => {
              if (moon instanceof THREE.Mesh && moon.userData.rotationSpeed) {
                moon.rotation.y += moon.userData.rotationSpeed
              }
            })
          }
        })
      })

      // Animation des météorites
      meteorsData.forEach((meteorData) => {
        meteorData.meteor.position.x += meteorData.direction.x * meteorData.speed
        meteorData.meteor.position.y += meteorData.direction.y * meteorData.speed
        meteorData.meteor.position.z += meteorData.direction.z * meteorData.speed

        meteorData.meteor.rotation.x += meteorData.rotationSpeed.x
        meteorData.meteor.rotation.y += meteorData.rotationSpeed.y
        meteorData.meteor.rotation.z += meteorData.rotationSpeed.z

        const positions = meteorData.trailPositions
        for (let i = positions.length - 3; i >= 3; i -= 3) {
          positions[i] = positions[i - 3]
          positions[i + 1] = positions[i - 2]
          positions[i + 2] = positions[i - 1]
        }

        positions[0] = meteorData.meteor.position.x
        positions[1] = meteorData.meteor.position.y
        positions[2] = meteorData.meteor.position.z
        meteorData.trailGeometry.attributes.position.needsUpdate = true

        if (meteorData.material.uniforms) {
          meteorData.material.uniforms.uTime.value = elapsedTime
        }

        const distanceFromCenter = meteorData.meteor.position.length()
        if (distanceFromCenter > 800) {
          const newPosition = meteorData.meteor.position.clone().normalize().multiplyScalar(-700)
          meteorData.meteor.position.copy(newPosition)
          for (let i = 0; i < positions.length; i += 3) {
            positions[i] = newPosition.x
            positions[i + 1] = newPosition.y
            positions[i + 2] = newPosition.z
          }
        }
      })

      // Détection de survol
      if (cameraRef.current && sceneRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current)
        const intersects = raycasterRef.current.intersectObjects(planetsRef.current)

        if (intersects.length > 0) {
          const planet = intersects[0].object
          setHoveredPlanet(planet.userData.name)
          document.body.style.cursor = "pointer"
        } else {
          setHoveredPlanet(null)
          document.body.style.cursor = "default"
        }
      }

      if (controlsRef.current) {
        controlsRef.current.update()
      }

      // Contrôles clavier
      if (controlsRef.current && cameraRef.current) {
        const moveSpeed = 0.5
        const camera = cameraRef.current

        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
        forward.y = 0
        forward.normalize().multiplyScalar(moveSpeed)

        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
        right.y = 0
        right.normalize().multiplyScalar(moveSpeed)

        if (keysPressed.z) camera.position.add(forward)
        if (keysPressed.s) camera.position.sub(forward)
        if (keysPressed.q) camera.position.sub(right)
        if (keysPressed.d) camera.position.add(right)
        if (keysPressed.a) camera.position.y -= moveSpeed
        if (keysPressed.e) camera.position.y += moveSpeed
      }

      composer.render()
    }

    animate()

    // Nettoyage
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)

      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.removeEventListener("wheel", handleWheel)
        rendererRef.current.domElement.removeEventListener("contextmenu", preventDefaultBehavior)
        rendererRef.current.domElement.removeEventListener("selectstart", preventDefaultBehavior)
        rendererRef.current.domElement.removeEventListener("dragstart", preventDefaultBehavior)
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }

      // Nettoyage des ressources
      stars.geometry.dispose()
      if (starMaterial instanceof THREE.ShaderMaterial) {
        starMaterial.dispose()
      }

      sun.geometry.dispose()
      if (sunMaterial instanceof THREE.Material) {
        sunMaterial.dispose()
      }

      orbitLines.forEach((line) => {
        line.geometry.dispose()
        if (line.material instanceof THREE.Material) {
          line.material.dispose()
        }
      })

      planetMeshes.forEach((planet) => {
        planet.geometry.dispose()
        if (planet.material instanceof THREE.Material) {
          planet.material.dispose()
        }
      })

      meteorsData.forEach((meteorData) => {
        meteorData.meteor.geometry.dispose()
        if (meteorData.meteor.material instanceof THREE.Material) {
          meteorData.meteor.material.dispose()
        }
        meteorData.trailGeometry.dispose()
        if (meteorData.material instanceof THREE.ShaderMaterial) {
          meteorData.material.dispose()
        }
      })

      if (meteorGroup) {
        scene.remove(meteorGroup)
      }

      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      composer.dispose()
    }
  }, [router])

  return (
      <>
        <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" />
        {hoveredPlanet && (
            <div
                className="fixed pointer-events-none z-50 bg-black/70 text-white px-3 py-1.5 rounded-md text-sm"
                style={{
                  left: tooltipPosition.x + 10,
                  top: tooltipPosition.y + 10,
                  transform: "translateZ(0)",
                }}
            >
              {hoveredPlanet}
            </div>
        )}

        {selectedPlanet && (
            <div className="fixed bottom-4 left-4 z-20 max-w-sm">
              <Card className="bg-black/70 backdrop-blur-sm border-primary/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center" style={{ color: selectedPlanet.color }}>
                    {selectedPlanet.solarName}
                  </CardTitle>
                  <CardDescription className="text-white/80">Section: {selectedPlanet.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pb-4">
                  <p className="text-white/90 text-sm">{selectedPlanet.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
                    <div>
                      <p className="font-semibold">Diamètre</p>
                      <p>{selectedPlanet.diameter}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Distance du Soleil</p>
                      <p>{selectedPlanet.distanceFromSun}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Période orbitale</p>
                      <p>{selectedPlanet.orbitalPeriod}</p>
                    </div>
                  </div>

                  <Button
                      size="sm"
                      className="w-full"
                      onClick={() => router.push(selectedPlanet.path)}
                      style={{
                        backgroundColor: selectedPlanet.color,
                        color: "#000",
                        borderColor: "transparent",
                      }}
                  >
                    Visiter {selectedPlanet.name} <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            </div>
        )}

        <div className="fixed bottom-4 right-4 z-20 hidden md:block">
          <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm">
            <p className="font-semibold mb-1">Navigation:</p>
            <p>Se déplacer via ZQSD A E</p>
            <p className="mt-1">Cliquez sur une planète pour l'explorer</p>
            <p className="text-xs mt-1">Double-cliquez pour visiter la page</p>
          </div>
        </div>

        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
          {hoveredPlanet && (
              <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
                <span>Planète: {hoveredPlanet}</span>
              </div>
          )}
        </div>
      </>
  )
}
