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
  // Stocker les vitesses orbitales originales des planètes
  const originalOrbitSpeedsRef = useRef<Map<THREE.Mesh, number>>(new Map())
  // État pour suivre si les contrôles sont actifs
  const [controlsEnabled, setControlsEnabled] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    // Modifier la configuration des planètes pour ajouter des textures et améliorer le réalisme
    const planets: Planet[] = [
      {
        name: "A propos",
        solarName: "Mercure",
        radius: 0.8,
        distance: 10,
        rotationSpeed: 0.01,
        orbitSpeed: 0.005,
        color: "#c0c0c0", // Gris argenté
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
        color: "#e39e54", // Jaune-orangé
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
        color: "#4dabf7", // Bleu
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
        color: "#fa5252", // Rouge
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
        name: "Test",
        solarName: "Jupiter",
        radius: 1.8,
        distance: 34,
        rotationSpeed: 0.015,
        orbitSpeed: 0.0008,
        color: "#fcc419", // Jaune-brun
        path: "/test",
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
        color: "#e9d8a6", // Beige-doré
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

    // Stocker le renderer dans la référence
    rendererRef.current = renderer

    // Ajouter le canvas au DOM
    if (containerRef.current) {
      // Nettoyer le conteneur avant d'ajouter le nouveau canvas
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild)
      }
      containerRef.current.appendChild(renderer.domElement)

      // Ajouter des styles spécifiques au canvas
      renderer.domElement.style.touchAction = "none"
      renderer.domElement.style.outline = "none"
      renderer.domElement.style.display = "block"
    }

    // Configuration du post-processing pour l'effet de bloom
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    // Ajouter un effet de bloom amélioré pour rendre les objets lumineux plus brillants
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.7, // strength - augmenté pour plus d'éclat
      0.5, // radius - légèrement augmenté pour un halo plus large
      0.75, // threshold - légèrement réduit pour capturer plus d'éléments
    )
    composer.addPass(bloomPass)

    // Modifier les paramètres des contrôles pour améliorer la rotation avec la souris
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.minDistance = 10
    controls.maxDistance = 200
    controls.maxPolarAngle = Math.PI // Permettre une rotation verticale complète
    controls.minPolarAngle = 0 // Permettre de passer au-dessus et en-dessous
    controls.autoRotate = false
    controls.enableRotate = true
    controls.rotateSpeed = 0.5 // Réduire légèrement pour plus de précision
    controls.enableZoom = true
    controls.zoomSpeed = 1.0
    controls.enablePan = true
    controls.panSpeed = 0.8
    controls.screenSpacePanning = true
    controls.target.set(0, 0, 0) // Cibler le centre du soleil
    initialControlsTargetRef.current = controls.target.clone()
    controlsRef.current = controls

    // Ajouter des contrôles clavier pour se déplacer dans la direction de la caméra
    // const keysPressed = { w: false, a: false, s: false, d: false, q: false, e: false }
    // Ajouter des contrôles clavier pour se déplacer dans la direction de la caméra (configuration AZERTY)
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

    // Modifier la fonction createStarfield pour augmenter le nombre d'étoiles:

    // Ajouter une fonction pour créer des étoiles plus réalistes
    const createStarfield = () => {
      const starCount = 3000 // Augmenté de 2000 à 3000 pour plus d'étoiles
      const starGeometry = new THREE.BufferGeometry()
      const starPositions = new Float32Array(starCount * 3)
      const starSizes = new Float32Array(starCount)
      const starColors = new Float32Array(starCount * 3)

      const cosmicElements = [
        {
          // Mini trou noir avec disque d'accrétion
          name: "Mini Black Hole",
          type: "blackhole",
          position: [-200, 80, -150],
          size: 3.0,
          color: [0.1, 0.1, 0.1],
          accretionDisk: {
            innerRadius: 8,
            outerRadius: 25,
            particles: 150,
            colors: [
              [1.0, 0.4, 0.1],
              [1.0, 0.6, 0.2],
              [0.8, 0.3, 0.1],
            ],
          },
        },
        {
          // Nébuleuse colorée
          name: "Orion Nebula",
          type: "nebula",
          position: [-100, 120, -200],
          size: 2.0,
          color: [0.8, 0.3, 0.9],
          cloud: {
            particles: 200,
            radius: 40,
            density: 0.6,
          },
        },
        {
          // Pulsar
          name: "Pulsar",
          type: "pulsar",
          position: [180, 100, 150],
          size: 2.5,
          color: [0.2, 0.8, 1.0],
          beams: {
            length: 60,
            width: 3,
            pulseSpeed: 2.0,
          },
        },
        {
          // Amas d'étoiles
          name: "Star Cluster",
          type: "cluster",
          position: [-150, -80, 180],
          size: 1.6,
          color: [0.9, 0.9, 0.7],
          cluster: {
            stars: 80,
            radius: 25,
            brightness: 1.5,
          },
        },
        {
          // Supernova remnant
          name: "Supernova Remnant",
          type: "supernova",
          position: [120, 60, -180],
          size: 2.2,
          color: [1.0, 0.5, 0.3],
          explosion: {
            particles: 120,
            radius: 35,
            expansion: 0.5,
          },
        },
      ]

      // Créer les éléments cosmiques
      let posIndex = 0
      cosmicElements.forEach((element) => {
        if (element.type === "blackhole") {
          // Créer le trou noir central (invisible)
          const i3 = posIndex * 3
          starPositions[i3] = element.position[0]
          starPositions[i3 + 1] = element.position[1]
          starPositions[i3 + 2] = element.position[2]
          starSizes[posIndex] = 0.1 // Très petit pour simuler l'invisibilité
          starColors[i3] = 0.05
          starColors[i3 + 1] = 0.05
          starColors[i3 + 2] = 0.05
          posIndex++

          // Créer le disque d'accrétion
          for (let i = 0; i < element.accretionDisk.particles; i++) {
            const angle = (i / element.accretionDisk.particles) * Math.PI * 2
            const radius =
              element.accretionDisk.innerRadius +
              Math.random() * (element.accretionDisk.outerRadius - element.accretionDisk.innerRadius)

            const i3 = posIndex * 3
            starPositions[i3] = element.position[0] + radius * Math.cos(angle)
            starPositions[i3 + 1] = element.position[1] + (Math.random() - 0.5) * 3
            starPositions[i3 + 2] = element.position[2] + radius * Math.sin(angle)

            starSizes[posIndex] = 1.5 + Math.random() * 1.0

            const colorChoice = Math.floor(Math.random() * element.accretionDisk.colors.length)
            const chosenColor = element.accretionDisk.colors[colorChoice]
            starColors[i3] = chosenColor[0]
            starColors[i3 + 1] = chosenColor[1]
            starColors[i3 + 2] = chosenColor[2]
            posIndex++
          }
        } else if (element.type === "galaxy") {
        } else if (element.type === "nebula") {
          // Créer une nébuleuse
          for (let i = 0; i < element.cloud.particles; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(Math.random() * 2 - 1)
            const radius = Math.random() * element.cloud.radius

            const i3 = posIndex * 3
            starPositions[i3] = element.position[0] + radius * Math.sin(phi) * Math.cos(theta)
            starPositions[i3 + 1] = element.position[1] + radius * Math.sin(phi) * Math.sin(theta)
            starPositions[i3 + 2] = element.position[2] + radius * Math.cos(phi)

            starSizes[posIndex] = element.size * (1.0 + Math.random() * 1.5)
            starColors[i3] = element.color[0] * (0.6 + Math.random() * 0.4)
            starColors[i3 + 1] = element.color[1] * (0.6 + Math.random() * 0.4)
            starColors[i3 + 2] = element.color[2] * (0.6 + Math.random() * 0.4)
            posIndex++
          }
        } else if (element.type === "pulsar") {
          // Créer le pulsar central
          const i3 = posIndex * 3
          starPositions[i3] = element.position[0]
          starPositions[i3 + 1] = element.position[1]
          starPositions[i3 + 2] = element.position[2]
          starSizes[posIndex] = element.size
          starColors[i3] = element.color[0]
          starColors[i3 + 1] = element.color[1]
          starColors[i3 + 2] = element.color[2]
          posIndex++

          // Créer les faisceaux du pulsar
          for (let beam = 0; beam < 2; beam++) {
            const beamAngle = beam * Math.PI
            for (let i = 0; i < 20; i++) {
              const distance = (i / 20) * element.beams.length

              const i3 = posIndex * 3
              starPositions[i3] = element.position[0] + distance * Math.cos(beamAngle)
              starPositions[i3 + 1] = element.position[1]
              starPositions[i3 + 2] = element.position[2] + distance * Math.sin(beamAngle)

              starSizes[posIndex] = element.beams.width * (1 - i / 20)
              const intensity = 1 - (i / 20) * 0.7
              starColors[i3] = element.color[0] * intensity
              starColors[i3 + 1] = element.color[1] * intensity
              starColors[i3 + 2] = element.color[2] * intensity
              posIndex++
            }
          }
        } else if (element.type === "cluster") {
          // Créer un amas d'étoiles
          for (let i = 0; i < element.cluster.stars; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(Math.random() * 2 - 1)
            const radius = Math.random() * element.cluster.radius

            const i3 = posIndex * 3
            starPositions[i3] = element.position[0] + radius * Math.sin(phi) * Math.cos(theta)
            starPositions[i3 + 1] = element.position[1] + radius * Math.sin(phi) * Math.sin(theta)
            starPositions[i3 + 2] = element.position[2] + radius * Math.cos(phi)

            starSizes[posIndex] = element.size * element.cluster.brightness * (0.8 + Math.random() * 0.4)
            starColors[i3] = element.color[0] * (0.8 + Math.random() * 0.2)
            starColors[i3 + 1] = element.color[1] * (0.8 + Math.random() * 0.2)
            starColors[i3 + 2] = element.color[2] * (0.8 + Math.random() * 0.2)
            posIndex++
          }
        } else if (element.type === "supernova") {
          // Créer un reste de supernova
          for (let i = 0; i < element.explosion.particles; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(Math.random() * 2 - 1)
            const radius = Math.random() * element.explosion.radius

            const i3 = posIndex * 3
            starPositions[i3] = element.position[0] + radius * Math.sin(phi) * Math.cos(theta)
            starPositions[i3 + 1] = element.position[1] + radius * Math.sin(phi) * Math.sin(theta)
            starPositions[i3 + 2] = element.position[2] + radius * Math.cos(phi)

            starSizes[posIndex] = element.size * (0.5 + Math.random() * 1.0)
            const intensity = 1 - (radius / element.explosion.radius) * 0.5
            starColors[i3] = element.color[0] * intensity
            starColors[i3 + 1] = element.color[1] * intensity
            starColors[i3 + 2] = element.color[2] * intensity
            posIndex++
          }
        }
      })

      // Ajouter les étoiles aléatoires pour le reste
      for (let i = posIndex; i < starCount; i++) {
        const i3 = i * 3

        // Créer une distribution plus uniforme sur une sphère céleste
        const radius = Math.random() * 100 + 400 // Sphère céleste plus grande
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)

        starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
        starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        starPositions[i3 + 2] = radius * Math.cos(phi)

        // Random star sizes with more variation
        starSizes[i] = Math.random() * 1.2 + 0.3

        // Star colors (mostly white/blue with some variation)
        const colorChoice = Math.random()
        if (colorChoice > 0.95) {
          // Red/orange stars (moins nombreuses)
          starColors[i3] = 0.8 + Math.random() * 0.2
          starColors[i3 + 1] = 0.3 + Math.random() * 0.3
          starColors[i3 + 2] = 0.2
        } else if (colorChoice > 0.85) {
          // Yellow stars
          starColors[i3] = 0.8 + Math.random() * 0.2
          starColors[i3 + 1] = 0.8 + Math.random() * 0.2
          starColors[i3 + 2] = 0.3
        } else if (colorChoice > 0.7) {
          // Blue stars
          starColors[i3] = 0.3 + Math.random() * 0.2
          starColors[i3 + 1] = 0.5 + Math.random() * 0.2
          starColors[i3 + 2] = 0.8 + Math.random() * 0.2
        } else {
          // White/blue-ish stars
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
      
      // Twinkling effect with multiple frequencies for more natural look
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
      // Create circular points with soft edges and subtle glow
      float distanceToCenter = length(gl_PointCoord - 0.5);
      float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
      
      // Add subtle glow around stars
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

      // Ajouter des étoiles lointaines supplémentaires
      const distantStarCount = 2000
      const distantStarGeometry = new THREE.BufferGeometry()
      const distantStarPositions = new Float32Array(distantStarCount * 3)
      const distantStarSizes = new Float32Array(distantStarCount)
      const distantStarColors = new Float32Array(distantStarCount * 3)

      for (let i = 0; i < distantStarCount; i++) {
        const i3 = i * 3

        // Placer ces étoiles sur une sphère très lointaine
        const radius = 800 + Math.random() * 200
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)

        distantStarPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
        distantStarPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        distantStarPositions[i3 + 2] = radius * Math.cos(phi)

        // Ces étoiles sont plus petites
        distantStarSizes[i] = Math.random() * 0.3 + 0.1

        // Couleurs principalement blanc/bleu mais plus subtiles
        const colorVariant = Math.random()
        distantStarColors[i3] = 0.7 + colorVariant * 0.3
        distantStarColors[i3 + 1] = 0.7 + colorVariant * 0.3
        distantStarColors[i3 + 2] = 0.8 + colorVariant * 0.2
      }

      distantStarGeometry.setAttribute("position", new THREE.BufferAttribute(distantStarPositions, 3))
      distantStarGeometry.setAttribute("size", new THREE.BufferAttribute(distantStarSizes, 1))
      distantStarGeometry.setAttribute("color", new THREE.BufferAttribute(distantStarColors, 3))

      const distantStarMaterial = new THREE.ShaderMaterial({
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
        
        // Un scintillement très subtil
        float twinkle = sin(uTime * 0.1 + position.x * 0.01 + position.z * 0.01) * 0.1 + 0.9;
        
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = size * uPixelRatio * (900.0 / -mvPosition.z) * twinkle;
      }
    `,
        fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        float distanceToCenter = length(gl_PointCoord - 0.5);
        float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
        
        gl_FragColor = vec4(vColor, strength * 0.6);
      }
    `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      const distantStars = new THREE.Points(distantStarGeometry, distantStarMaterial)
      scene.add(distantStars)

      // Objet vide pour maintenir la compatibilité avec le reste du code
      const celestialMaterial = {
        uniforms: { uTime: { value: 0 } },
      }
      const celestialSphere = null

      return {
        stars,
        material: starMaterial,
        celestialSphere,
        celestialMaterial,
        distantStars,
        distantStarMaterial,
      }
    }

    // Après la fonction createStarfield, ajouter cette nouvelle fonction pour créer des météorites

    // Ajouter cette fonction après la fonction createStarfield
    const createMeteors = () => {
      const meteorGroup = new THREE.Group()
      scene.add(meteorGroup)

      // Nombre de météorites
      const meteorCount = 75
      const meteorsData = []

      for (let i = 0; i < meteorCount; i++) {
        // Créer une géométrie pour la météorite avec une taille plus variée
        const size = Math.random() * 2.5 + 0.3
        const meteorGeometry = new THREE.IcosahedronGeometry(size, 0)

        // Déformer légèrement la géométrie pour un aspect plus naturel
        const positions = meteorGeometry.attributes.position.array
        for (let j = 0; j < positions.length; j += 3) {
          positions[j] += (Math.random() - 0.5) * 0.2
          positions[j + 1] += (Math.random() - 0.5) * 0.2
          positions[j + 2] += (Math.random() - 0.5) * 0.2
        }
        meteorGeometry.computeVertexNormals()

        // Créer un matériau pour la météorite
        const meteorMaterial = new THREE.MeshStandardMaterial({
          color: 0xaaaaaa,
          roughness: 0.8,
          metalness: 0.2,
          emissive: 0x333333,
        })

        const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial)

        // Positionner la météorite aléatoirement dans l'espace
        const radius = Math.random() * 300 + 200
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)

        meteor.position.x = radius * Math.sin(phi) * Math.cos(theta)
        meteor.position.y = radius * Math.sin(phi) * Math.sin(theta)
        meteor.position.z = radius * Math.cos(phi)

        // Créer une traînée pour la météorite
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

        // Créer les points pour la traînée
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

        // Ajouter la météorite au groupe
        meteorGroup.add(meteor)

        // Stocker les données pour l'animation
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

    const {
      stars,
      material: starMaterial,
      celestialSphere,
      celestialMaterial,
      distantStars,
      distantStarMaterial,
    } = createStarfield()

    // Create sun
    const createSun = () => {
      // Créer une texture pour le soleil avec des détails de surface
      const sunTexture = new THREE.TextureLoader().load("/textures/sun.jpg")

      const sunGeometry = new THREE.SphereGeometry(5, 64, 64)
      const sunMaterial = new THREE.MeshStandardMaterial({
        map: sunTexture,
        emissive: 0xcc6600, // Couleur d'émission plus foncée (orange-rouge au lieu de orange vif)
        emissiveIntensity: 0.6, // Intensité d'émission réduite de 1 à 0.6
        roughness: 0.8, // Augmenter la rugosité pour réduire les reflets
        metalness: 0.2, // Réduire légèrement le métal
      })

      const sun = new THREE.Mesh(sunGeometry, sunMaterial)

      // Ajouter une légère inclinaison à l'axe de rotation du soleil
      sun.rotation.x = 0.1

      // Stocker la vitesse de rotation dans userData
      sun.userData = {
        rotationSpeed: 0.002, // Vitesse de rotation lente
      }

      scene.add(sun)

      // Retourner seulement le soleil sans l'aura
      return { sun, sunMaterial, glow: null, glowMaterial: null }
    }

    const { sun, sunMaterial, glow, glowMaterial } = createSun()

    // Create orbit lines
    const createOrbitLines = () => {
      const orbitLines: THREE.Line[] = []

      planets.forEach((planet) => {
        const orbitGeometry = new THREE.BufferGeometry()
        const orbitMaterial = new THREE.LineBasicMaterial({
          color: new THREE.Color(planet.color).multiplyScalar(0.5), // Utiliser la couleur de la planète
          transparent: true,
          opacity: 0.4, // Augmenter légèrement l'opacité
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

    // Create planets
    const createPlanets = () => {
      const planetMeshes: THREE.Mesh[] = []
      const textureLoader = new THREE.TextureLoader()

      planets.forEach((planet, index) => {
        // Create planet with realistic textures
        const planetGeometry = new THREE.SphereGeometry(planet.radius, 32, 32)

        let planetMaterial

        if (planet.texture) {
          const texture = textureLoader.load(planet.texture)
          planetMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.5, // Réduire la rugosité pour plus de brillance
            metalness: 0.2, // Augmenter légèrement le métal pour plus de réflexion
            emissive: new THREE.Color(0x222222), // Ajouter une légère émission pour plus de luminosité
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

        // Position planet on its orbit
        const angle = Math.random() * Math.PI * 2
        planetMesh.position.x = planet.distance * Math.cos(angle)
        planetMesh.position.z = planet.distance * Math.sin(angle)

        // Add slight tilt to rotation axis (like real planets)
        planetMesh.rotation.x = Math.random() * 0.4 - 0.2

        // Add planet to scene
        scene.add(planetMesh)
        planetMeshes.push(planetMesh)

        // Ajouter une étiquette avec le nom de la page au-dessus de la planète
        const createLabelSprite = (text: string, color: string, size = 1.2) => {
          const canvas = document.createElement("canvas")
          canvas.width = 256
          canvas.height = 128
          const context = canvas.getContext("2d")

          if (context) {
            context.fillStyle = "rgba(0, 0, 0, 0)"
            context.fillRect(0, 0, canvas.width, canvas.height)

            // Dessiner le texte
            context.font = "Bold 36px Arial"
            context.fillStyle = color
            context.textAlign = "center"
            context.textBaseline = "middle"
            context.fillText(text, canvas.width / 2, canvas.height / 2)

            // Créer une texture à partir du canvas
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

        // Créer l'étiquette avec le nom de la page
        const label = createLabelSprite(planet.name, planet.color)
        if (label) {
          // Positionner l'étiquette au-dessus de la planète
          label.position.y = planet.radius * 2.5

          // Ajouter l'étiquette comme enfant de la planète pour qu'elle suive ses mouvements
          planetMesh.add(label)
        }

        // Add rings if needed with improved realism
        if (planet.rings) {
          // Créer une texture claire pour les anneaux de Saturne
          const ringGeometry = new THREE.RingGeometry(planet.radius * 1.4, planet.radius * 2.4, 64)
          const ringMaterial = new THREE.MeshStandardMaterial({
            color: 0xf0e9d2, // Couleur beige clair pour les anneaux
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9,
            roughness: 0.6,
            metalness: 0.2,
            emissive: 0xf0e9d2, // Ajouter une émission pour plus de visibilité
            emissiveIntensity: 0.2,
          })

          const ring = new THREE.Mesh(ringGeometry, ringMaterial)
          ring.rotation.x = Math.PI / 2 + 0.2 // Légère inclinaison
          planetMesh.add(ring)
        }

        // Add moons if needed with improved realism
        if (planet.moons) {
          planet.moons.forEach((moon, moonIndex) => {
            const moonGeometry = new THREE.SphereGeometry(moon.radius, 16, 16)

            // Charger une texture de lune
            const moonTexture = textureLoader.load("/textures/moon.jpg")

            const moonMaterial = new THREE.MeshStandardMaterial({
              map: moonTexture,
              roughness: 0.6,
              metalness: 0.1,
              emissive: new THREE.Color(0x222222),
              emissiveIntensity: 0.2,
            })

            const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial)

            // Créer un groupe pour l'orbite de la lune
            const moonOrbit = new THREE.Group()
            planetMesh.add(moonOrbit)

            // Positionner la lune
            moonMesh.position.x = moon.distance

            // Incliner légèrement l'orbite de la lune
            moonOrbit.rotation.y = (moonIndex * Math.PI) / 4
            moonOrbit.rotation.x = moonIndex * 0.2

            moonOrbit.add(moonMesh)

            // Stocker les données pour l'animation
            moonMesh.userData = {
              orbitSpeed: 0.02 + moonIndex * 0.005,
              rotationSpeed: 0.01,
            }
          })
        }

        // Ajouter un effet de halo lumineux autour de la planète (réduit)
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
            gl_FragColor = vec4(glowColor, intensity * 0.3); // Réduit pour moins éblouir
          }
        `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
          depthWrite: false,
        })

        const glow = new THREE.Mesh(glowGeometry, glowMaterial)
        planetMesh.add(glow)

        // Store initial position for animation
        planetMesh.userData = {
          orbitAngle: angle,
          orbitSpeed: planet.orbitSpeed,
          rotationSpeed: planet.rotationSpeed,
          name: planet.name,
          solarName: planet.solarName,
          path: planet.path,
          radius: planet.radius,
          planetData: planet, // Stocker toutes les données de la planète
        }

        // Stocker la vitesse orbitale originale
        originalOrbitSpeedsRef.current.set(planetMesh, planet.orbitSpeed)
      })

      return planetMeshes
    }

    const planetMeshes = createPlanets()
    planetsRef.current = planetMeshes

    // Modifier la configuration de l'éclairage pour un rendu plus réaliste
    // Modifier la configuration de l'éclairage pour un rendu plus lumineux
    // Add ambient light with increased intensity
    const ambientLight = new THREE.AmbientLight(0x555555) // Augmenter l'intensité pour éclairer davantage les planètes
    scene.add(ambientLight)

    // Add point light at sun position with improved settings
    const sunLight = new THREE.PointLight(0xffffff, 3, 150, 1) // Augmenter l'intensité et la portée
    scene.add(sunLight)

    // Ajouter une lumière directionnelle pour mieux éclairer les planètes
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Ajouter une lumière hémisphérique pour un éclairage plus naturel
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1) // Augmenter l'intensité
    scene.add(hemisphereLight)

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return

      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

      // Mettre à jour la taille du composer
      composer.setSize(window.innerWidth, window.innerHeight)

      if (starMaterial.uniforms) {
        starMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 1.5)
      }
      if (distantStarMaterial && distantStarMaterial.uniforms) {
        distantStarMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 1.5)
      }
      if (celestialMaterial && celestialMaterial.uniforms) {
        celestialMaterial.uniforms.uTime.value = clock.getElapsedTime()
      }
    }

    window.addEventListener("resize", handleResize)

    // Handle mouse move for raycasting
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1

      // Update tooltip position
      setTooltipPosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Empêcher les événements par défaut qui pourraient interférer avec les contrôles
    const preventDefaultBehavior = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    // Ajouter des gestionnaires d'événements pour empêcher la sélection de texte
    renderer.domElement.addEventListener("contextmenu", preventDefaultBehavior)
    renderer.domElement.addEventListener("selectstart", preventDefaultBehavior)
    renderer.domElement.addEventListener("dragstart", preventDefaultBehavior)

    // Fonction pour faire un zoom sur une planète et arrêter son mouvement orbital
    const zoomToPlanet = (planet: THREE.Mesh) => {
      if (!cameraRef.current || !controlsRef.current) return

      // Annuler toute animation en cours
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }

      // Désactiver les contrôles pendant l'animation
      controlsRef.current.enabled = false
      setControlsEnabled(false)

      // Obtenir la position de la planète
      const planetPosition = new THREE.Vector3()
      planet.getWorldPosition(planetPosition)

      // Calculer la distance de zoom basée sur le rayon de la planète
      const radius = planet.userData.radius || 1
      const zoomDistance = radius * 3 // Distance plus proche pour un gros plan

      // Calculer la position de la caméra pour le gros plan
      // Nous voulons être légèrement décalés pour voir la planète sous un angle intéressant
      const offset = new THREE.Vector3(zoomDistance * 0.7, zoomDistance * 0.5, zoomDistance * 0.7)

      // Position cible de la caméra
      const targetPosition = planetPosition.clone().add(offset)

      // Position et cible actuelles
      const startPosition = cameraRef.current.position.clone()
      const startTarget = controlsRef.current.target.clone()

      // Durée de l'animation en secondes
      const duration = 1.5
      const startTime = clock.getElapsedTime()

      // Arrêter le mouvement orbital de la planète sélectionnée
      planet.userData.orbitSpeed = 0

      // Mettre à jour les informations de la planète sélectionnée
      setSelectedPlanet(planet.userData.planetData)

      // Fonction d'animation
      const animateZoom = () => {
        const currentTime = clock.getElapsedTime()
        const elapsed = currentTime - startTime

        if (elapsed < duration) {
          // Calculer la progression avec easing
          const t = elapsed / duration
          const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // easing

          // Interpoler la position de la caméra
          cameraRef.current!.position.lerpVectors(startPosition, targetPosition, easeT)

          // Interpoler la cible des contrôles
          controlsRef.current!.target.lerpVectors(startTarget, planetPosition, easeT)

          // Mettre à jour les contrôles
          controlsRef.current!.update()

          // Continuer l'animation
          animationRef.current = requestAnimationFrame(animateZoom)
        } else {
          // Finaliser l'animation
          cameraRef.current!.position.copy(targetPosition)
          controlsRef.current!.target.copy(planetPosition)
          controlsRef.current!.update()

          // Réactiver les contrôles après l'animation
          controlsRef.current!.enabled = true
          setControlsEnabled(true)
        }
      }

      // Démarrer l'animation
      animationRef.current = requestAnimationFrame(animateZoom)
    }

    // Fonction pour revenir à la vue d'ensemble et restaurer le mouvement des planètes
    const resetView = () => {
      if (
        !cameraRef.current ||
        !controlsRef.current ||
        !initialCameraPositionRef.current ||
        !initialControlsTargetRef.current
      )
        return

      // Annuler toute animation en cours
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }

      // Désactiver les contrôles pendant l'animation
      controlsRef.current.enabled = false
      setControlsEnabled(false)

      // Position et cible actuelles
      const startPosition = cameraRef.current.position.clone()
      const startTarget = controlsRef.current.target.clone()

      // Position et cible initiales
      const targetPosition = initialCameraPositionRef.current.clone()
      const targetTarget = new THREE.Vector3(0, 0, 0) // Toujours cibler le soleil

      // Durée de l'animation en secondes
      const duration = 1.5
      const startTime = clock.getElapsedTime()

      // Restaurer le mouvement orbital de toutes les planètes
      planetsRef.current.forEach((planet) => {
        const originalSpeed = originalOrbitSpeedsRef.current.get(planet)
        if (originalSpeed !== undefined) {
          planet.userData.orbitSpeed = originalSpeed
        }
      })

      // Réinitialiser la planète sélectionnée
      setSelectedPlanet(null)

      // Fonction d'animation
      const animateReset = () => {
        const currentTime = clock.getElapsedTime()
        const elapsed = currentTime - startTime

        if (elapsed < duration) {
          // Calculer la progression avec easing
          const t = elapsed / duration
          const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // easing

          // Interpoler la position de la caméra
          cameraRef.current!.position.lerpVectors(startPosition, targetPosition, easeT)

          // Interpoler la cible des contrôles
          controlsRef.current!.target.lerpVectors(startTarget, targetTarget, easeT)

          // Mettre à jour les contrôles
          controlsRef.current!.update()

          // Continuer l'animation
          animationRef.current = requestAnimationFrame(animateReset)
        } else {
          // Finaliser l'animation
          cameraRef.current!.position.copy(targetPosition)
          controlsRef.current!.target.copy(targetTarget)
          controlsRef.current!.update()

          // Réactiver les contrôles après l'animation
          controlsRef.current!.enabled = true
          setControlsEnabled(true)
        }
      }

      // Démarrer l'animation
      animationRef.current = requestAnimationFrame(animateReset)
    }

    // Modifier le gestionnaire de clic
    let lastClickTime = 0

    const handleClick = () => {
      if (!cameraRef.current || !sceneRef.current) return

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current)
      const intersects = raycasterRef.current.intersectObjects(planetsRef.current, false)

      if (intersects.length > 0) {
        const planet = intersects[0].object
        if (planet.userData && planet.userData.path) {
          // Double-clic pour naviguer vers la page
          if (Date.now() - lastClickTime < 300) {
            router.push(planet.userData.path)
          } else {
            // Simple clic pour faire un gros plan sur la planète
            console.log("Suivre la planète:", planet.userData.solarName)
            setFollowingPlanet(planet)
            zoomToPlanet(planet)
          }
          lastClickTime = Date.now()
        }
      } else {
        // Clic en dehors d'une planète - revenir à la vue d'ensemble
        console.log("Arrêter de suivre")
        setFollowingPlanet(null)
        resetView()
      }
    }

    window.addEventListener("click", handleClick)

    // Assurer que le zoom avec la molette fonctionne correctement
    const handleWheel = (event: WheelEvent) => {
      // Les contrôles OrbitControls gèrent déjà le zoom,
      // mais nous pouvons ajouter des comportements personnalisés si nécessaire
      event.preventDefault()
    }

    renderer.domElement.addEventListener("wheel", handleWheel, { passive: false })

    // Animation loop
    const clock = new THREE.Clock()

    // Modifier la fonction animate pour gérer correctement les matériaux
    const animate = () => {
      requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Update sun shader
      if (sunMaterial instanceof THREE.ShaderMaterial && sunMaterial.uniforms) {
        sunMaterial.uniforms.uTime.value = elapsedTime
      }

      // Faire tourner le soleil sur lui-même
      if (sun && sun.userData && sun.userData.rotationSpeed) {
        sun.rotation.y += sun.userData.rotationSpeed
      }

      // Update glow shader
      if (glowMaterial && glowMaterial.uniforms) {
        glowMaterial.uniforms.uTime.value = elapsedTime
      }

      // Update star shader
      if (starMaterial.uniforms) {
        starMaterial.uniforms.uTime.value = elapsedTime
      }

      // Update celestial materials
      if (celestialMaterial && celestialMaterial.uniforms) {
        celestialMaterial.uniforms.uTime.value = elapsedTime
      }

      // Update distant stars material
      if (distantStarMaterial && distantStarMaterial.uniforms) {
        distantStarMaterial.uniforms.uTime.value = elapsedTime
      }

      // Rotate and orbit planets
      planetMeshes.forEach((planet) => {
        // Rotate planet
        planet.rotation.y += planet.userData.rotationSpeed

        // Orbit around sun (seulement si la vitesse orbitale n'est pas à zéro)
        if (planet.userData.orbitSpeed > 0) {
          planet.userData.orbitAngle += planet.userData.orbitSpeed
          const orbitRadius = planetsDataRef.current.find((p) => p.name === planet.userData.name)?.distance || 10

          planet.position.x = orbitRadius * Math.cos(planet.userData.orbitAngle)
          planet.position.z = orbitRadius * Math.sin(planet.userData.orbitAngle)
        }

        // Faire en sorte que les étiquettes (sprites) fassent toujours face à la caméra
        planet.children.forEach((child) => {
          if (child instanceof THREE.Sprite) {
            // Ajuster la position de l'étiquette pour qu'elle reste au-dessus de la planète
            // tout en faisant face à la caméra
            if (cameraRef.current) {
              // Calculer la direction de la caméra vers la planète
              const cameraPosition = cameraRef.current.position.clone()
              const planetPosition = new THREE.Vector3()
              planet.getWorldPosition(planetPosition)

              // Ajuster légèrement la position de l'étiquette pour qu'elle soit toujours visible
              const directionToCamera = cameraPosition.sub(planetPosition).normalize()

              // Déplacer légèrement l'étiquette dans la direction de la caméra pour éviter les occlusions
              child.position.y = planet.userData.radius * 2.5
            }
          }
        })
      })

      // Animer les lunes
      planetMeshes.forEach((planet) => {
        // Parcourir tous les enfants du planet mesh
        planet.children.forEach((child) => {
          // Si c'est un groupe (orbite de lune)
          if (child instanceof THREE.Group) {
            // Faire tourner l'orbite de la lune
            child.rotation.y += 0.01

            // Parcourir les enfants du groupe (les lunes)
            child.children.forEach((moon) => {
              if (moon instanceof THREE.Mesh && moon.userData.rotationSpeed) {
                // Faire tourner la lune sur elle-même
                moon.rotation.y += moon.userData.rotationSpeed
              }
            })
          }
        })
      })

      // Ajouter l'animation des météorites dans la fonction animate
      // Chercher la section qui met à jour les étoiles et ajouter ce code après

      // Dans la fonction animate, ajouter ce code avant le rendu final (avant composer.render())

      // Animer les météorites
      meteorsData.forEach((meteorData) => {
        // Déplacer la météorite
        meteorData.meteor.position.x += meteorData.direction.x * meteorData.speed
        meteorData.meteor.position.y += meteorData.direction.y * meteorData.speed
        meteorData.meteor.position.z += meteorData.direction.z * meteorData.speed

        // Faire tourner la météorite
        meteorData.meteor.rotation.x += meteorData.rotationSpeed.x
        meteorData.meteor.rotation.y += meteorData.rotationSpeed.y
        meteorData.meteor.rotation.z += meteorData.rotationSpeed.z

        // Mettre à jour la traînée
        const positions = meteorData.trailPositions

        // Décaler toutes les positions
        for (let i = positions.length - 3; i >= 3; i -= 3) {
          positions[i] = positions[i - 3]
          positions[i + 1] = positions[i - 2]
          positions[i + 2] = positions[i - 1]
        }

        // Mettre à jour la première position avec la position actuelle de la météorite
        positions[0] = meteorData.meteor.position.x
        positions[1] = meteorData.meteor.position.y
        positions[2] = meteorData.meteor.position.z

        meteorData.trailGeometry.attributes.position.needsUpdate = true

        // Mettre à jour le shader
        if (meteorData.material.uniforms) {
          meteorData.material.uniforms.uTime.value = elapsedTime
        }

        // Vérifier si la météorite est trop loin et la replacer si nécessaire
        const distanceFromCenter = meteorData.meteor.position.length()
        if (distanceFromCenter > 800) {
          // Repositionner la météorite de l'autre côté
          const newPosition = meteorData.meteor.position.clone().normalize().multiplyScalar(-700)
          meteorData.meteor.position.copy(newPosition)

          // Réinitialiser la traînée
          for (let i = 0; i < positions.length; i += 3) {
            positions[i] = newPosition.x
            positions[i + 1] = newPosition.y
            positions[i + 2] = newPosition.z
          }
        }
      })

      // Check for planet hover
      if (cameraRef.current && sceneRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current)
        const intersects = raycasterRef.current.intersectObjects(planetsRef.current)

        // Modifions la partie qui gère le survol des planètes
        if (intersects.length > 0) {
          const planet = intersects[0].object
          setHoveredPlanet(planet.userData.name)
          document.body.style.cursor = "pointer"
        } else {
          setHoveredPlanet(null)
          document.body.style.cursor = "default"
        }
      }

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update()
      }

      // Gestion des déplacements clavier
      if (controlsRef.current && cameraRef.current) {
        const moveSpeed = 0.5
        const camera = cameraRef.current

        // Calculer la direction avant/arrière (basée sur où pointe la caméra)
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
        forward.y = 0 // Restreindre le mouvement vertical pour les touches W/S
        forward.normalize().multiplyScalar(moveSpeed)

        // Calculer la direction gauche/droite
        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
        right.y = 0 // Restreindre le mouvement vertical pour les touches A/D
        right.normalize().multiplyScalar(moveSpeed)

        // Appliquer les mouvements (configuration AZERTY)
        if (keysPressed.z) camera.position.add(forward)
        if (keysPressed.s) camera.position.sub(forward)
        if (keysPressed.q) camera.position.sub(right)
        if (keysPressed.d) camera.position.add(right)
        if (keysPressed.a) camera.position.y -= moveSpeed
        if (keysPressed.e) camera.position.y += moveSpeed
      }

      // Utiliser le composer au lieu du renderer
      composer.render()
    }

    animate()

    // Modifier la partie cleanup pour gérer correctement les ressources
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

      // Dispose resources
      stars.geometry.dispose()
      if (starMaterial instanceof THREE.ShaderMaterial) {
        starMaterial.dispose()
      }

      // Nettoyer les étoiles distantes
      if (distantStars && distantStars.geometry) distantStars.geometry.dispose()
      if (distantStarMaterial instanceof THREE.ShaderMaterial) {
        distantStarMaterial.dispose()
      }

      sun.geometry.dispose()
      if (sunMaterial instanceof THREE.Material) {
        sunMaterial.dispose()
      }

      glow && glow.geometry && glow.geometry.dispose()
      glowMaterial && glowMaterial instanceof THREE.ShaderMaterial && glowMaterial.dispose()

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

      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      composer.dispose() // Nettoyer le composer

      if (celestialSphere && celestialSphere.geometry) celestialSphere.geometry.dispose()
      if (celestialMaterial instanceof THREE.ShaderMaterial) celestialMaterial.dispose()

      // Dispose des ressources des météorites
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
    }
  }, [router])

  // Ajouter un message d'aide pour la rotation
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

      {/* Carte d'information de la planète */}
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

      {/* Instructions de navigation - visible uniquement sur desktop */}
      <div className="fixed bottom-4 right-4 z-20 hidden md:block">
        <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm">
          <p className="font-semibold mb-1">Navigation:</p>
          <p>Se déplacer via ZQSD A E</p>
          <p className="mt-1">Cliquez sur une planète pour l'explorer</p>
          <p className="text-xs mt-1">Double-cliquez pour visiter la page</p>
        </div>
      </div>

      {/* Indicateur de planète survolée */}
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
