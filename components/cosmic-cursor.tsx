"use client"

import { useEffect, useState, useRef } from "react"

interface StarParticle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  color: string
  angle: number
  speed: number
  life: number
}

export function CosmicCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<StarParticle[]>([])
  const [isActive, setIsActive] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const frameRef = useRef<number>(0)
  const lastMoveTime = useRef<number>(Date.now())

  // Générer une couleur aléatoire dans la palette bleu/cyan
  const getRandomColor = () => {
    const colors = [
      "rgba(0, 255, 255, 0.8)", // Cyan
      "rgba(0, 200, 255, 0.8)", // Bleu clair
      "rgba(0, 150, 255, 0.8)", // Bleu
      "rgba(100, 200, 255, 0.8)", // Bleu ciel
      "rgba(200, 255, 255, 0.8)", // Cyan clair
      "rgba(255, 255, 255, 0.8)", // Blanc
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Calculer l'angle entre deux points
  const getAngle = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.atan2(y2 - y1, x2 - x1)
  }

  // Créer une nouvelle particule
  const createParticle = (x: number, y: number, angle: number) => {
    return {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 3 + 1, // Taille entre 1 et 4px
      opacity: Math.random() * 0.5 + 0.5, // Opacité entre 0.5 et 1
      color: getRandomColor(),
      angle: angle + (Math.random() * 0.5 - 0.25), // Légère variation de l'angle
      speed: Math.random() * 2 + 1, // Vitesse aléatoire
      life: Math.random() * 500 + 500, // Durée de vie entre 500ms et 1000ms
    }
  }

  // Animation des particules
  const animateParticles = () => {
    setParticles((prevParticles) => {
      const now = Date.now()
      return prevParticles
        .filter((p) => now - p.id < p.life) // Supprimer les particules expirées
        .map((p) => {
          // Déplacer les particules selon leur angle et vitesse
          return {
            ...p,
            x: p.x + Math.cos(p.angle) * p.speed * -1, // Inverser la direction pour l'effet de traînée
            y: p.y + Math.sin(p.angle) * p.speed * -1,
            opacity: p.opacity * 0.96, // Réduire progressivement l'opacité
          }
        })
    })

    frameRef.current = requestAnimationFrame(animateParticles)
  }

  useEffect(() => {
    // Démarrer l'animation des particules
    frameRef.current = requestAnimationFrame(animateParticles)

    return () => {
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  useEffect(() => {
    // Suivre la position de la souris
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const newPosition = { x: e.clientX, y: e.clientY }

      setIsActive(true)
      setIsMoving(true)
      lastMoveTime.current = now

      // Calculer l'angle de déplacement
      const angle = getAngle(prevPosition.x, prevPosition.y, newPosition.x, newPosition.y)

      // Créer des particules seulement si la souris a bougé suffisamment
      const distance = Math.sqrt(
        Math.pow(newPosition.x - prevPosition.x, 2) + Math.pow(newPosition.y - prevPosition.y, 2),
      )

      if (distance > 5) {
        // Créer plusieurs particules pour un effet plus dense
        const particleCount = Math.min(5, Math.floor(distance / 10) + 1)
        const newParticles = []

        for (let i = 0; i < particleCount; i++) {
          // Interpoler les positions pour une traînée continue
          const ratio = i / particleCount
          const x = prevPosition.x + (newPosition.x - prevPosition.x) * ratio
          const y = prevPosition.y + (newPosition.y - prevPosition.y) * ratio

          newParticles.push(createParticle(x, y, angle))
        }

        setParticles((prev) => [...prev, ...newParticles].slice(-100)) // Limiter à 100 particules
        setPrevPosition(newPosition)
      }

      setMousePosition(newPosition)
    }

    // Vérifier si la souris s'est arrêtée
    const checkMouseStopped = () => {
      if (Date.now() - lastMoveTime.current > 100) {
        setIsMoving(false)
      }
      setTimeout(checkMouseStopped, 100)
    }
    checkMouseStopped()

    // Désactiver l'effet quand la souris quitte la fenêtre
    const handleMouseLeave = () => {
      setIsActive(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [prevPosition])

  // Gérer les événements tactiles pour les appareils mobiles
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const now = Date.now()
        const newPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }

        setIsActive(true)
        setIsMoving(true)
        lastMoveTime.current = now

        // Calculer l'angle de déplacement
        const angle = getAngle(prevPosition.x, prevPosition.y, newPosition.x, newPosition.y)

        // Créer des particules seulement si le toucher a bougé suffisamment
        const distance = Math.sqrt(
          Math.pow(newPosition.x - prevPosition.x, 2) + Math.pow(newPosition.y - prevPosition.y, 2),
        )

        if (distance > 5) {
          // Créer plusieurs particules pour un effet plus dense
          const particleCount = Math.min(3, Math.floor(distance / 15) + 1)
          const newParticles = []

          for (let i = 0; i < particleCount; i++) {
            // Interpoler les positions pour une traînée continue
            const ratio = i / particleCount
            const x = prevPosition.x + (newPosition.x - prevPosition.x) * ratio
            const y = prevPosition.y + (newPosition.y - prevPosition.y) * ratio

            newParticles.push(createParticle(x, y, angle))
          }

          setParticles((prev) => [...prev, ...newParticles].slice(-60)) // Limiter à 60 particules pour mobile
          setPrevPosition(newPosition)
        }

        setMousePosition(newPosition)
      }
    }

    const handleTouchEnd = () => {
      setIsActive(false)
    }

    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [prevPosition])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Étoile principale qui suit le curseur */}
      {isActive && (
        <div
          className="absolute rounded-full bg-white transition-all duration-200"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translate(-50%, -50%)",
            boxShadow: isMoving
              ? "0 0 15px 3px rgba(255, 255, 255, 0.9), 0 0 30px 8px rgba(0, 200, 255, 0.7)"
              : "0 0 10px 2px rgba(255, 255, 255, 0.8), 0 0 20px 6px rgba(0, 200, 255, 0.6)",
            width: isMoving ? "6px" : "4px",
            height: isMoving ? "6px" : "4px",
          }}
        />
      )}

      {/* Particules de la traînée */}
      {particles.map((particle, index) => (
        <div
          key={`particle-${particle.id}-${index}`}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.size / 2}px ${particle.color}`,
            transform: "translate(-50%, -50%)",
            opacity: particle.opacity,
            transition: "opacity 1s ease-out, transform 1s ease-out",
          }}
        />
      ))}
    </div>
  )
}

