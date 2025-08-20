"use client"

import { SolarSystem3D } from "@/components/SolarSystem3D"
import { useEffect, useState, useRef } from "react"

interface AdvancedBlackHoleProps {
  onTransitionComplete?: () => void
}

export function AdvancedBlackHole({ onTransitionComplete }: AdvancedBlackHoleProps) {
  const [showBlackHole, setShowBlackHole] = useState(true)
  const [showSystem, setShowSystem] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
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
      const fadeAlpha = time > 4.2 ? Math.max(0, 1 - (time - 4.2) * 3) : 0.1
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.016

      const progress = Math.min((time / 4.5) * 100, 100)
      setLoadingProgress(progress)

      if (time > 4.0 && !showSystem) {
        setShowSystem(true)
      }

      const blackHoleAlpha = time > 4.2 ? Math.max(0, 1 - (time - 4.2) * 3) : 1
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60)
      gradient.addColorStop(0, `rgba(0, 0, 0, ${blackHoleAlpha})`)
      gradient.addColorStop(0.8, `rgba(20, 10, 40, ${0.8 * blackHoleAlpha})`)
      gradient.addColorStop(1, `rgba(255, 100, 0, ${0.3 * blackHoleAlpha})`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2)
      ctx.fill()

      // Draw accretion disk particles with fade out
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

        const particleAlpha = particle.opacity * blackHoleAlpha
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particleAlpha})`
        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      if (time > 4.5) {
        setShowBlackHole(false)
        onTransitionComplete?.()
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

          {loadingProgress < 100 && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-white/60 mb-4 text-sm">Initialisation du système stellaire...</div>
              <div className="w-80 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-100 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div className="text-white/40 mt-2 text-xs">{Math.round(loadingProgress)}%</div>
            </div>
          )}
        </div>
      )}

      <div className={`transition-opacity duration-1000 ${showSystem && !showBlackHole ? "opacity-100" : "opacity-0"}`}>
        {showSystem && <SolarSystem3D />}
      </div>
    </main>
  )
}
