"use client"

import { Canvas } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh, Group } from "three"
import * as THREE from "three"

function BlackHole() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime

      meshRef.current.rotation.z += 0.005

      let scale = 0.8
      if (time > 3 && time < 4.5) {
        // Subtle instability before collapse
        scale = 0.8 + Math.sin(time * 8) * 0.1
      } else if (time >= 4.5) {
        const collapseTime = time - 4.5
        scale = Math.max(0, 0.8 - collapseTime * 1.5)
      }
      meshRef.current.scale.setScalar(scale)

      if (time > 5.5) {
        meshRef.current.visible = false
      }
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#000000" transparent opacity={0.98} />
    </mesh>
  )
}

function AccretionDisk() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime

      let rotationSpeed = 0.02
      if (time > 3 && time < 4.5) {
        rotationSpeed = 0.08 // Faster as matter falls in
      } else if (time >= 4.5) {
        rotationSpeed = 0.15
      }

      meshRef.current.rotation.z += rotationSpeed

      if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
        let r = 1.0
        let g = 0.4
        let b = 0.1

        if (time > 3 && time < 4.5) {
          // Heating up before final plunge
          const intensity = Math.sin(time * 6) * 0.2 + 0.8
          r = intensity
          g = intensity * 0.3
          b = intensity * 0.05
        }

        meshRef.current.material.color.setRGB(r, g, b)
      }

      if (time >= 4.5) {
        const expansionTime = time - 4.5
        const scale = 1 + expansionTime * 2
        meshRef.current.scale.setScalar(scale)

        if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
          meshRef.current.material.opacity = Math.max(0, 0.6 - expansionTime * 0.8)
        }
      }

      if (time > 5.5) {
        meshRef.current.visible = false
      }
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.2, 3.5, 64]} />
      <meshBasicMaterial color="#FF4500" transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  )
}

function SpirallingMatter() {
  const groupRef = useRef<Group>(null)
  const [particles, setParticles] = useState<
    Array<{
      orbitRadius: number
      orbitSpeed: number
      angle: number
      absorbed: boolean
    }>
  >([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, () => ({
      orbitRadius: Math.random() * 8 + 3,
      orbitSpeed: Math.random() * 0.04 + 0.02,
      angle: Math.random() * Math.PI * 2,
      absorbed: false,
    }))
    setParticles(newParticles)
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const particle = particles[i]
        if (!particle || particle.absorbed) return

        let speedMultiplier = 1
        if (time > 3 && time < 4.5) {
          speedMultiplier = 2 // Faster spiral during instability
        }

        particle.angle += particle.orbitSpeed * (4 / particle.orbitRadius) * speedMultiplier
        particle.orbitRadius *= 0.998 // Gradual inward spiral

        child.position.x = Math.cos(particle.angle) * particle.orbitRadius
        child.position.z = Math.sin(particle.angle) * particle.orbitRadius
        child.position.y = 0 // Keep in disk plane

        if (particle.orbitRadius < 2) {
          if (child.material instanceof THREE.MeshBasicMaterial) {
            child.material.color.setRGB(1, 0.8, 0.4) // White-hot
          }
        }

        if (particle.orbitRadius < 1.1) {
          particle.absorbed = true
          child.visible = false
        }
      })

      if (time > 4.5) {
        groupRef.current.visible = false
      }
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#FFA500" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

function SolarSystemTransition() {
  const groupRef = useRef<Group>(null)
  const [showPlanets, setShowPlanets] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlanets(true)
    }, 4800)
    return () => clearTimeout(timer)
  }, [])

  useFrame((state) => {
    if (groupRef.current && showPlanets) {
      const time = state.clock.elapsedTime - 4.8

      groupRef.current.children.forEach((child, i) => {
        const planetData = [
          { distance: 0, speed: 0, color: "#FFC649", size: 0.3 }, // Sun
          { distance: 2.5, speed: 0.08, color: "#8C7853", size: 0.05 },
          { distance: 3.8, speed: 0.06, color: "#FFC649", size: 0.08 },
          { distance: 5.2, speed: 0.04, color: "#6B93D6", size: 0.08 },
          { distance: 7, speed: 0.03, color: "#CD5C5C", size: 0.06 },
        ][i]

        if (planetData) {
          const emergenceTime = Math.max(0, time - i * 0.3)
          const targetDistance = planetData.distance

          const progress = Math.min(1, emergenceTime * 1.2)
          const easedProgress = 1 - Math.pow(1 - progress, 2)
          const currentDistance = targetDistance * easedProgress

          if (i === 0) {
            child.position.set(0, 0, 0)
          } else {
            const angle = emergenceTime * planetData.speed + i * 1.5
            child.position.x = Math.cos(angle) * currentDistance
            child.position.z = Math.sin(angle) * currentDistance
            child.position.y = 0
          }

          const fadeIn = Math.min(1, emergenceTime * 3)
          if (child.material instanceof THREE.MeshBasicMaterial) {
            child.material.opacity = fadeIn
          }
        }
      })
    }
  })

  if (!showPlanets) return null

  const planets = [
    { size: 0.3, color: "#FFC649" }, // Sun
    { size: 0.05, color: "#8C7853" }, // Mercury
    { size: 0.08, color: "#FFC649" }, // Venus
    { size: 0.08, color: "#6B93D6" }, // Earth
    { size: 0.06, color: "#CD5C5C" }, // Mars
  ]

  return (
    <group ref={groupRef}>
      {planets.map((planet, i) => (
        <mesh key={i}>
          <sphereGeometry args={[planet.size, 16, 16]} />
          <meshBasicMaterial color={planet.color} transparent />
        </mesh>
      ))}
    </group>
  )
}

function StarField() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.children.forEach((child, i) => {
        const twinkle = Math.sin(time * 1.5 + i * 0.2) * 0.2 + 0.8

        if (child.material instanceof THREE.MeshBasicMaterial) {
          child.material.opacity = twinkle * 0.6
        }
      })
    }
  })

  const stars = Array.from({ length: 30 }, (_, i) => {
    const radius = 40 + Math.random() * 80
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)

    return (
      <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshBasicMaterial color="#FFFFFF" transparent />
      </mesh>
    )
  })

  return <group ref={groupRef}>{stars}</group>
}

export function LoadingAnimation3D() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.05} />
        <StarField />
        <BlackHole />
        <AccretionDisk />
        <SpirallingMatter />
        <SolarSystemTransition />
      </Canvas>
    </div>
  )
}
