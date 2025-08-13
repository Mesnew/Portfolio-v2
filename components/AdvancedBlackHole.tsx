"use client"

import { SolarSystem3D } from "@/components/SolarSystem3D"
import { useEffect, useState, useRef } from "react"

interface AdvancedBlackHoleProps {
  onTransitionComplete?: () => void
}

export function AdvancedBlackHole({ onTransitionComplete }: AdvancedBlackHoleProps) {
  const [showBlackHole, setShowBlackHole] = useState(true)
  const [showSystem, setShowSystem] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    let time = 0

    const particles: Array<{
      angle: number
      radius: number
      speed: number
      size: number
      opacity: number
    }> = []

    for (let i = 0; i < 100; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 80 + Math.random() * 120,
        speed: 0.02 + Math.random() * 0.03,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.7,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.016

      // Draw black hole
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60)
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)")
      gradient.addColorStop(0.8, "rgba(20, 10, 40, 0.8)")
      gradient.addColorStop(1, "rgba(255, 100, 0, 0.3)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2)
      ctx.fill()

      // Draw accretion disk particles
      particles.forEach((particle) => {
        particle.angle += particle.speed
        particle.radius -= 0.2

        if (particle.radius < 60) {
          particle.radius = 80 + Math.random() * 120
          particle.angle = Math.random() * Math.PI * 2
        }

        const x = centerX + Math.cos(particle.angle) * particle.radius
        const y = centerY + Math.sin(particle.angle) * particle.radius

        const temp = Math.max(0, (200 - particle.radius) / 200)
        const r = Math.floor(255 * temp)
        const g = Math.floor(100 * temp)
        const b = Math.floor(20 * temp)

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      if (time > 4) {
        setShowSystem(true)
        setTimeout(() => {
          setShowBlackHole(false)
          onTransitionComplete?.()
        }, 1000)
        return
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [onTransitionComplete])

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {showBlackHole && (
        <div className="fixed inset-0 z-50">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{
              background: "radial-gradient(circle, #0f0a1e 0%, #000000 100%)",
            }}
          />
        </div>
      )}

      {showSystem && (
        <div className={`transition-opacity duration-1000 ${showBlackHole ? "opacity-0" : "opacity-100"}`}>
          <SolarSystem3D />
        </div>
      )}
    </main>
  )
}
