"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

interface PlanetBackgroundProps {
  planetType: "mercury" | "venus" | "earth" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune"
}

export function PlanetBackground3D({ planetType }: PlanetBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Stars
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 300
    const starPositions = new Float32Array(starCount * 3)
    const starSizes = new Float32Array(starCount)
    const starColors = new Float32Array(starCount * 3)

    // Créer des étoiles aléatoires
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3

      // Position stars in a sphere around the camera
      const radius = Math.random() * 80 + 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      starPositions[i3 + 2] = radius * Math.cos(phi)

      // Random star sizes
      starSizes[i] = Math.random() * 1.5 + 0.5

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

    const starMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Planet
    const getPlanetTexture = (type: string) => {
      switch (type) {
        case "mercury":
          return "/textures/mercury.jpg"
        case "venus":
          return "/textures/venus.jpg"
        case "earth":
          return "/textures/earth.jpg"
        case "mars":
          return "/textures/mars.jpg"
        case "jupiter":
          return "/textures/jupiter.jpg"
        case "saturn":
          return "/textures/saturn.jpg"
        case "uranus":
          return "/textures/uranus.jpg"
        case "neptune":
          return "/textures/neptune.jpg"
        default:
          return "/textures/earth.jpg"
      }
    }

    const getPlanetSize = (type: string) => {
      switch (type) {
        case "mercury":
          return 1.2
        case "venus":
          return 1.5
        case "earth":
          return 1.5
        case "mars":
          return 1.3
        case "jupiter":
          return 2.2
        case "saturn":
          return 2.0
        case "uranus":
          return 1.8
        case "neptune":
          return 1.7
        default:
          return 1.5
      }
    }

    // Create planet
    const textureLoader = new THREE.TextureLoader()
    const planetTexture = textureLoader.load(getPlanetTexture(planetType))
    const planetSize = getPlanetSize(planetType)

    const planetGeometry = new THREE.SphereGeometry(planetSize, 64, 64)
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: planetTexture,
      roughness: 0.8,
      metalness: 0.2,
    })

    const planet = new THREE.Mesh(planetGeometry, planetMaterial)

    // Special case for Saturn with rings
    if (planetType === "saturn") {
      const ringGeometry = new THREE.RingGeometry(2.2, 3.5, 64)
      const ringTexture = textureLoader.load("/textures/saturn-rings.png")
      const ringMaterial = new THREE.MeshBasicMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      })
      const rings = new THREE.Mesh(ringGeometry, ringMaterial)
      rings.rotation.x = Math.PI / 2
      planet.add(rings)
    }

    scene.add(planet)

    // Position the planet slightly off-center for a more dynamic view
    planet.position.x = 0.5
    planet.position.y = -0.2

    // Atmosphere for Earth
    if (planetType === "earth") {
      const atmosphereGeometry = new THREE.SphereGeometry(planetSize + 0.1, 64, 64)
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x5599ff,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide,
      })
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
      scene.add(atmosphere)
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate planet
      planet.rotation.y += 0.001

      // Update controls
      controls.update()

      // Render
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      scene.clear()
    }
  }, [planetType])

  return <div ref={containerRef} className="fixed inset-0 -z-10" />
}

