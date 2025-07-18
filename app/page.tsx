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
      // Fond de l'espace profond avec nébuleuse dynamique
      const spaceGradient = ctx.createRadialGradient(
          centerX + Math.sin(time * 0.01) * 20,
          centerY + Math.cos(time * 0.01) * 20,
          0,
          centerX,
          centerY,
          Math.max(window.innerWidth, window.innerHeight),
      )
      spaceGradient.addColorStop(0, "rgba(20, 15, 40, 1)")
      spaceGradient.addColorStop(0.3, "rgba(15, 10, 30, 1)")
      spaceGradient.addColorStop(0.7, "rgba(8, 5, 20, 1)")
      spaceGradient.addColorStop(1, "rgba(2, 2, 10, 1)")
      ctx.fillStyle = spaceGradient
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Appliquer la lentille gravitationnelle
      applyGravitationalLensing()

      // Dessiner les étoiles d'arrière-plan avec effet de scintillement amélioré
      backgroundStars.forEach((star) => {
        const twinkle = Math.abs(Math.sin(time * 0.02 + star.x * 0.001)) * 0.6 + 0.4
        const alpha = star.brightness * twinkle * 0.9

        if (star.distorted) {
          // Étoile déformée avec effet d'anneau d'Einstein
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.shadowColor = "rgba(100, 200, 255, 0.8)"
          ctx.shadowBlur = 12
          ctx.beginPath()
          ctx.arc(star.x, star.y, Math.max(1, Math.random() * 3), 0, Math.PI * 2)
          ctx.fill()

          // Anneau d'Einstein subtil
          ctx.strokeStyle = `rgba(100, 200, 255, ${alpha * 0.3})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(star.x, star.y, 8, 0, Math.PI * 2)
          ctx.stroke()
          ctx.shadowBlur = 0
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, Math.max(0.5, Math.random() * 1.8), 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Poussière cosmique avec mouvement brownien
      cosmicDust.forEach((dust, index) => {
        dust.x += dust.vx + (Math.random() - 0.5) * 0.1
        dust.y += dust.vy + (Math.random() - 0.5) * 0.1
        dust.life++

        // Interaction gravitationnelle avec effet de marée
        const dx = centerX - dust.x
        const dy = centerY - dust.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > schwarzschildRadius * 2) {
          const force = 0.002 / (distance * distance)
          dust.vx += (dx / distance) * force
          dust.vy += (dy / distance) * force
        }

        const dustOpacity = dust.opacity * Math.abs(Math.sin(dust.life * 0.015)) * 0.8
        ctx.fillStyle = `rgba(120, 100, 140, ${dustOpacity})`
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

      // Phase 0: Disque d'accrétion ultra-réaliste (0-90 frames / 1.5s)
      if (time < 90) {
        phase = 0

        // Dessiner l'horizon des événements avec distorsion quantique
        const horizonRadius = Math.max(8, schwarzschildRadius)
        const quantumFluctuation = Math.abs(Math.sin(time * 0.2)) * 3 + Math.abs(Math.cos(time * 0.15)) * 2

        // Ergosphère avec rotation de Kerr
        const ergosphereGradient = ctx.createRadialGradient(
            centerX + Math.sin(time * 0.05) * 2,
            centerY + Math.cos(time * 0.05) * 2,
            horizonRadius,
            centerX,
            centerY,
            horizonRadius * 2.2,
        )
        ergosphereGradient.addColorStop(0, "rgba(60, 0, 120, 0.8)")
        ergosphereGradient.addColorStop(0.5, "rgba(30, 0, 80, 0.6)")
        ergosphereGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = ergosphereGradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, horizonRadius * 2.2, 0, Math.PI * 2)
        ctx.fill()

        // Horizon des événements principal avec effet de frame-dragging
        const horizonGradient = ctx.createRadialGradient(
            centerX + Math.sin(time * 0.08) * 1,
            centerY + Math.cos(time * 0.08) * 1,
            0,
            centerX,
            centerY,
            Math.max(horizonRadius * 3, 20),
        )
        horizonGradient.addColorStop(0, "rgba(0, 0, 0, 1)")
        horizonGradient.addColorStop(0.4, "rgba(40, 0, 80, 0.98)")
        horizonGradient.addColorStop(0.7, "rgba(80, 0, 160, 0.8)")
        horizonGradient.addColorStop(0.9, "rgba(120, 0, 240, 0.4)")
        horizonGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = horizonGradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, horizonRadius + quantumFluctuation, 0, Math.PI * 2)
        ctx.fill()

        // Photon sphere avec précession
        const photonSphereRadius = horizonRadius * 1.5
        const precessionAngle = time * 0.03
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 + Math.abs(Math.sin(time * 0.08)) * 0.4})`
        ctx.lineWidth = 2
        ctx.setLineDash([8, 4])
        ctx.beginPath()
        ctx.arc(
            centerX + Math.cos(precessionAngle) * 2,
            centerY + Math.sin(precessionAngle) * 2,
            Math.max(photonSphereRadius, 10),
            0,
            Math.PI * 2,
        )
        ctx.stroke()
        ctx.setLineDash([])

        // Animer le disque d'accrétion avec turbulence magnétohydrodynamique
        accretionParticles.forEach((particle, index) => {
          if (particle.absorbed) return

          // Spirale avec instabilités magnétorotationnelles
          const timeDialation = Math.max(0.05, 1 - (schwarzschildRadius * 2.5) / particle.radius)
          const turbulence = Math.sin(time * 0.1 + particle.angle * 3) * 0.3
          particle.radius = Math.max(schwarzschildRadius + 2, particle.radius - (0.6 + turbulence) * timeDialation)
          particle.angle += (particle.angularVelocity + turbulence * 0.01) * timeDialation

          // Redshift gravitationnel avec effet Doppler
          particle.redshift = Math.max(0, 1 - particle.radius / particle.originalRadius)
          const dopplerShift = Math.abs(Math.sin(particle.angle)) * 0.2

          // Position avec oscillations magnétiques
          const magneticOscillation = Math.sin(time * 0.2 + particle.angle * 5) * 3
          particle.x = centerX + Math.cos(particle.angle) * particle.radius + magneticOscillation
          particle.y = centerY + Math.sin(particle.angle) * particle.radius + magneticOscillation * 0.5

          // Chauffage par reconnexion magnétique et friction visqueuse
          const magneticHeating = Math.abs(Math.sin(time * 0.15 + particle.angle * 2)) * 5000
          const viscousHeating = Math.max(0, (250 - particle.radius) * 4000)
          particle.temperature = Math.min(5e6, particle.temperature + magneticHeating + viscousHeating)
          particle.color = getTemperatureColor(particle.temperature, particle.redshift + dopplerShift)

          // Spaghettification progressive
          if (particle.radius < schwarzschildRadius * 2) {
            particle.size *= 1.03
            const stretchFactor = Math.max(1, (schwarzschildRadius * 2) / particle.radius)
            particle.size = Math.min(particle.size * stretchFactor, 8)
          }

          // Absorption avec émission de rayons X
          if (particle.radius <= schwarzschildRadius + 3) {
            particle.absorbed = true
            blackHoleMass += 0.2

            // Sursaut de rayons X lors de l'absorption
            for (let i = 0; i < 5; i++) {
              const rayAngle = Math.random() * Math.PI * 2
              const raySpeed = Math.random() * 12 + 8

              hawkingRadiation.push({
                x: particle.x,
                y: particle.y,
                vx: Math.cos(rayAngle) * raySpeed,
                vy: Math.sin(rayAngle) * raySpeed,
                size: Math.random() * 2 + 1,
                energy: particle.temperature * 2e10,
                life: 0,
                maxLife: 80,
                wavelength: 0.05, // Rayons X durs
              })
            }
            return
          }

          // Halo thermique avec structure coronale
          if (particle.temperature > 3e5) {
            const coronalRadius = Math.max(2, particle.size * 4)
            const coronalIntensity = Math.abs(Math.sin(time * 0.12 + particle.angle)) * 0.8 + 0.2

            const coronalGradient = ctx.createRadialGradient(
                particle.x,
                particle.y,
                0,
                particle.x,
                particle.y,
                coronalRadius,
            )

            const baseColor = particle.color.replace("#", "")
            const r = Number.parseInt(baseColor.substr(0, 2), 16)
            const g = Number.parseInt(baseColor.substr(2, 2), 16)
            const b = Number.parseInt(baseColor.substr(4, 2), 16)

            coronalGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${coronalIntensity})`)
            coronalGradient.addColorStop(
                0.4,
                `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 50)}, ${coronalIntensity * 0.7})`,
            )
            coronalGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

            ctx.fillStyle = coronalGradient
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, coronalRadius, 0, Math.PI * 2)
            ctx.fill()
          }

          // Particule principale avec pulsation thermique
          const thermalPulsation = Math.abs(Math.sin(time * 0.1 + particle.life * 0.05)) * 0.3 + 0.7
          ctx.fillStyle = particle.color
          if (particle.temperature > 8e5) {
            ctx.shadowColor = particle.color
            ctx.shadowBlur = 20 * (1 - particle.redshift * 0.4) * thermalPulsation
          }
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, Math.max(0.8, particle.size * thermalPulsation), 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0

          particle.life++
        })

        // Jets relativistes avec structure hélicoïdale
        if (time > 45) {
          for (let i = 0; i < 2; i++) {
            const jetDirection = i === 0 ? -1 : 1
            const jetLength = 280
            const jetWidth = 15
            const jetPulsation = Math.abs(Math.sin(time * 0.08)) * 0.4 + 0.6

            // Jet principal avec instabilités Kelvin-Helmholtz
            const jetGradient = ctx.createLinearGradient(centerX, centerY, centerX, centerY + jetDirection * jetLength)
            jetGradient.addColorStop(0, `rgba(0, 255, 255, ${jetPulsation})`)
            jetGradient.addColorStop(0.3, `rgba(100, 220, 255, ${jetPulsation * 0.9})`)
            jetGradient.addColorStop(0.7, `rgba(150, 180, 255, ${jetPulsation * 0.7})`)
            jetGradient.addColorStop(1, `rgba(50, 100, 200, ${jetPulsation * 0.4})`)

            ctx.strokeStyle = jetGradient
            ctx.lineWidth = jetWidth * jetPulsation
            ctx.shadowColor = "rgba(0, 255, 255, 0.9)"
            ctx.shadowBlur = 25
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(centerX, centerY + jetDirection * jetLength)
            ctx.stroke()

            // Instabilités du jet
            for (let k = 0; k < 8; k++) {
              const instabilityY = centerY + jetDirection * ((k * jetLength) / 8)
              const instabilityAmplitude = Math.sin(time * 0.15 + k) * 12
              const instabilityX = centerX + instabilityAmplitude

              ctx.strokeStyle = `rgba(255, 255, 255, ${jetPulsation * 0.6})`
              ctx.lineWidth = 3
              ctx.beginPath()
              ctx.moveTo(centerX, instabilityY)
              ctx.lineTo(instabilityX, instabilityY)
              ctx.stroke()
            }

            // Particules du jet avec mouvement hélicoïdal complexe
            for (let j = 0; j < 20; j++) {
              const jetProgress = j / 20
              const jetY = centerY + jetDirection * (jetProgress * jetLength)
              const helixRadius = Math.sin(jetProgress * Math.PI * 6 + time * 0.25) * 10
              const helixPhase = Math.cos(jetProgress * Math.PI * 4 + time * 0.2) * 5
              const jetX = centerX + helixRadius + helixPhase
              const jetOpacity = Math.abs(Math.sin(time * 0.12 + j * 0.4)) * 0.9 + 0.1

              ctx.fillStyle = `rgba(255, 255, 255, ${jetOpacity * (1 - jetProgress * 0.3) * jetPulsation})`
              ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
              ctx.shadowBlur = 15
              ctx.beginPath()
              ctx.arc(jetX, jetY, Math.max(1.5, Math.random() * 5), 0, Math.PI * 2)
              ctx.fill()
            }
          }
          ctx.shadowBlur = 0
        }
      }

      // Phase 1: Évaporation de Hawking critique (90-150 frames / 1s)
      else if (time < 150) {
        if (phase === 0) {
          phase = 1
          createHawkingRadiation()
        }

        // Évaporation accélérée avec instabilité critique
        const evaporationRate = 0.8 + (time - 90) * 0.02
        schwarzschildRadius = Math.max(5, 60 - (time - 90) * evaporationRate)

        // Horizon des événements ultra-instable
        const horizonRadius = Math.max(3, schwarzschildRadius)
        const instability = (time - 90) / 60
        const quantumFluctuation =
            Math.abs(Math.sin(time * 0.4)) * instability * 18 + Math.abs(Math.cos(time * 0.6)) * instability * 12

        // Fluctuations du vide quantique
        const vacuumGradient = ctx.createRadialGradient(
            centerX + Math.sin(time * 0.3) * 5,
            centerY + Math.cos(time * 0.3) * 5,
            0,
            centerX,
            centerY,
            Math.max(horizonRadius + quantumFluctuation + 35, 25),
        )
        vacuumGradient.addColorStop(0, "rgba(0, 0, 0, 1)")
        vacuumGradient.addColorStop(0.3, `rgba(200, 0, 255, ${0.95 + instability * 0.05})`)
        vacuumGradient.addColorStop(0.6, `rgba(150, 0, 200, ${0.8 + instability * 0.15})`)
        vacuumGradient.addColorStop(0.8, `rgba(100, 0, 150, ${0.6 + instability * 0.2})`)
        vacuumGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = vacuumGradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, Math.max(horizonRadius + quantumFluctuation, 8), 0, Math.PI * 2)
        ctx.fill()

        // Rayonnement de Hawking ultra-intense
        hawkingRadiation.forEach((radiation, index) => {
          radiation.x += radiation.vx
          radiation.y += radiation.vy
          radiation.life++

          const radiationOpacity = Math.max(0, 1 - radiation.life / radiation.maxLife)

          if (radiationOpacity > 0) {
            // Couleur spectrale avancée
            let radiationColor
            if (radiation.wavelength < 0.1) {
              radiationColor = "255, 255, 255" // Rayons gamma
            } else if (radiation.wavelength < 1) {
              radiationColor = "200, 150, 255" // Rayons X
            } else if (radiation.wavelength < 400) {
              radiationColor = "180, 100, 255" // UV extrême
            } else if (radiation.wavelength < 500) {
              radiationColor = "150, 50, 255" // Violet
            } else {
              radiationColor = "255, 255, 255" // Visible
            }

            // Traînée quantique avec interférence
            const interferencePattern = Math.sin(radiation.life * 0.3) * 0.3 + 0.7
            ctx.strokeStyle = `rgba(${radiationColor}, ${radiationOpacity * interferencePattern})`
            ctx.lineWidth = Math.max(1, radiation.size * 1.5)
            ctx.shadowColor = `rgba(${radiationColor}, 0.9)`
            ctx.shadowBlur = 18
            ctx.beginPath()
            ctx.moveTo(radiation.x - radiation.vx * 8, radiation.y - radiation.vy * 8)
            ctx.lineTo(radiation.x, radiation.y)
            ctx.stroke()

            // Photon avec effet de diffraction
            ctx.fillStyle = `rgba(${radiationColor}, ${radiationOpacity})`
            ctx.beginPath()
            ctx.arc(radiation.x, radiation.y, Math.max(1, radiation.size * interferencePattern), 0, Math.PI * 2)
            ctx.fill()
          }

          if (radiation.life >= radiation.maxLife) {
            hawkingRadiation.splice(index, 1)
          }
        })

        ctx.shadowBlur = 0

        // Production massive de rayonnement
        if (time % Math.max(8 - Math.floor(instability * 6), 2) === 0 && hawkingRadiation.length < 200) {
          createHawkingRadiation()
        }

        // Halo d'instabilité quantique multi-couches
        for (let layer = 0; layer < 3; layer++) {
          const layerRadius = Math.max(horizonRadius + 60 + layer * 20, 80)
          const layerIntensity = (1 - layer * 0.3) * instability

          const quantumGradient = ctx.createRadialGradient(
              centerX,
              centerY,
              Math.max(horizonRadius + layer * 10, 8),
              centerX,
              centerY,
              layerRadius,
          )
          quantumGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
          quantumGradient.addColorStop(0.2, `rgba(255, 100, 255, ${layerIntensity * 0.5})`)
          quantumGradient.addColorStop(0.6, `rgba(200, 50, 255, ${layerIntensity * 0.7})`)
          quantumGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = quantumGradient
          ctx.beginPath()
          ctx.arc(centerX, centerY, layerRadius, 0, Math.PI * 2)
          ctx.fill()
        }

        // Paires particule-antiparticule virtuelles
        for (let i = 0; i < 30; i++) {
          const pairAngle = Math.random() * Math.PI * 2
          const pairRadius = horizonRadius + Math.random() * 40
          const pairX = centerX + Math.cos(pairAngle) * pairRadius
          const pairY = centerY + Math.sin(pairAngle) * pairRadius
          const pairIntensity = Math.random() * instability * 0.9

          // Particule
          ctx.fillStyle = `rgba(255, 255, 255, ${pairIntensity})`
          ctx.beginPath()
          ctx.arc(pairX + 2, pairY, 1.5, 0, Math.PI * 2)
          ctx.fill()

          // Antiparticule
          ctx.fillStyle = `rgba(255, 0, 255, ${pairIntensity})`
          ctx.beginPath()
          ctx.arc(pairX - 2, pairY, 1.5, 0, Math.PI * 2)
          ctx.fill()

          // Ligne de connexion quantique
          ctx.strokeStyle = `rgba(255, 100, 255, ${pairIntensity * 0.5})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(pairX - 2, pairY)
          ctx.lineTo(pairX + 2, pairY)
          ctx.stroke()
        }
      }

      // Phase 2: Explosion finale ultra-spectaculaire (150-210 frames / 1s)
      else if (time < 210) {
        if (phase === 1) {
          phase = 2
          createFinalExplosion()
          createGravitationalWaves()
        }

        const explosionProgress = (time - 150) / 60

        // Flash gamma multi-spectral
        if (explosionProgress < 0.3) {
          const flashIntensity = (0.3 - explosionProgress) * 3.33

          // Flash principal gamma
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, flashIntensity)})`
          ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

          // Flash secondaire X
          if (flashIntensity > 0.7) {
            ctx.fillStyle = `rgba(200, 150, 255, ${(flashIntensity - 0.7) * 0.8})`
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
          }

          // Flash tertiaire UV
          if (flashIntensity > 0.4) {
            ctx.fillStyle = `rgba(150, 100, 255, ${(flashIntensity - 0.4) * 0.6})`
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
          }
        }

        // Onde de choc sphérique multi-fréquences
        const shockRadius = Math.max(0, explosionProgress * Math.max(window.innerWidth, window.innerHeight) * 0.9)
        if (shockRadius > 0) {
          // Onde principale avec compression adiabatique
          const compressionFactor = Math.abs(Math.sin(time * 0.2)) * 0.2 + 0.8
          const shockGradient = ctx.createRadialGradient(
              centerX,
              centerY,
              Math.max(0, shockRadius * 0.9 * compressionFactor),
              centerX,
              centerY,
              shockRadius,
          )
          shockGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
          shockGradient.addColorStop(0.6, `rgba(255, 100, 255, ${(1 - explosionProgress) * 0.95})`)
          shockGradient.addColorStop(0.85, `rgba(150, 50, 255, ${(1 - explosionProgress) * 0.8})`)
          shockGradient.addColorStop(0.95, `rgba(100, 0, 200, ${(1 - explosionProgress) * 0.6})`)
          shockGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

          ctx.fillStyle = shockGradient
          ctx.beginPath()
          ctx.arc(centerX, centerY, shockRadius, 0, Math.PI * 2)
          ctx.fill()

          // Onde secondaire avec effet Mach
          if (shockRadius > 80) {
            const machGradient = ctx.createRadialGradient(
                centerX,
                centerY,
                Math.max(0, shockRadius * 0.7),
                centerX,
                centerY,
                shockRadius * 0.85,
            )
            machGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
            machGradient.addColorStop(0.7, `rgba(255, 200, 255, ${(1 - explosionProgress) * 0.6})`)
            machGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

            ctx.fillStyle = machGradient
            ctx.beginPath()
            ctx.arc(centerX, centerY, shockRadius * 0.85, 0, Math.PI * 2)
            ctx.fill()
          }
        }

        // Ondes gravitationnelles avec chirp
        gravitationalWaves.forEach((wave, index) => {
          const chirpRate = 1 + explosionProgress * 2
          wave.radius += (12 + Math.sin(time * wave.frequency * chirpRate) * 3) * chirpRate
          wave.intensity = Math.max(0, wave.intensity - 0.008)

          if (wave.radius < wave.maxRadius && wave.intensity > 0.08) {
            const waveAmplitude = Math.abs(Math.sin(time * 0.12 + index)) * 25 * wave.intensity
            const chirpModulation = Math.sin(time * wave.frequency * chirpRate * 15) * 8

            ctx.strokeStyle = `rgba(100, 0, 200, ${wave.intensity * 0.8})`
            ctx.lineWidth = Math.max(1.5, waveAmplitude * 0.4)
            ctx.setLineDash([20, 10])
            ctx.beginPath()
            ctx.arc(wave.x, wave.y, Math.max(0, wave.radius + waveAmplitude + chirpModulation), 0, Math.PI * 2)
            ctx.stroke()
            ctx.setLineDash([])
          } else if (wave.radius >= wave.maxRadius) {
            wave.radius = 0
            wave.intensity = 1
            wave.frequency = Math.random() * 0.15 + 0.08
          }
        })

        // Fragments d'explosion avec annihilation
        explosionFragments.forEach((fragment, index) => {
          fragment.x += fragment.vx
          fragment.y += fragment.vy
          fragment.life++

          // Décélération avec résistance du milieu
          fragment.vx *= 0.997
          fragment.vy *= 0.997

          // Ajouter à la traînée avec effet de persistance rétinienne
          fragment.trail.push({ x: fragment.x, y: fragment.y, opacity: 1 })
          if (fragment.trail.length > 20) {
            fragment.trail.shift()
          }

          const fragmentOpacity = Math.max(0, 1 - fragment.life / fragment.maxLife)

          if (fragmentOpacity > 0) {
            // Dessiner la traînée avec effet de plasma
            fragment.trail.forEach((point, trailIndex) => {
              const trailOpacity = (trailIndex / fragment.trail.length) * fragmentOpacity * 0.9
              const trailSize = Math.max(0.8, fragment.size * (trailIndex / fragment.trail.length) * 0.9)

              let trailColor = fragment.color
              if (fragment.type === "antimatter") {
                trailColor = "#FF00FF"
                // Effet de scintillement pour l'antimatière
                const antimatterFlicker = Math.abs(Math.sin(time * 0.4 + index)) * 0.4 + 0.6
                ctx.shadowColor = "#FF00FF"
                ctx.shadowBlur = 12 * antimatterFlicker
              } else if (fragment.type === "photon") {
                trailColor = "#FFFFFF"
                ctx.shadowColor = "#FFFFFF"
                ctx.shadowBlur = 15
              }

              ctx.fillStyle = trailColor.replace(")", `, ${trailOpacity})`)
              ctx.beginPath()
              ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2)
              ctx.fill()
              ctx.shadowBlur = 0
            })

            // Fragment principal avec effets quantiques
            ctx.fillStyle = fragment.color.replace(")", `, ${fragmentOpacity})`)

            if (fragment.type === "photon" || fragment.energy > 8e15) {
              ctx.shadowColor = fragment.color
              ctx.shadowBlur = 25
            }

            if (fragment.type === "antimatter") {
              // Annihilation avec particules voisines
              const annihilationRadius = fragment.size * 3
              ctx.strokeStyle = `rgba(255, 0, 255, ${fragmentOpacity * 0.6})`
              ctx.lineWidth = 2
              ctx.beginPath()
              ctx.arc(fragment.x, fragment.y, annihilationRadius, 0, Math.PI * 2)
              ctx.stroke()
            }

            // Pulsation quantique
            const quantumPulsation = Math.abs(Math.sin(time * 0.2 + fragment.life * 0.1)) * 0.4 + 0.6
            ctx.beginPath()
            ctx.arc(fragment.x, fragment.y, Math.max(1, fragment.size * quantumPulsation), 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
          }

          if (fragment.life >= fragment.maxLife) {
            explosionFragments.splice(index, 1)
          }
        })

        // Rayons d'énergie avec polarisation
        const rayCount = 32
        for (let i = 0; i < rayCount; i++) {
          const rayAngle = (i * Math.PI * 2) / rayCount + time * 0.08
          const rayLength = Math.max(0, shockRadius * 0.98)
          const rayIntensity = (1 - explosionProgress) * 0.95 * Math.abs(Math.sin(time * 0.15 + i * 0.3))
          const polarization = Math.sin(i * 0.5) * 0.3 + 0.7

          if (rayLength > 0 && rayIntensity > 0.15) {
            const rayGradient = ctx.createLinearGradient(
                centerX,
                centerY,
                centerX + Math.cos(rayAngle) * rayLength,
                centerY + Math.sin(rayAngle) * rayLength,
            )
            rayGradient.addColorStop(0, `rgba(255, 255, 255, ${rayIntensity * polarization})`)
            rayGradient.addColorStop(0.3, `rgba(255, 150, 255, ${rayIntensity * 0.9 * polarization})`)
            rayGradient.addColorStop(0.7, `rgba(200, 100, 255, ${rayIntensity * 0.7 * polarization})`)
            rayGradient.addColorStop(1, `rgba(100, 50, 200, ${rayIntensity * 0.4 * polarization})`)

            ctx.strokeStyle = rayGradient
            ctx.lineWidth = 5 * polarization
            ctx.shadowColor = "rgba(255, 150, 255, 0.9)"
            ctx.shadowBlur = 30
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(centerX + Math.cos(rayAngle) * rayLength, centerY + Math.sin(rayAngle) * rayLength)
            ctx.stroke()
          }
        }
        ctx.shadowBlur = 0
      }

      // Phase 3: Transition cosmique accélérée (210-240 frames / 0.5s)
      else {
        if (phase === 2) {
          phase = 3
        }

        const transitionProgress = Math.min(1, (time - 210) / 30)

        // Effet de distorsion spatiale avec courbure
        const distortionRadius = Math.max(60, 600 * (1 - transitionProgress * 0.8))
        ctx.save()
        ctx.globalAlpha = 1 - transitionProgress * 0.9

        // Vortex cosmique avec métrique de Friedmann-Lemaître
        for (let layer = 0; layer < 4; layer++) {
          const layerRadius = distortionRadius * (1 - layer * 0.15)
          const layerSpeed = 0.03 + layer * 0.015
          const expansionRate = 1 + transitionProgress * 0.5

          for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * Math.PI * 2
            const spiralRadius = layerRadius * (1 - transitionProgress * 0.7) * expansionRate

            const gradient = ctx.createLinearGradient(
                centerX,
                centerY,
                centerX + Math.cos(angle + time * layerSpeed) * spiralRadius,
                centerY + Math.sin(angle + time * layerSpeed) * spiralRadius,
            )

            const baseOpacity = 0.7 - layer * 0.12
            gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
            gradient.addColorStop(0.2, `rgba(100, 50, 200, ${baseOpacity})`)
            gradient.addColorStop(0.5, `rgba(150, 100, 255, ${baseOpacity * 0.8})`)
            gradient.addColorStop(0.8, `rgba(200, 150, 255, ${baseOpacity * 0.6})`)
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

            ctx.strokeStyle = gradient
            ctx.lineWidth = (25 - layer * 4) * (1 - transitionProgress * 0.8)
            ctx.beginPath()

            // Spirale avec expansion cosmologique
            for (let j = 0; j < 50; j++) {
              const spiralAngle = angle + j * 0.15 + time * layerSpeed
              const radius = (j * spiralRadius * expansionRate) / 50
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

        // Formation stellaire primordiale
        for (let i = 0; i < 120; i++) {
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * distortionRadius * 0.9
          const x = centerX + Math.cos(angle) * distance
          const y = centerY + Math.sin(angle) * distance
          const size = Math.random() * 4 + 1.5
          const brightness = Math.random() * 0.95 + 0.05
          const stellarAge = Math.random()

          // Classification stellaire primordiale
          let starColor
          if (stellarAge < 0.2) {
            starColor = `rgba(100, 150, 255, ${brightness})` // Étoiles de Population III
          } else if (stellarAge < 0.5) {
            starColor = `rgba(255, 255, 255, ${brightness})` // Étoiles massives
          } else if (stellarAge < 0.8) {
            starColor = `rgba(255, 220, 150, ${brightness})` // Étoiles de séquence principale
          } else {
            starColor = `rgba(255, 150, 100, ${brightness})` // Géantes rouges
          }

          ctx.fillStyle = starColor
          ctx.shadowColor = starColor
          ctx.shadowBlur = size * 4
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }

        // Nébuleuse résiduelle avec structure fractale
        const nebulaRadius = Math.max(120, 700 * (1 + transitionProgress * 0.4))
        for (let i = 0; i < 8; i++) {
          const filamentAngle = (i / 8) * Math.PI * 2
          const filamentGradient = ctx.createLinearGradient(
              centerX,
              centerY,
              centerX + Math.cos(filamentAngle) * nebulaRadius,
              centerY + Math.sin(filamentAngle) * nebulaRadius,
          )

          filamentGradient.addColorStop(0, `rgba(200, 150, 255, ${(1 - transitionProgress) * 0.5})`)
          filamentGradient.addColorStop(0.3, `rgba(150, 200, 255, ${(1 - transitionProgress) * 0.4})`)
          filamentGradient.addColorStop(0.7, `rgba(100, 180, 255, ${(1 - transitionProgress) * 0.3})`)
          filamentGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.strokeStyle = filamentGradient
          ctx.lineWidth = 10 * (1 - transitionProgress)
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(centerX + Math.cos(filamentAngle) * nebulaRadius, centerY + Math.sin(filamentAngle) * nebulaRadius)
          ctx.stroke()

          // Sous-filaments fractals
          for (let k = 1; k < 4; k++) {
            const subAngle = filamentAngle + (k - 2) * 0.3
            const subRadius = nebulaRadius * 0.6
            ctx.lineWidth = 4 * (1 - transitionProgress)
            ctx.beginPath()
            ctx.moveTo(
                centerX + Math.cos(filamentAngle) * nebulaRadius * 0.3,
                centerY + Math.sin(filamentAngle) * nebulaRadius * 0.3,
            )
            ctx.lineTo(centerX + Math.cos(subAngle) * subRadius, centerY + Math.sin(subAngle) * subRadius)
            ctx.stroke()
          }
        }

        // Halo central avec rémanence quantique
        const centralPulse = Math.abs(Math.sin(time * 0.12)) * 0.6 + 0.4
        const centralGlow = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            180 * (1 - transitionProgress * 0.95),
        )
        centralGlow.addColorStop(0, `rgba(255, 255, 255, ${centralPulse * (1 - transitionProgress)})`)
        centralGlow.addColorStop(0.2, `rgba(255, 200, 255, ${centralPulse * 0.8 * (1 - transitionProgress)})`)
        centralGlow.addColorStop(0.5, `rgba(200, 150, 255, ${centralPulse * 0.6 * (1 - transitionProgress)})`)
        centralGlow.addColorStop(0.8, `rgba(150, 100, 255, ${centralPulse * 0.4 * (1 - transitionProgress)})`)
        centralGlow.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = centralGlow
        ctx.beginPath()
        ctx.arc(centerX, centerY, 180, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowBlur = 0
        ctx.restore()
      }

      // Continuer l'animation ou passer au système solaire
      if (time < 240) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Transition vers le système solaire
        setShowSystem(true)
        setTimeout(() => {
          setShowBlackHole(false)
        }, 800)
      }
    }

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
