"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = `
  uniform float uSize;
  uniform float uTime;
  uniform float uHoleSize;
  
  attribute float aScale;
  attribute vec3 aRandomness;
  
  varying vec3 vColor;
  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Spin
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz) + uHoleSize;
    float uTimeOffset = uTime + (uHoleSize * 30.0);
    float angleOffset = (1.0 / distanceToCenter) * uTimeOffset * 0.2;
    angle += angleOffset;
    
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;  
    modelPosition.xyz += aRandomness; 
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition; 
    float scale = uSize * aScale;
    
    gl_PointSize = scale;
    gl_PointSize *= ( 1.0 / - viewPosition.z );
    vColor = color;
  }
`

const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);
    
    vec3 color = mix(vec3(0.0), vColor, strength);
    gl_FragColor = vec4(color, strength);
  }
`

interface RotatingGalaxyProps {
  position?: [number, number, number]
  scale?: number
}

export default function RotatingGalaxy({ position = [0, 0, 0], scale = 1 }: RotatingGalaxyProps) {
  const meshRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const parameters = {
    count: 50000,
    radius: 8,
    branches: 4,
    randomness: 0.5,
    randomnessPower: 3,
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
  }

  const { positions, colors, scales, randomness } = useMemo(() => {
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const scales = new Float32Array(parameters.count)
    const randomness = new Float32Array(parameters.count * 3)

    const insideColor = new THREE.Color(parameters.insideColor)
    const outsideColor = new THREE.Color(parameters.outsideColor)

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3

      // Position
      const radius = Math.random() * parameters.radius
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius *
        0.1
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius

      positions[i3] = Math.cos(branchAngle) * radius
      positions[i3 + 1] = 0
      positions[i3 + 2] = Math.sin(branchAngle) * radius

      // Randomness
      randomness[i3] = randomX
      randomness[i3 + 1] = randomY
      randomness[i3 + 2] = randomZ

      // Color
      const mixedColor = insideColor.clone()
      mixedColor.lerp(outsideColor, radius / parameters.radius)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b

      // Scales
      scales[i] = Math.random()
    }

    return { positions, colors, scales, randomness }
  }, [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <group position={position} scale={scale}>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={parameters.count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={parameters.count} array={colors} itemSize={3} />
          <bufferAttribute attach="attributes-aScale" count={parameters.count} array={scales} itemSize={1} />
          <bufferAttribute attach="attributes-aRandomness" count={parameters.count} array={randomness} itemSize={3} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uSize: { value: 6 },
            uHoleSize: { value: 0.15 },
          }}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors={true}
          transparent={true}
        />
      </points>
    </group>
  )
}
