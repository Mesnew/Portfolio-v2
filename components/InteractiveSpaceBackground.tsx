"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"

export function InteractiveSpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 20
    camera.position.y = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    containerRef.current.appendChild(renderer.domElement)

    // Post-processing
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.4, 0.85)
    composer.addPass(bloomPass)

    // Create interactive particles
    const particlesCount = 1000
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesPositions = new Float32Array(particlesCount * 3)
    const particlesSizes = new Float32Array(particlesCount)
    const particlesColors = new Float32Array(particlesCount * 3)
    const particlesSpeed = new Float32Array(particlesCount)
    const particlesOffset = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3

      // Position particles in a sphere
      const radius = Math.random() * 30 + 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      particlesPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      particlesPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      particlesPositions[i3 + 2] = radius * Math.cos(phi)

      // Random sizes
      particlesSizes[i] = Math.random() * 0.5 + 0.1

      // Random speeds
      particlesSpeed[i] = Math.random() * 0.02 + 0.01

      // Random offsets for animation
      particlesOffset[i] = Math.random() * Math.PI * 2

      // Colors - cyan/blue theme
      particlesColors[i3] = 0.1 + Math.random() * 0.2
      particlesColors[i3 + 1] = 0.5 + Math.random() * 0.5
      particlesColors[i3 + 2] = 0.8 + Math.random() * 0.2
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlesPositions, 3))
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(particlesSizes, 1))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(particlesColors, 3))
    particlesGeometry.setAttribute("speed", new THREE.BufferAttribute(particlesSpeed, 1))
    particlesGeometry.setAttribute("offset", new THREE.BufferAttribute(particlesOffset, 1))

    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseIntensity: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        uniform vec2 uMouse;
        uniform float uMouseIntensity;
        
        attribute float size;
        attribute vec3 color;
        attribute float speed;
        attribute float offset;
        
        varying vec3 vColor;
        varying float vIntensity;
        
        void main() {
          vColor = color;
          
          // Calculate distance to mouse in normalized device coordinates
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vec4 projectedPosition = projectionMatrix * mvPosition;
          
          vec2 normalizedCoord = projectedPosition.xy / projectedPosition.w;
          float distToMouse = length(normalizedCoord - uMouse);
          
          // Apply mouse repulsion effect
          float repulsionStrength = max(0.0, 1.0 - distToMouse) * uMouseIntensity;
          vec3 repulsionDir = normalize(position);
          vec3 newPosition = position + repulsionDir * repulsionStrength * 2.0;
          
          // Apply subtle movement
          float angle = uTime * speed + offset;
          newPosition.x += sin(angle) * 0.3;
          newPosition.y += cos(angle * 0.7) * 0.2;
          newPosition.z += sin(angle * 0.5) * 0.3;
          
          // Calculate final position
          vec4 finalPosition = modelViewMatrix * vec4(newPosition, 1.0);
          gl_Position = projectionMatrix * finalPosition;
          
          // Size attenuation
          vIntensity = repulsionStrength;
          float finalSize = size * (1.0 + repulsionStrength * 2.0);
          gl_PointSize = finalSize * uPixelRatio * (100.0 / -finalPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vIntensity;
        
        void main() {
          // Create circular particles with soft edges
          float distanceToCenter = length(gl_PointCoord - 0.5);
          float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          // Enhance color based on mouse interaction
          vec3 finalColor = mix(vColor, vec3(1.0, 1.0, 1.0), vIntensity * 0.5);
          
          gl_FragColor = vec4(finalColor, strength * (0.6 + vIntensity * 0.4));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Mouse interaction
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      intensity: 0,
      targetIntensity: 0,
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1
      mouse.targetIntensity = 1.0

      // Reset intensity decay timeout
      clearTimeout(intensityDecayTimeout)
      intensityDecayTimeout = setTimeout(() => {
        mouse.targetIntensity = 0
      }, 1000)
    }

    let intensityDecayTimeout: NodeJS.Timeout

    window.addEventListener("mousemove", handleMouseMove)

    // Handle touch events for mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouse.targetX = (event.touches[0].clientX / window.innerWidth) * 2 - 1
        mouse.targetY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1
        mouse.targetIntensity = 1.0

        // Reset intensity decay timeout
        clearTimeout(intensityDecayTimeout)
        intensityDecayTimeout = setTimeout(() => {
          mouse.targetIntensity = 0
        }, 1000)
      }
    }

    window.addEventListener("touchmove", handleTouchMove)

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      composer.setSize(window.innerWidth, window.innerHeight)

      if (particlesMaterial.uniforms) {
        particlesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 1.5)
      }
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const clock = new THREE.Clock()

    // Start animation
    setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    const animate = () => {
      requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse movement
      mouse.x += (mouse.targetX - mouse.x) * 0.1
      mouse.y += (mouse.targetY - mouse.y) * 0.1
      mouse.intensity += (mouse.targetIntensity - mouse.intensity) * 0.05

      // Update uniforms
      if (particlesMaterial.uniforms) {
        particlesMaterial.uniforms.uTime.value = elapsedTime
        particlesMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y)
        particlesMaterial.uniforms.uMouseIntensity.value = mouse.intensity
      }

      // Rotate particles group slightly
      particles.rotation.y = elapsedTime * 0.03

      // Move camera slightly based on mouse
      camera.position.x = mouse.x * 2
      camera.position.y = 5 + mouse.y * 2
      camera.lookAt(0, 0, 0)

      // Render
      composer.render()
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("resize", handleResize)
      clearTimeout(intensityDecayTimeout)

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
      composer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
