"use client"

import { SolarSystem3D } from "@/components/SolarSystem3D"
import { useEffect, useState, useRef } from "react"

export default function Home() {
  const [showBlackHole, setShowBlackHole] = useState(true)
  const [showSystem, setShowSystem] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajuster la taille du canvas avec haute résolution
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"
      ctx.scale(dpr, dpr)
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    // Particules du disque d'accrétion
    const accretionParticles: Array<{
      x: number
      y: number
      angle: number
      radius: number
      angularVelocity: number
      temperature: number
      size: number
      color: string
      life: number
      absorbed: boolean
      originalRadius: number
      redshift: number
    }> = []

    // Rayonnement de Hawking
    const hawkingRadiation: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      energy: number
      life: number
      maxLife: number
      wavelength: number
    }> = []

    // Fragments d'explosion
    const explosionFragments: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      energy: number
      life: number
      maxLife: number
      trail: Array<{ x: number; y: number; opacity: number }>
      type: "matter" | "antimatter" | "photon"
    }> = []

    // Ondes gravitationnelles
    const gravitationalWaves: Array<{
      x: number
      y: number
      radius: number
      intensity: number
      maxRadius: number
      frequency: number
    }> = []

    // Lentilles gravitationnelles (étoiles d'arrière-plan déformées)
    const backgroundStars: Array<{
      x: number
      y: number
      brightness: number
      originalX: number
      originalY: number
      distorted: boolean
    }> = []

    // Particules de poussière cosmique
    const cosmicDust: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      life: number
    }> = []

    let time = 0
    let blackHoleMass = 100
    let schwarzschildRadius = 60
    let phase = 0

    // Initialiser les étoiles d'arrière-plan
    const initBackgroundStars = () => {
      for (let i = 0; i < 150; i++) {
        backgroundStars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          brightness: Math.random() * 0.8 + 0.2,
          originalX: Math.random() * window.innerWidth,
          originalY: Math.random() * window.innerHeight,
          distorted: false,
        })
      }
    }

    // Créer le disque d'accrétion avec plus de réalisme
    const createAccretionDisk = () => {
      for (let i = 0; i < 250; i++) {
        const radius = Math.random() * 350 + 80
        const angle = Math.random() * Math.PI * 2
        const angularVelocity = Math.sqrt(1 / radius) * 0.03

        const temperature = Math.max(1000, 1e6 / Math.sqrt(radius / 50))

        accretionParticles.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          angle: angle,
          radius: radius,
          originalRadius: radius,
          angularVelocity: angularVelocity,
          temperature: temperature,
          size: Math.random() * 3 + 1,
          color: getTemperatureColor(temperature),
          life: 0,
          absorbed: false,
          redshift: 0,
        })
      }
    }

    // Couleur basée sur la température avec redshift
    const getTemperatureColor = (temp: number, redshift = 0): string => {
      const effectiveTemp = temp * (1 - redshift * 0.3)

      if (effectiveTemp > 1e6) return "#FFFFFF"
      if (effectiveTemp > 5e5) return "#87CEEB"
      if (effectiveTemp > 1e5) return "#FFD700"
      if (effectiveTemp > 5e4) return "#FF6347"
      return redshift > 0.5 ? "#4B0000" : "#8B0000"
    }

    // Créer le rayonnement de Hawking amélioré
    const createHawkingRadiation = () => {
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 5 + 3
        const wavelength = Math.random() * 700 + 400 // nm

        hawkingRadiation.push({
          x: centerX + Math.cos(angle) * (schwarzschildRadius + 5),
          y: centerY + Math.sin(angle) * (schwarzschildRadius + 5),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1,
          energy: Math.random() * 1e15 + 1e14,
          life: 0,
          maxLife: Math.random() * 250 + 150,
          wavelength: wavelength,
        })
      }
    }

    // Créer l'explosion finale avec antimatière
    const createFinalExplosion = () => {
      for (let i = 0; i < 500; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 15 + 8
        const energy = Math.random() * 1e16 + 1e15

        let color, type: "matter" | "antimatter" | "photon"

        if (Math.random() < 0.3) {
          // Photons gamma
          color = "#FFFFFF"
          type = "photon"
        } else if (Math.random() < 0.5) {
          // Antimatière
          color = "#FF00FF"
          type = "antimatter"
        } else {
          // Matière normale
          if (energy > 8e15) {
            color = "#FFFFFF"
          } else if (energy > 5e15) {
            color = "#9370DB"
          } else if (energy > 3e15) {
            color = "#483D8B"
          } else {
            color = "#2E0854"
          }
          type = "matter"
        }

        explosionFragments.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 6 + 2,
          color: color,
          energy: energy,
          life: 0,
          maxLife: Math.random() * 350 + 200,
          trail: [],
          type: type,
        })
      }
    }

    // Créer les ondes gravitationnelles avec fréquences
    const createGravitationalWaves = () => {
      for (let i = 0; i < 8; i++) {
        gravitationalWaves.push({
          x: centerX,
          y: centerY,
          radius: 0,
          intensity: 1,
          maxRadius: Math.max(window.innerWidth, window.innerHeight) * 1.2,
          frequency: Math.random() * 0.1 + 0.05,
        })
      }
    }

    // Créer la poussière cosmique
    const createCosmicDust = () => {
      for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 400 + 200

        cosmicDust.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          life: 0,
        })
      }
    }

    // Effet de lentille gravitationnelle
    const applyGravitationalLensing = () => {
      backgroundStars.forEach((star) => {
        const dx = star.originalX - centerX
        const dy = star.originalY - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < schwarzschildRadius * 3 && schwarzschildRadius > 20) {
          const lensStrength = (schwarzschildRadius * 2) / distance
          const deflectionAngle = lensStrength * 0.1

          star.x = centerX + dx * (1 + deflectionAngle)
          star.y = centerY + dy * (1 + deflectionAngle)
          star.distorted = true
          star.brightness = Math.min(1, star.brightness * (1 + lensStrength * 0.5))
        } else {
          star.x = star.originalX
          star.y = star.originalY
          star.distorted = false
        }
      })
    }

    initBackgroundStars()
    createAccretionDisk()
    createCosmicDust()

    const animate = () => {
      // Fond de l'espace profond avec nébuleuse
      const spaceGradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          Math.max(window.innerWidth, window.innerHeight),
      )
      spaceGradient.addColorStop(0, "rgba(15, 10, 30, 1)")
      spaceGradient.addColorStop(0.3, "rgba(10, 5, 20, 1)")
      spaceGradient.addColorStop(0.7, "rgba(5, 5, 15, 1)")
      spaceGradient.addColorStop(1, "rgba(0, 0, 5, 1)")
      ctx.fillStyle = spaceGradient
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Appliquer la lentille gravitationnelle
      applyGravitationalLensing()

      // Dessiner les étoiles d'arrière-plan avec lentille gravitationnelle
      backgroundStars.forEach((star) => {
        const twinkle = Math.abs(Math.sin(time * 0.03 + star.x * 0.001)) * 0.5 + 0.5
        const alpha = star.brightness * twinkle * 0.8

        if (star.distorted) {
          // Étoile déformée par la lentille gravitationnelle
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(star.x, star.y, Math.max(1, Math.random() * 2.5), 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, Math.max(0.5, Math.random() * 1.5), 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Poussière cosmique
      cosmicDust.forEach((dust, index) => {
        dust.x += dust.vx
        dust.y += dust.vy
        dust.life++

        // Interaction gravitationnelle faible
        const dx = centerX - dust.x
        const dy = centerY - dust.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > schwarzschildRadius * 2) {
          const force = 0.001 / (distance * distance)
          dust.vx += (dx / distance) * force
          dust.vy += (dy / distance) * force
        }

        const dustOpacity = dust.opacity * Math.abs(Math.sin(dust.life * 0.01))
        ctx.fillStyle = `rgba(100, 80, 120, ${dustOpacity})`
        ctx.beginPath()
        ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2)
        ctx.fill()

        // Recycler la poussière
        if (dust.x < -50 || dust.x > window.innerWidth + 50 || dust.y < -50 || dust.y > window.innerHeight + 50) {
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * 400 + 200
          dust.x = centerX + Math.cos(angle) * distance
          dust.y = centerY + Math.sin(angle) * distance
          dust.life = 0
        }
      })

      time += 1

      // Phase 0: Disque d'accrétion amélioré (0-120 frames / 2s)
      if (time < 120) {
        phase = 0

        // Dessiner l'horizon des événements avec distorsion
        const horizonRadius = Math.max(5, schwarzschildRadius)
        const distortion = Math.abs(Math.sin(time * 0.1)) * 2

        // Ergosphère (pour un trou noir en rotation)
        const ergosphereGradient = ctx.createRadialGradient(
            centerX,
            centerY,
            horizonRadius,
            centerX,
            centerY,
            horizonRadius * 1.8,
        )
        ergosphereGradient.addColorStop(0, "rgba(40, 0, 80, 0.6)")
        ergosphereGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = ergosphereGradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, horizonRadius * 1.8, 0, Math.PI * 2)
        ctx.fill()

        // Horizon des événements principal
        const horizonGradient = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            Math.max(horizonRadius * 2.5, 15),
        )
        horizonGradient.addColorStop(0, "rgba(0, 0, 0, 1)")
        horizonGradient.addColorStop(0.6, "rgba(30, 0, 60, 0.95)")
        horizonGradient.addColorStop(0.8, "rgba(60, 0, 120, 0.7)")
        horizonGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = horizonGradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, horizonRadius + distortion, 0, Math.PI * 2)
        ctx.fill()

        // Photon sphere avec pulsation
        const photonSphereRadius = horizonRadius * 1.5
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 + Math.abs(Math.sin(time * 0.05)) * 0.3})`
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.arc(centerX, centerY, Math.max(photonSphereRadius, 8), 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])

        // Animer le disque d'accrétion avec effets relativistes
        accretionParticles.forEach((particle, index) => {
          if (particle.absorbed) return

          // Spirale vers le trou noir avec ralentissement temporel
          const timeDialation = Math.max(0.1, 1 - (schwarzschildRadius * 2) / particle.radius)
          particle.radius = Math.max(schwarzschildRadius + 1, particle.radius - 0.4 * timeDialation)
          particle.angle += particle.angularVelocity * timeDialation

          // Redshift gravitationnel
          particle.redshift = Math.max(0, 1 - particle.radius / particle.originalRadius)

          // Mise à jour de la position
          particle.x = centerX + Math.cos(particle.angle) * particle.radius
          particle.y = centerY + Math.sin(particle.angle) * particle.radius

          // Chauffage par friction et marée gravitationnelle
          const tidalHeating = Math.max(0, (200 - particle.radius) * 3000)
          particle.temperature = Math.min(3e6, particle.temperature + tidalHeating)
          particle.color = getTemperatureColor(particle.temperature, particle.redshift)

          // Spaghettification près de l'horizon
          if (particle.radius < schwarzschildRadius * 1.5) {
            particle.size *= 1.02 // Étirement
          }

          // Absorption par le trou noir
          if (particle.radius <= schwarzschildRadius + 2) {
            particle.absorbed = true
            blackHoleMass += 0.15

            // Émission de rayons X lors de l'absorption
            for (let i = 0; i < 3; i++) {
              const rayAngle = Math.random() * Math.PI * 2
              const raySpeed = Math.random() * 8 + 5

              hawkingRadiation.push({
                x: particle.x,
                y: particle.y,
                vx: Math.cos(rayAngle) * raySpeed,
                vy: Math.sin(rayAngle) * raySpeed,
                size: Math.random() * 1.5 + 0.5,
                energy: particle.temperature * 1e10,
                life: 0,
                maxLife: 100,
                wavelength: 0.1, // Rayons X
              })
            }
            return
          }

          // Halo thermique amélioré
          if (particle.temperature > 5e5) {
            const thermalRadius = Math.max(1, particle.size * 3)
            const thermalGradient = ctx.createRadialGradient(
                particle.x,
                particle.y,
                0,
                particle.x,
                particle.y,
                thermalRadius,
            )

            const baseColor = particle.color.replace("#", "")
            const r = Number.parseInt(baseColor.substr(0, 2), 16)
            const g = Number.parseInt(baseColor.substr(2, 2), 16)
            const b = Number.parseInt(baseColor.substr(4, 2), 16)

            thermalGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`)
            thermalGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.5)`)
            thermalGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

            ctx.fillStyle = thermalGradient
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, thermalRadius, 0, Math.PI * 2)
            ctx.fill()
          }

          // Particule principale avec effet de redshift
          ctx.fillStyle = particle.color
          if (particle.temperature > 1e6) {
            ctx.shadowColor = particle.color
            ctx.shadowBlur = 15 * (1 - particle.redshift * 0.5)
          }
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, Math.max(0.5, particle.size), 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0

          particle.life++
        })

        // Jets relativistes améliorés
        if (time > 60) {
          for (let i = 0; i < 2; i++) {
            const jetDirection = i === 0 ? -1 : 1
            const jetLength = 250
            const jetWidth = 12

            // Jet principal avec structure interne
            const jetGradient = ctx.createLinearGradient(centerX, centerY, centerX, centerY + jetDirection * jetLength)
            jetGradient.addColorStop(0, "rgba(0, 255, 255, 0.9)")
            jetGradient.addColorStop(0.5, "rgba(100, 200, 255, 0.7)")
            jetGradient.addColorStop(1, "rgba(0, 100, 200, 0.3)")

            ctx.strokeStyle = jetGradient
            ctx.lineWidth = jetWidth
            ctx.shadowColor = "rgba(0, 255, 255, 0.8)"
            ctx.shadowBlur = 20
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(centerX, centerY + jetDirection * jetLength)
            ctx.stroke()

            // Jet secondaire (plus fin)
            ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
            ctx.lineWidth = jetWidth * 0.3
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(centerX, centerY + jetDirection * jetLength * 0.8)
            ctx.stroke()

            // Particules du jet avec mouvement hélicoïdal
            for (let j = 0; j < 15; j++) {
              const jetProgress = j / 15
              const jetY = centerY + jetDirection * (jetProgress * jetLength)
              const helixRadius = Math.sin(jetProgress * Math.PI * 4 + time * 0.2) * 8
              const jetX = centerX + helixRadius
              const jetOpacity = Math.abs(Math.sin(time * 0.1 + j * 0.3)) * 0.9 + 0.1

              ctx.fillStyle = `rgba(255, 255, 255, ${jetOpacity * (1 - jetProgress * 0.5)})`
              ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
              ctx.shadowBlur = 10
              ctx.beginPath()
              ctx.arc(jetX, jetY, Math.max(1, Math.random() * 4), 0, Math.PI * 2)
              ctx.fill()
            }
          }
          ctx.shadowBlur = 0
        }
      }

      // Phase 1: Évaporation de Hawking améliorée (120-240 frames / 2s)
      else if (time < 240) {
        if (phase === 0) {
          phase = 1
          createHawkingRadiation()
        }

        // Le trou noir rétrécit avec instabilité croissante
        const evaporationRate = 0.5 + (time - 120) * 0.01
        schwarzschildRadius = Math.max(8, 60 - (time - 120) * evaporationRate)

        // Horizon des événements instable
        const horizonRadius = Math.max(5, schwarzschildRadius)
        const instability = (time - 120) / 120
        const quantumFluctuation = Math.abs(Math.sin(time * 0.3)) * instability * 12

        const horizonGradient = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            Math.max(horizonRadius + quantumFluctuation + 25, 20),
        )
        horizonGradient.addColorStop(0, "rgba(0, 0, 0, 1)")
        horizonGradient.addColorStop(0.4, `rgba(150, 0, 255, ${0.9 + instability * 0.1})`)
        horizonGradient.addColorStop(0.7, `rgba(100, 0, 200, ${0.7 + instability * 0.2})`)
        horizonGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = horizonGradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, Math.max(horizonRadius + quantumFluctuation, 5), 0, Math.PI * 2)
        ctx.fill()

        // Rayonnement de Hawking amélioré
        hawkingRadiation.forEach((radiation, index) => {
          radiation.x += radiation.vx
          radiation.y += radiation.vy
          radiation.life++

          const radiationOpacity = Math.max(0, 1 - radiation.life / radiation.maxLife)

          if (radiationOpacity > 0) {
            // Couleur basée sur la longueur d'onde
            let radiationColor
            if (radiation.wavelength < 1) {
              radiationColor = "255, 255, 255" // Rayons X/Gamma
            } else if (radiation.wavelength < 400) {
              radiationColor = "138, 43, 226" // UV
            } else if (radiation.wavelength < 500) {
              radiationColor = "75, 0, 130" // Violet
            } else {
              radiationColor = "255, 255, 255" // Visible
            }

            // Traînée du photon avec dispersion
            ctx.strokeStyle = `rgba(${radiationColor}, ${radiationOpacity * 0.9})`
            ctx.lineWidth = Math.max(0.5, radiation.size * 1.2)
            ctx.shadowColor = `rgba(${radiationColor}, 0.8)`
            ctx.shadowBlur = 12
            ctx.beginPath()
            ctx.moveTo(radiation.x - radiation.vx * 6, radiation.y - radiation.vy * 6)
            ctx.lineTo(radiation.x, radiation.y)
            ctx.stroke()

            // Photon principal
            ctx.fillStyle = `rgba(${radiationColor}, ${radiationOpacity})`
            ctx.beginPath()
            ctx.arc(radiation.x, radiation.y, Math.max(0.8, radiation.size), 0, Math.PI * 2)
            ctx.fill()
          }

          if (radiation.life >= radiation.maxLife) {
            hawkingRadiation.splice(index, 1)
          }
        })

        ctx.shadowBlur = 0

        // Créer plus de rayonnement avec intensité croissante
        if (time % (20 - Math.floor(instability * 15)) === 0 && hawkingRadiation.length < 120) {
          createHawkingRadiation()
        }

        // Halo d'instabilité quantique
        const instabilityRadius = Math.max(horizonRadius + 50, 60)
        const quantumGradient = ctx.createRadialGradient(
            centerX,
            centerY,
            Math.max(horizonRadius, 5),
            centerX,
            centerY,
            instabilityRadius,
        )
        quantumGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
        quantumGradient.addColorStop(0.3, `rgba(255, 0, 255, ${instability * 0.4})`)
        quantumGradient.addColorStop(0.7, `rgba(138, 43, 226, ${instability * 0.6})`)
        quantumGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = quantumGradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, instabilityRadius, 0, Math.PI * 2)
        ctx.fill()

        // Fluctuations quantiques du vide
        for (let i = 0; i < 20; i++) {
          const fluctAngle = Math.random() * Math.PI * 2
          const fluctRadius = horizonRadius + Math.random() * 30
          const fluctX = centerX + Math.cos(fluctAngle) * fluctRadius
          const fluctY = centerY + Math.sin(fluctAngle) * fluctRadius
          const fluctIntensity = Math.random() * instability * 0.8

          ctx.fillStyle = `rgba(255, 255, 255, ${fluctIntensity})`
          ctx.beginPath()
          ctx.arc(fluctX, fluctY, Math.random() * 2 + 0.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Phase 2: Explosion finale spectaculaire (240-320 frames / 1.33s)
      else if (time < 320) {
        if (phase === 1) {
          phase = 2
          createFinalExplosion()
          createGravitationalWaves()
        }

        const explosionProgress = (time - 240) / 80

        // Flash gamma initial multi-couches
        if (explosionProgress < 0.25) {
          const flashIntensity = (0.25 - explosionProgress) * 4

          // Flash principal
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, flashIntensity)})`
          ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

          // Flash secondaire coloré
          if (flashIntensity > 0.5) {
            ctx.fillStyle = `rgba(180, 0, 255, ${(flashIntensity - 0.5) * 0.6})`
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
          }
        }

        // Onde de choc sphérique multi-couches
        const shockRadius = Math.max(0, explosionProgress * Math.max(window.innerWidth, window.innerHeight) * 0.8)
        if (shockRadius > 0) {
          // Onde principale
          const shockGradient = ctx.createRadialGradient(
              centerX,
              centerY,
              Math.max(0, shockRadius * 0.85),
              centerX,
              centerY,
              shockRadius,
          )
          shockGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
          shockGradient.addColorStop(0.7, `rgba(180, 0, 255, ${(1 - explosionProgress) * 0.9})`)
          shockGradient.addColorStop(0.9, `rgba(75, 0, 130, ${(1 - explosionProgress) * 0.7})`)
          shockGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

          ctx.fillStyle = shockGradient
          ctx.beginPath()
          ctx.arc(centerX, centerY, shockRadius, 0, Math.PI * 2)
          ctx.fill()

          // Onde secondaire
          if (shockRadius > 50) {
            const secondaryGradient = ctx.createRadialGradient(
                centerX,
                centerY,
                Math.max(0, shockRadius * 0.6),
                centerX,
                centerY,
                shockRadius * 0.8,
            )
            secondaryGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
            secondaryGradient.addColorStop(0.8, `rgba(255, 0, 255, ${(1 - explosionProgress) * 0.5})`)
            secondaryGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

            ctx.fillStyle = secondaryGradient
            ctx.beginPath()
            ctx.arc(centerX, centerY, shockRadius * 0.8, 0, Math.PI * 2)
            ctx.fill()
          }
        }

        // Ondes gravitationnelles avec fréquences variables
        gravitationalWaves.forEach((wave, index) => {
          wave.radius += 10 + Math.sin(time * wave.frequency) * 2
          wave.intensity = Math.max(0, wave.intensity - 0.006)

          if (wave.radius < wave.maxRadius && wave.intensity > 0.1) {
            const waveAmplitude = Math.abs(Math.sin(time * 0.1 + index)) * 20 * wave.intensity
            const waveFrequency = Math.sin(time * wave.frequency * 10) * 5

            ctx.strokeStyle = `rgba(75, 0, 130, ${wave.intensity * 0.7})`
            ctx.lineWidth = Math.max(1, waveAmplitude * 0.3)
            ctx.setLineDash([15, 15])
            ctx.beginPath()
            ctx.arc(wave.x, wave.y, Math.max(0, wave.radius + waveAmplitude + waveFrequency), 0, Math.PI * 2)
            ctx.stroke()
            ctx.setLineDash([])
          } else if (wave.radius >= wave.maxRadius) {
            wave.radius = 0
            wave.intensity = 1
            wave.frequency = Math.random() * 0.1 + 0.05
          }
        })

        // Fragments d'explosion avec interactions
        explosionFragments.forEach((fragment, index) => {
          fragment.x += fragment.vx
          fragment.y += fragment.vy
          fragment.life++

          // Décélération progressive
          fragment.vx *= 0.998
          fragment.vy *= 0.998

          // Ajouter à la traînée
          fragment.trail.push({ x: fragment.x, y: fragment.y, opacity: 1 })
          if (fragment.trail.length > 15) {
            fragment.trail.shift()
          }

          const fragmentOpacity = Math.max(0, 1 - fragment.life / fragment.maxLife)

          if (fragmentOpacity > 0) {
            // Dessiner la traînée avec dégradé
            fragment.trail.forEach((point, trailIndex) => {
              const trailOpacity = (trailIndex / fragment.trail.length) * fragmentOpacity * 0.8
              const trailSize = Math.max(0.5, fragment.size * (trailIndex / fragment.trail.length) * 0.8)

              // Couleur spéciale pour l'antimatière
              let trailColor = fragment.color
              if (fragment.type === "antimatter") {
                trailColor = "#FF00FF"
              } else if (fragment.type === "photon") {
                trailColor = "#FFFFFF"
              }

              ctx.fillStyle = trailColor.replace(")", `, ${trailOpacity})`)
              ctx.beginPath()
              ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2)
              ctx.fill()
            })

            // Fragment principal avec effets spéciaux
            ctx.fillStyle = fragment.color.replace(")", `, ${fragmentOpacity})`)

            if (fragment.type === "photon" || fragment.energy > 5e15) {
              ctx.shadowColor = fragment.color
              ctx.shadowBlur = 20
            }

            if (fragment.type === "antimatter") {
              // Effet de scintillement pour l'antimatière
              const flicker = Math.abs(Math.sin(time * 0.3 + index)) * 0.5 + 0.5
              ctx.shadowColor = "#FF00FF"
              ctx.shadowBlur = 15 * flicker
            }

            ctx.beginPath()
            ctx.arc(fragment.x, fragment.y, Math.max(0.5, fragment.size), 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
          }

          if (fragment.life >= fragment.maxLife) {
            explosionFragments.splice(index, 1)
          }
        })

        // Rayons d'énergie multiples avec rotation
        const rayCount = 24
        for (let i = 0; i < rayCount; i++) {
          const rayAngle = (i * Math.PI * 2) / rayCount + time * 0.05
          const rayLength = Math.max(0, shockRadius * 0.95)
          const rayIntensity = (1 - explosionProgress) * 0.9 * Math.abs(Math.sin(time * 0.1 + i * 0.2))

          if (rayLength > 0 && rayIntensity > 0.1) {
            const rayGradient = ctx.createLinearGradient(
                centerX,
                centerY,
                centerX + Math.cos(rayAngle) * rayLength,
                centerY + Math.sin(rayAngle) * rayLength,
            )
            rayGradient.addColorStop(0, `rgba(255, 255, 255, ${rayIntensity})`)
            rayGradient.addColorStop(0.5, `rgba(180, 0, 255, ${rayIntensity * 0.8})`)
            rayGradient.addColorStop(1, `rgba(75, 0, 130, ${rayIntensity * 0.3})`)

            ctx.strokeStyle = rayGradient
            ctx.lineWidth = 4
            ctx.shadowColor = "rgba(180, 0, 255, 0.9)"
            ctx.shadowBlur = 25
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(centerX + Math.cos(rayAngle) * rayLength, centerY + Math.sin(rayAngle) * rayLength)
            ctx.stroke()
          }
        }
        ctx.shadowBlur = 0
      }

      // Phase 3: Transition cosmique vers le système solaire (320-360 frames / 0.67s)
      else {
        if (phase === 2) {
          phase = 3
        }

        const transitionProgress = Math.min(1, (time - 320) / 40)

        // Effet de distorsion spatiale avancé
        const distortionRadius = Math.max(50, 500 * (1 - transitionProgress * 0.7))
        ctx.save()
        ctx.globalAlpha = 1 - transitionProgress * 0.8

        // Vortex cosmique multi-couches
        for (let layer = 0; layer < 3; layer++) {
          const layerRadius = distortionRadius * (1 - layer * 0.2)
          const layerSpeed = 0.02 + layer * 0.01

          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2
            const spiralRadius = layerRadius * (1 - transitionProgress * 0.6)

            const gradient = ctx.createLinearGradient(
                centerX,
                centerY,
                centerX + Math.cos(angle + time * layerSpeed) * spiralRadius,
                centerY + Math.sin(angle + time * layerSpeed) * spiralRadius,
            )

            const baseOpacity = 0.6 - layer * 0.15
            gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
            gradient.addColorStop(0.3, `rgba(75, 0, 130, ${baseOpacity})`)
            gradient.addColorStop(0.7, `rgba(138, 43, 226, ${baseOpacity * 0.7})`)
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

            ctx.strokeStyle = gradient
            ctx.lineWidth = (20 - layer * 5) * (1 - transitionProgress)
            ctx.beginPath()

            // Spirale complexe
            for (let j = 0; j < 40; j++) {
              const spiralAngle = angle + j * 0.2 + time * layerSpeed
              const radius = (j * spiralRadius) / 40
              const x = centerX + Math.cos(spiralAngle) * radius
              const y = centerY + Math.sin(spiralAngle) * radius

              if (j === 0) {
                ctx.moveTo(x, y)
              } else {
                ctx.lineTo(x, y)
              }
            }

            ctx.stroke()
          }
        }

        // Formation stellaire - étoiles naissantes
        for (let i = 0; i < 80; i++) {
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * distortionRadius * 0.8
          const x = centerX + Math.cos(angle) * distance
          const y = centerY + Math.sin(angle) * distance
          const size = Math.random() * 3 + 1
          const brightness = Math.random() * 0.9 + 0.1
          const stellarType = Math.random()

          // Différents types d'étoiles naissantes
          let starColor
          if (stellarType < 0.3) {
            starColor = `rgba(255, 255, 255, ${brightness})` // Étoiles blanches
          } else if (stellarType < 0.6) {
            starColor = `rgba(255, 200, 100, ${brightness})` // Étoiles jaunes
          } else {
            starColor = `rgba(255, 100, 100, ${brightness})` // Étoiles rouges
          }

          ctx.fillStyle = starColor
          ctx.shadowColor = starColor
          ctx.shadowBlur = size * 3
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }

        // Nébuleuse résiduelle avec structure filamentaire
        const nebulaRadius = Math.max(100, 600 * (1 + transitionProgress * 0.3))
        for (let i = 0; i < 6; i++) {
          const filamentAngle = (i / 6) * Math.PI * 2
          const filamentGradient = ctx.createLinearGradient(
              centerX,
              centerY,
              centerX + Math.cos(filamentAngle) * nebulaRadius,
              centerY + Math.sin(filamentAngle) * nebulaRadius,
          )

          filamentGradient.addColorStop(0, `rgba(180, 100, 255, ${(1 - transitionProgress) * 0.4})`)
          filamentGradient.addColorStop(0.5, `rgba(100, 150, 255, ${(1 - transitionProgress) * 0.3})`)
          filamentGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.strokeStyle = filamentGradient
          ctx.lineWidth = 8 * (1 - transitionProgress)
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(centerX + Math.cos(filamentAngle) * nebulaRadius, centerY + Math.sin(filamentAngle) * nebulaRadius)
          ctx.stroke()
        }

        // Halo central qui pulse et s'estompe
        const centralPulse = Math.abs(Math.sin(time * 0.1)) * 0.5 + 0.5
        const centralGlow = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            150 * (1 - transitionProgress * 0.9),
        )
        centralGlow.addColorStop(0, `rgba(255, 255, 255, ${centralPulse * (1 - transitionProgress)})`)
        centralGlow.addColorStop(0.3, `rgba(180, 0, 255, ${centralPulse * 0.7 * (1 - transitionProgress)})`)
        centralGlow.addColorStop(0.7, `rgba(75, 0, 130, ${centralPulse * 0.4 * (1 - transitionProgress)})`)
        centralGlow.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = centralGlow
        ctx.beginPath()
        ctx.arc(centerX, centerY, 150, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowBlur = 0
        ctx.restore()
      }

      // Continuer l'animation ou passer au système solaire
      if (time < 360) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Transition vers le système solaire
        setShowSystem(true)
        setTimeout(() => {
          setShowBlackHole(false)
        }, 1000)
      }
    }

    animate()

    // Désactiver les comportements par défaut
    const preventDefaultBehavior = (e: Event) => {
      e.preventDefault()
    }

    document.addEventListener("contextmenu", preventDefaultBehavior)
    document.addEventListener("dragstart", preventDefaultBehavior)
    document.addEventListener("selectstart", preventDefaultBehavior)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      document.removeEventListener("contextmenu", preventDefaultBehavior)
      document.removeEventListener("dragstart", preventDefaultBehavior)
      document.removeEventListener("selectstart", preventDefaultBehavior)

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

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
