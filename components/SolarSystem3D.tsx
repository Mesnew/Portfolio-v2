"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Loader2 } from "lucide-react"

// Configuration constants
const CONFIG = {
  CAMERA_FOV: 60,
  CAMERA_NEAR: 0.1,
  CAMERA_FAR: 1000,
  CAMERA_INITIAL_POSITION: [0, 30, 40] as const,
  SUN_RADIUS: 5,
  STAR_COUNT: 2000,
  ANIMATION_DURATION: 1.5,
  MOVE_SPEED: 0.5,
  DOUBLE_CLICK_THRESHOLD: 300,
  PIXEL_RATIO_MAX: 1.5,
} as const

// Types
interface Planet {
  name: string
  solarName: string
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
  rings?: boolean
  moons?: { distance: number; radius: number; color: string }[]
}

interface KeysPressed {
  z: boolean
  q: boolean
  s: boolean
  d: boolean
  a: boolean
  e: boolean
}

// Planet data
const PLANETS_DATA: Planet[] = [
  {
    name: "CV",
    solarName: "Mercure",
    radius: 0.8,
    distance: 10,
    rotationSpeed: 0.01,
    orbitSpeed: 0.005,
    color: "#c0c0c0",
    path: "/cv",
    description:
        "La planète la plus proche du Soleil, caractérisée par des températures extrêmes et une surface criblée de cratères.",
    diameter: "4 880 km",
    distanceFromSun: "57,9 millions km",
    orbitalPeriod: "88 jours",
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
        "Souvent appelée la jumelle de la Terre en raison de sa taille similaire, mais avec une atmosphère dense et toxique.",
    diameter: "12 104 km",
    distanceFromSun: "108,2 millions km",
    orbitalPeriod: "225 jours",
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
        "Notre planète, la seule connue à abriter la vie, avec ses océans d'eau liquide et son atmosphère riche en oxygène.",
    diameter: "12 756 km",
    distanceFromSun: "149,6 millions km",
    orbitalPeriod: "365,25 jours",
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
        "La planète rouge, avec ses calottes polaires et ses vallées asséchées, pourrait avoir abrité la vie dans le passé.",
    diameter: "6 792 km",
    distanceFromSun: "227,9 millions km",
    orbitalPeriod: "687 jours",
  },
  {
    name: "Test",
    solarName: "Jupiter",
    radius: 1.8,
    distance: 34,
    rotationSpeed: 0.015,
    orbitSpeed: 0.0008,
    color: "#fcc419",
    path: "/test",
    description:
        "La plus grande planète du système solaire, une géante gazeuse avec sa Grande Tache Rouge et ses nombreuses lunes.",
    diameter: "142 984 km",
    distanceFromSun: "778,5 millions km",
    orbitalPeriod: "11,86 ans",
    rings: true,
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
        "Célèbre pour ses magnifiques anneaux, cette géante gazeuse possède également un système complexe de lunes.",
    diameter: "120 536 km",
    distanceFromSun: "1,4 milliard km",
    orbitalPeriod: "29,46 ans",
    rings: true,
  },
]

// Custom hooks
const useKeyboardControls = () => {
  const keysPressed = useRef<KeysPressed>({
    z: false,
    q: false,
    s: false,
    d: false,
    a: false,
    e: false,
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase() as keyof KeysPressed
      if (key in keysPressed.current) {
        keysPressed.current[key] = true
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase() as keyof KeysPressed
      if (key in keysPressed.current) {
        keysPressed.current[key] = false
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return keysPressed.current
}

const useMousePosition = () => {
  const mouseRef = useRef(new THREE.Vector2())
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    setTooltipPosition({ x: event.clientX, y: event.clientY })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  return { mouseRef, tooltipPosition }
}

// Shader materials
const createStarMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, CONFIG.PIXEL_RATIO_MAX) },
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
        
        float twinkle = sin(uTime * 0.5 + position.x * 0.1 + position.y * 0.1 + position.z * 0.1) * 0.5 + 0.5;
        
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z) * (0.5 + twinkle * 0.5);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        float distanceToCenter = length(gl_PointCoord - 0.5);
        float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
        
        gl_FragColor = vec4(vColor, strength);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
}

const createSunGlowMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      glowColor: { value: new THREE.Color(0xff8800) },
    },
    vertexShader: `
      uniform float uTime;
      varying vec3 vNormal;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 glowColor;
      varying vec3 vNormal;
      
      void main() {
        float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
        float pulse = sin(uTime * 0.5) * 0.1 + 0.9;
        gl_FragColor = vec4(glowColor, intensity * pulse);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
  })
}

export function SolarSystem3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null)
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [followingPlanet, setFollowingPlanet] = useState<THREE.Mesh | null>(null)

  // Refs for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const composerRef = useRef<EffectComposer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const planetsRef = useRef<THREE.Mesh[]>([])
  const raycasterRef = useRef(new THREE.Raycaster())
  const animationRef = useRef<number | null>(null)
  const clockRef = useRef(new THREE.Clock())
  const originalOrbitSpeedsRef = useRef<Map<THREE.Mesh, number>>(new Map())
  const initialCameraPositionRef = useRef<THREE.Vector3 | null>(null)
  const lastClickTimeRef = useRef(0)

  // Materials refs for cleanup
  const materialsRef = useRef<THREE.Material[]>([])

  // Custom hooks
  const keysPressed = useKeyboardControls()
  const { mouseRef, tooltipPosition } = useMousePosition()

  // Memoized values
  const pixelRatio = useMemo(() => Math.min(window.devicePixelRatio, CONFIG.PIXEL_RATIO_MAX), [])

  // Scene creation functions
  const createStarfield = useCallback(() => {
    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(CONFIG.STAR_COUNT * 3)
    const starSizes = new Float32Array(CONFIG.STAR_COUNT)
    const starColors = new Float32Array(CONFIG.STAR_COUNT * 3)

    for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
      const i3 = i * 3
      const radius = Math.random() * 500 + 100
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      starPositions[i3 + 2] = radius * Math.cos(phi)

      starSizes[i] = Math.random() * 1.5 + 0.5

      const colorChoice = Math.random()
      if (colorChoice > 0.9) {
        starColors[i3] = 0.8 + Math.random() * 0.2
        starColors[i3 + 1] = 0.3 + Math.random() * 0.3
        starColors[i3 + 2] = 0.2
      } else if (colorChoice > 0.8) {
        starColors[i3] = 0.8 + Math.random() * 0.2
        starColors[i3 + 1] = 0.8 + Math.random() * 0.2
        starColors[i3 + 2] = 0.3
      } else if (colorChoice > 0.6) {
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

    const starMaterial = createStarMaterial()
    materialsRef.current.push(starMaterial)

    const stars = new THREE.Points(starGeometry, starMaterial)
    return { stars, material: starMaterial }
  }, [])

  const createSun = useCallback(() => {
    const sunGeometry = new THREE.SphereGeometry(CONFIG.SUN_RADIUS, 32, 32)
    const sunMaterial = new THREE.MeshStandardMaterial({
      color: 0xffdd00,
      emissive: 0xff8800,
      emissiveIntensity: 1,
      roughness: 0.7,
      metalness: 0.3,
    })
    materialsRef.current.push(sunMaterial)

    const sun = new THREE.Mesh(sunGeometry, sunMaterial)

    const glowGeometry = new THREE.SphereGeometry(CONFIG.SUN_RADIUS * 1.1, 32, 32)
    const glowMaterial = createSunGlowMaterial()
    materialsRef.current.push(glowMaterial)

    const glow = new THREE.Mesh(glowGeometry, glowMaterial)
    glow.scale.set(1.5, 1.5, 1.5)

    return { sun, sunMaterial, glow, glowMaterial }
  }, [])

  const createPlanets = useCallback(() => {
    const planetMeshes: THREE.Mesh[] = []

    PLANETS_DATA.forEach((planet) => {
      const planetGeometry = new THREE.SphereGeometry(planet.radius, 32, 32)
      const planetMaterial = new THREE.MeshPhongMaterial({
        color: planet.color,
        shininess: 30,
        specular: new THREE.Color(0x333333),
        emissive: new THREE.Color(planet.color).multiplyScalar(0.2),
      })
      materialsRef.current.push(planetMaterial)

      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial)

      const angle = Math.random() * Math.PI * 2
      planetMesh.position.x = planet.distance * Math.cos(angle)
      planetMesh.position.z = planet.distance * Math.sin(angle)

      // Add rings if needed
      if (planet.rings) {
        const ringGeometry = new THREE.RingGeometry(planet.radius * 1.5, planet.radius * 2.2, 64)
        const ringMaterial = new THREE.MeshPhongMaterial({
          color: planet.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
          emissive: new THREE.Color(planet.color).multiplyScalar(0.3),
        })
        materialsRef.current.push(ringMaterial)

        const ring = new THREE.Mesh(ringGeometry, ringMaterial)
        ring.rotation.x = Math.PI / 2
        planetMesh.add(ring)
      }

      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(planet.radius * 1.2, 32, 32)
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
            gl_FragColor = vec4(glowColor, intensity * 0.5);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
      })
      materialsRef.current.push(glowMaterial)

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
      planetMeshes.push(planetMesh)
    })

    return planetMeshes
  }, [])

  const createOrbitLines = useCallback(() => {
    const orbitLines: THREE.Line[] = []

    PLANETS_DATA.forEach((planet) => {
      const orbitGeometry = new THREE.BufferGeometry()
      const orbitMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(planet.color).multiplyScalar(0.5),
        transparent: true,
        opacity: 0.4,
      })
      materialsRef.current.push(orbitMaterial)

      const vertices = []
      const segments = 128
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2
        vertices.push(planet.distance * Math.cos(theta), 0, planet.distance * Math.sin(theta))
      }

      orbitGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial)
      orbitLines.push(orbit)
    })

    return orbitLines
  }, [])

  // Animation functions
  const zoomToPlanet = useCallback((planet: THREE.Mesh) => {
    if (!cameraRef.current || !controlsRef.current) return

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    controlsRef.current.enabled = false

    const planetPosition = new THREE.Vector3()
    planet.getWorldPosition(planetPosition)

    const radius = planet.userData.radius || 1
    const zoomDistance = radius * 3
    const offset = new THREE.Vector3(zoomDistance * 0.7, zoomDistance * 0.5, zoomDistance * 0.7)
    const targetPosition = planetPosition.clone().add(offset)

    const startPosition = cameraRef.current.position.clone()
    const startTarget = controlsRef.current.target.clone()
    const startTime = clockRef.current.getElapsedTime()

    planet.userData.orbitSpeed = 0
    setSelectedPlanet(planet.userData.planetData)

    const animateZoom = () => {
      const currentTime = clockRef.current.getElapsedTime()
      const elapsed = currentTime - startTime

      if (elapsed < CONFIG.ANIMATION_DURATION) {
        const t = elapsed / CONFIG.ANIMATION_DURATION
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
      }
    }

    animationRef.current = requestAnimationFrame(animateZoom)
  }, [])

  const resetView = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current || !initialCameraPositionRef.current) return

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    controlsRef.current.enabled = false

    const startPosition = cameraRef.current.position.clone()
    const startTarget = controlsRef.current.target.clone()
    const targetPosition = initialCameraPositionRef.current.clone()
    const targetTarget = new THREE.Vector3(0, 0, 0)
    const startTime = clockRef.current.getElapsedTime()

    planetsRef.current.forEach((planet) => {
      const originalSpeed = originalOrbitSpeedsRef.current.get(planet)
      if (originalSpeed !== undefined) {
        planet.userData.orbitSpeed = originalSpeed
      }
    })

    setSelectedPlanet(null)

    const animateReset = () => {
      const currentTime = clockRef.current.getElapsedTime()
      const elapsed = currentTime - startTime

      if (elapsed < CONFIG.ANIMATION_DURATION) {
        const t = elapsed / CONFIG.ANIMATION_DURATION
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
      }
    }

    animationRef.current = requestAnimationFrame(animateReset)
  }, [])

  // Event handlers
  const handleClick = useCallback(() => {
    if (!cameraRef.current || !sceneRef.current) return

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current)
    const intersects = raycasterRef.current.intersectObjects(planetsRef.current, false)

    if (intersects.length > 0) {
      const planet = intersects[0].object
      if (planet.userData && planet.userData.path) {
        const now = Date.now()
        if (now - lastClickTimeRef.current < CONFIG.DOUBLE_CLICK_THRESHOLD) {
          router.push(planet.userData.path)
        } else {
          setFollowingPlanet(planet)
          zoomToPlanet(planet)
        }
        lastClickTimeRef.current = now
      }
    } else {
      setFollowingPlanet(null)
      resetView()
    }
  }, [router, zoomToPlanet, resetView])

  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current || !composerRef.current) return

    cameraRef.current.aspect = window.innerWidth / window.innerHeight
    cameraRef.current.updateProjectionMatrix()
    rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    rendererRef.current.setPixelRatio(pixelRatio)
    composerRef.current.setSize(window.innerWidth, window.innerHeight)
  }, [pixelRatio])

  // Main effect for Three.js setup
  useEffect(() => {
    if (!containerRef.current) return

    setIsLoading(true)

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
        CONFIG.CAMERA_FOV,
        window.innerWidth / window.innerHeight,
        CONFIG.CAMERA_NEAR,
        CONFIG.CAMERA_FAR,
    )
    camera.position.set(...CONFIG.CAMERA_INITIAL_POSITION)
    cameraRef.current = camera
    initialCameraPositionRef.current = camera.position.clone()

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(pixelRatio)
    rendererRef.current = renderer
    containerRef.current.appendChild(renderer.domElement)

    // Post-processing setup
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.4, 0.85)
    composer.addPass(bloomPass)
    composerRef.current = composer

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
    controlsRef.current = controls

    // Create scene objects
    const { stars, material: starMaterial } = createStarfield()
    scene.add(stars)

    const { sun, sunMaterial, glow, glowMaterial } = createSun()
    scene.add(sun)
    scene.add(glow)

    const orbitLines = createOrbitLines()
    orbitLines.forEach((orbit) => scene.add(orbit))

    const planetMeshes = createPlanets()
    planetMeshes.forEach((planet) => scene.add(planet))
    planetsRef.current = planetMeshes

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x555555)
    scene.add(ambientLight)

    const sunLight = new THREE.PointLight(0xffffff, 3, 100)
    scene.add(sunLight)

    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
    scene.add(hemisphereLight)

    // Event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("click", handleClick)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      const elapsedTime = clockRef.current.getElapsedTime()

      // Update shaders
      if (starMaterial.uniforms) {
        starMaterial.uniforms.uTime.value = elapsedTime
      }
      if (glowMaterial.uniforms) {
        glowMaterial.uniforms.uTime.value = elapsedTime
      }

      // Update planets
      planetMeshes.forEach((planet) => {
        planet.rotation.y += planet.userData.rotationSpeed

        if (planet.userData.orbitSpeed > 0) {
          planet.userData.orbitAngle += planet.userData.orbitSpeed
          const orbitRadius = PLANETS_DATA.find((p) => p.name === planet.userData.name)?.distance || 10

          planet.position.x = orbitRadius * Math.cos(planet.userData.orbitAngle)
          planet.position.z = orbitRadius * Math.sin(planet.userData.orbitAngle)
        }
      })

      // Check for planet hover (optimized - only when mouse moves)
      if (cameraRef.current && sceneRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current)
        const intersects = raycasterRef.current.intersectObjects(planetsRef.current)

        if (intersects.length > 0) {
          const planet = intersects[0].object
          setHoveredPlanet(planet.userData.solarName)
          document.body.style.cursor = "pointer"
        } else {
          setHoveredPlanet(null)
          document.body.style.cursor = "default"
        }
      }

      // Keyboard movement
      if (controlsRef.current && cameraRef.current) {
        const moveSpeed = CONFIG.MOVE_SPEED
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

      controls.update()
      composer.render()
    }

    animate()
    setIsLoading(false)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("click", handleClick)

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose all materials
      materialsRef.current.forEach((material) => {
        material.dispose()
      })

      // Dispose geometries
      stars.geometry.dispose()
      sun.geometry.dispose()
      glow.geometry.dispose()
      orbitLines.forEach((line) => line.geometry.dispose())
      planetMeshes.forEach((planet) => {
        planet.geometry.dispose()
        planet.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
          }
        })
      })

      renderer.dispose()
      composer.dispose()
    }
  }, [createStarfield, createSun, createOrbitLines, createPlanets, handleResize, handleClick, keysPressed, pixelRatio])

  if (isLoading) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
            <p className="text-white">Initialisation du système solaire...</p>
          </div>
        </div>
    )
  }

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

        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white/80 bg-black/50 px-4 py-2 rounded-full text-sm backdrop-blur-sm z-10">
          <p>Cliquez sur une planète pour faire un gros plan • Double-cliquez pour naviguer</p>
          <p className="text-xs mt-1">Cliquez ailleurs pour revenir à la vue d'ensemble</p>
          <p className="text-xs mt-1">
            <strong>Maintenir clic gauche + déplacer</strong> pour tourner autour du système
          </p>
          <p className="text-xs mt-1">Molette pour zoomer • Clic droit + déplacer pour se déplacer latéralement</p>
          <p className="text-xs mt-1">Touches: ZQSD pour se déplacer • A pour descendre • E pour monter</p>
        </div>
      </>
  )
}
