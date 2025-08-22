"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function StarField() {
  const ref = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    const colors = new Float32Array(2000 * 3)

    for (let i = 0; i < 2000; i++) {
      const radius = Math.random() * 100 + 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const colorType = Math.random()
      if (colorType < 0.7) {
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 1
      } else if (colorType < 0.85) {
        colors[i * 3] = 0.7
        colors[i * 3 + 1] = 0.8
        colors[i * 3 + 2] = 1
      } else if (colorType < 0.95) {
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 0.7
      } else {
        colors[i * 3] = 1
        colors[i * 3 + 1] = 0.7
        colors[i * 3 + 2] = 0.7
      }
    }

    return [positions, colors]
  }, [])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0002
      ref.current.rotation.x += 0.0001
    }
  })

  return (
      <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial
            transparent
            vertexColors
            size={0.8}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
        />
      </Points>
  )
}

function CosmicDust() {
  const ref = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const positions = new Float32Array(800 * 3)
    for (let i = 0; i < 800; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200
    }
    return positions
  }, [])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0001
      ref.current.rotation.z += 0.00005
    }
  })

  return (
      <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial
            transparent
            color="#4a90e2"
            size={0.3}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.3}
            blending={THREE.AdditiveBlending}
        />
      </Points>
  )
}

function DistantGalaxies() {
  const galaxies = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [(Math.random() - 0.5) * 300, (Math.random() - 0.5) * 300, (Math.random() - 0.5) * 300] as [
        number,
        number,
        number,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? "#ff6b6b" : "#4ecdc4",
    }))
  }, [])

  return (
      <>
        {galaxies.map((galaxy, i) => (
            <GalaxySpiral key={i} {...galaxy} />
        ))}
      </>
  )
}

function GalaxySpiral({
                        position,
                        rotation,
                        scale,
                        color,
                      }: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  color: string
}) {
  const ref = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const positions = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      const angle = (i / 200) * Math.PI * 4
      const radius = (i / 200) * 15
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    return positions
  }, [])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001
    }
  })

  return (
      <group position={position} rotation={rotation} scale={scale}>
        <Points ref={ref} positions={positions} stride={3}>
          <PointMaterial
              transparent
              color={color}
              size={0.5}
              sizeAttenuation={true}
              depthWrite={false}
              opacity={0.6}
              blending={THREE.AdditiveBlending}
          />
        </Points>
      </group>
  )
}

function Nebula() {
  const ref = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    const colors = new Float32Array(1000 * 3)

    for (let i = 0; i < 1000; i++) {
      const radius = Math.random() * 30 + 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const colorType = Math.random()
      if (colorType < 0.4) {
        colors[i * 3] = 0.8
        colors[i * 3 + 1] = 0.2
        colors[i * 3 + 2] = 1
      } else if (colorType < 0.7) {
        colors[i * 3] = 1
        colors[i * 3 + 1] = 0.3
        colors[i * 3 + 2] = 0.8
      } else {
        colors[i * 3] = 0.3
        colors[i * 3 + 1] = 0.7
        colors[i * 3 + 2] = 1
      }
    }

    return [positions, colors]
  }, [])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0003
      ref.current.rotation.x += 0.0002
    }
  })

  return (
      <group position={[50, -30, -80]}>
        <Points ref={ref} positions={positions} stride={3}>
          <PointMaterial
              transparent
              vertexColors
              size={1.5}
              sizeAttenuation={true}
              depthWrite={false}
              opacity={0.4}
              blending={THREE.AdditiveBlending}
          />
        </Points>
      </group>
  )
}

export function EnhancedCosmicBackground() {
  return (
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 0], fov: 75 }} style={{ background: "transparent" }}>
          <StarField />
          <CosmicDust />
          <DistantGalaxies />
          <Nebula />
        </Canvas>
      </div>
  )
}

export default EnhancedCosmicBackground
