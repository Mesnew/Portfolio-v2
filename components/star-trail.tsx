"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface StarParticle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  color: string
}

export function StarTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<StarParticle[]>([])
  const [isActive, setIsActive] = useState(false)

  // Générer une couleur aléatoire dans la palette bleu/cyan
  const getRandomColor = () => {
    const colors = [
      "rgba(0, 255, 255, 0.8)", // Cyan
      "rgba(0, 200, 255, 0.8)", // Bleu clair
      "rgba(0, 150, 255, 0.8)", // Bleu
      "rgba(100, 200, 255, 0.8)", // Bleu ciel
      "rgba(200, 255, 255, 0.8)", // Cyan clair
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    // Suivre la position de la souris
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsActive(true)

      // Ajouter une nouvelle particule
      const newParticle: StarParticle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 4 + 1, // Taille entre 1 et 5px
        opacity: Math.random() * 0.5 + 0.5, // Opacité entre 0.5 et 1
        color: getRandomColor(),
      }

      setParticles((prevParticles) => [...prevParticles.slice(-30), newParticle]) // Garder seulement les 30 dernières particules
    }

    // Désactiver l'effet quand la souris ne bouge pas
    const handleMouseStop = () => {
      setTimeout(() => {
        setIsActive(false)
      }, 100)
    }

    // Nettoyer les particules après un certain temps
    const cleanupInterval = setInterval(() => {
      setParticles((prevParticles) => prevParticles.filter((p) => Date.now() - p.id < 1000))
    }, 100)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousestop", handleMouseStop)
    document.body.addEventListener("mouseleave", handleMouseStop)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousestop", handleMouseStop)
      document.body.removeEventListener("mouseleave", handleMouseStop)
      clearInterval(cleanupInterval)
    }
  }, [])

  // Gérer les événements tactiles pour les appareils mobiles
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY })
        setIsActive(true)

        // Ajouter une nouvelle particule
        const newParticle: StarParticle = {
          id: Date.now(),
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.5 + 0.5,
          color: getRandomColor(),
        }

        setParticles((prevParticles) => [...prevParticles.slice(-30), newParticle])
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
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Étoile principale qui suit le curseur */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute rounded-full bg-white"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              translateX: "-50%",
              translateY: "-50%",
              boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.8), 0 0 20px 6px rgba(0, 200, 255, 0.6)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="h-3 w-3" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particules de la traînée */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.size / 2}px ${particle.color}`,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: particle.opacity }}
          animate={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}

