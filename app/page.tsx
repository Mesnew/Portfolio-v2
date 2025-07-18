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

    // Particules quantiques avec spin et charge
    const quantumParticles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      type: "electron" | "positron" | "photon" | "neutrino" | "quark" | "gluon"
      energy: number
      spin: number
      charge: number
      mass: number
      lifetime: number
      age: number
      waveFunction: number
      entangled?: number
      color: string
      size: number
      phase: number
    }> = []

    // Champs électromagnétiques
    const emFields: Array<{
      x: number
      y: number
      strength: number
      frequency: number
      phase: number
      type: "electric" | "magnetic"
      radius: number
    }> = []

    // Ondulations de l'espace-temps
    const spacetimeRipples: Array<{
      x: number
      y: number
      amplitude: number
      frequency: number
      phase: number
      radius: number
      maxRadius: number
      speed: number
    }> = []

    // Matière noire
    const darkMatter: Array<{
      x: number
      y: number
      vx: number
      vy: number
      mass: number
      influence: number
      age: number
      opacity: number
    }> = []

    // Rayonnement cosmique de fond
    const cosmicBackground: Array<{
      x: number
      y: number
      temperature: number
      wavelength: number
      intensity: number
      age: number
    }> = []

    // Particules du disque d'accrétion améliorées
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
      magneticField: number
      plasmaDensity: number
      turbulence: number
    }> = []

    // Rayonnement de Hawking avancé
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
      polarization: number
      coherence: number
      entanglement: boolean
    }> = []

    // Fragments d'explosion avec interactions
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
      trail: Array<{ x: number; y: number; opacity: number; temperature: number }>
      type: "matter" | "antimatter" | "photon" | "darkmatter" | "neutrino"
      interactions: number
      decay: number
    }> = []

    // Ondes gravitationnelles multi-fréquences
    const gravitationalWaves: Array<{
      x: number
      y: number
      radius: number
      intensity: number
      maxRadius: number
      frequency: number
      harmonics: number[]
      polarization: "plus" | "cross"
      strain: number
    }> = []

    // Étoiles d'arrière-plan avec lentille gravitationnelle avancée
    const backgroundStars: Array<{
      x: number
      y: number
      brightness: number
      originalX: number
      originalY: number
      distorted: boolean
      lensedImages: Array<{ x: number; y: number; magnification: number }>
      spectralType: string
      distance: number
    }> = []

    // Poussière cosmique avec propriétés magnétiques
    const cosmicDust: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      life: number
      magnetic: boolean
      temperature: number
      composition: "silicate" | "carbon" | "ice" | "metal"
    }> = []

    // Variables physiques
    let time = 0
    let blackHoleMass = 100
    let schwarzschildRadius = 60
    let phase = 0
    let universeAge = 0
    const hubbleConstant = 0.1
    const cosmologicalConstant = 0.001
    let quantumFluctuationLevel = 0

    // Constantes physiques (simplifiées)
    const PLANCK_CONSTANT = 6.626e-34
    const SPEED_OF_LIGHT = 299792458
    const BOLTZMANN_CONSTANT = 1.381e-23
    const GRAVITATIONAL_CONSTANT = 6.674e-11

    // Créer les particules quantiques
    const createQuantumParticles = () => {
      const particleTypes = ["electron", "positron", "photon", "neutrino", "quark", "gluon"] as const

      for (let i = 0; i < 200; i++) {
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)]
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 100 + 50

        let mass, charge, color, size
        switch (type) {
          case "electron":
            mass = 9.109e-31
            charge = -1
            color = "#00FFFF"
            size = 1.5
            break
          case "positron":
            mass = 9.109e-31
            charge = 1
            color = "#FF00FF"
            size = 1.5
            break
          case "photon":
            mass = 0
            charge = 0
            color = "#FFFFFF"
            size = 1
            break
          case "neutrino":
            mass = 1e-36
            charge = 0
            color = "#CCCCCC"
            size = 0.5
            break
          case "quark":
            mass = 2e-30
            charge = Math.random() > 0.5 ? 2 / 3 : -1 / 3
            color = ["#FF0000", "#00FF00", "#0000FF"][Math.floor(Math.random() * 3)]
            size = 2
            break
          case "gluon":
            mass = 0
            charge = 0
            color = "#FFFF00"
            size = 1.2
            break
        }

        quantumParticles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          type: type,
          energy: Math.random() * 1e-15 + 1e-16,
          spin: Math.random() > 0.5 ? 0.5 : -0.5,
          charge: charge,
          mass: mass,
          lifetime: type === "photon" ? Number.POSITIVE_INFINITY : Math.random() * 1000 + 500,
          age: 0,
          waveFunction: Math.random() * Math.PI * 2,
          entangled: Math.random() > 0.8 ? Math.floor(Math.random() * 200) : undefined,
          color: color,
          size: size,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    // Créer les champs électromagnétiques
    const createEMFields = () => {
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 200 + 100

        emFields.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          strength: Math.random() * 1e6 + 1e5,
          frequency: Math.random() * 1e15 + 1e14,
          phase: Math.random() * Math.PI * 2,
          type: Math.random() > 0.5 ? "electric" : "magnetic",
          radius: Math.random() * 30 + 10,
        })
      }
    }

    // Créer la matière noire
    const createDarkMatter = () => {
      for (let i = 0; i < 300; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 500 + 200

        darkMatter.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          mass: Math.random() * 1e-25 + 1e-26,
          influence: Math.random() * 0.3 + 0.1,
          age: 0,
          opacity: Math.random() * 0.1 + 0.05,
        })
      }
    }

    // Créer le rayonnement cosmique de fond
    const createCosmicBackground = () => {
      for (let i = 0; i < 1000; i++) {
        cosmicBackground.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          temperature: 2.725 + (Math.random() - 0.5) * 0.0001, // CMB avec fluctuations
          wavelength: 1.9e-3, // pic du CMB
          intensity: Math.random() * 0.1 + 0.05,
          age: 0,
        })
      }
    }

    // Initialiser les étoiles d'arrière-plan avec lentille gravitationnelle avancée
    const initBackgroundStars = () => {
      const spectralTypes = ["O", "B", "A", "F", "G", "K", "M"]

      for (let i = 0; i < 200; i++) {
        const spectralType = spectralTypes[Math.floor(Math.random() * spectralTypes.length)]

        backgroundStars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          brightness: Math.random() * 0.8 + 0.2,
          originalX: Math.random() * window.innerWidth,
          originalY: Math.random() * window.innerHeight,
          distorted: false,
          lensedImages: [],
          spectralType: spectralType,
          distance: Math.random() * 1000 + 100,
        })
      }
    }

    // Créer le disque d'accrétion avec propriétés magnétiques
    const createAccretionDisk = () => {
      for (let i = 0; i < 300; i++) {
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
          magneticField: Math.random() * 1e4 + 1e3,
          plasmaDensity: Math.random() * 1e15 + 1e14,
          turbulence: Math.random() * 0.5 + 0.1,
        })
      }
    }

    // Couleur basée sur la température avec redshift et effets Doppler
    const getTemperatureColor = (temp: number, redshift = 0, dopplerShift = 0): string => {
      const effectiveTemp = temp * (1 - redshift * 0.3) * (1 + dopplerShift * 0.1)

      if (effectiveTemp > 2e6) return "#FFFFFF"
      if (effectiveTemp > 1e6) return "#E6E6FA"
      if (effectiveTemp > 5e5) return "#87CEEB"
      if (effectiveTemp > 2e5) return "#FFD700"
      if (effectiveTemp > 1e5) return "#FFA500"
      if (effectiveTemp > 5e4) return "#FF6347"
      if (effectiveTemp > 3e4) return "#FF4500"
      return redshift > 0.5 ? "#4B0000" : "#8B0000"
    }

    // Créer le rayonnement de Hawking avec intrication quantique
    const createHawkingRadiation = () => {
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 6 + 4
        const wavelength = Math.random() * 700 + 400

        hawkingRadiation.push({
          x: centerX + Math.cos(angle) * (schwarzschildRadius + 5),
          y: centerY + Math.sin(angle) * (schwarzschildRadius + 5),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1,
          energy: Math.random() * 1e15 + 1e14,
          life: 0,
          maxLife: Math.random() * 300 + 200,
          wavelength: wavelength,
          polarization: Math.random() * Math.PI,
          coherence: Math.random(),
          entanglement: Math.random() > 0.7,
        })
      }
    }

    // Créer l'explosion finale avec nucléosynthèse
    const createFinalExplosion = () => {
      const nuclei = ["hydrogen", "helium", "lithium", "beryllium", "boron", "carbon"]

      for (let i = 0; i < 800; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 18 + 10
        const energy = Math.random() * 1e17 + 1e16

        let color, type: "matter" | "antimatter" | "photon" | "darkmatter" | "neutrino"

        if (Math.random() < 0.15) {
          // Matière noire
          color = "#4B0082"
          type = "darkmatter"
        } else if (Math.random() < 0.25) {
          // Neutrinos
          color = "#C0C0C0"
          type = "neutrino"
        } else if (Math.random() < 0.35) {
          // Photons gamma
          color = "#FFFFFF"
          type = "photon"
        } else if (Math.random() < 0.45) {
          // Antimatière
          color = "#FF00FF"
          type = "antimatter"
        } else {
          // Matière normale avec nucléosynthèse
          if (energy > 1e17) {
            color = "#FFFFFF" // Noyaux lourds
          } else if (energy > 8e16) {
            color = "#FFE4B5" // Carbone
          } else if (energy > 5e16) {
            color = "#98FB98" // Lithium
          } else if (energy > 3e16) {
            color = "#FFFF00" // Hélium
          } else {
            color = "#FF69B4" // Hydrogène
          }
          type = "matter"
        }

        explosionFragments.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 8 + 2,
          color: color,
          energy: energy,
          life: 0,
          maxLife: Math.random() * 400 + 250,
          trail: [],
          type: type,
          interactions: 0,
          decay: Math.random() * 0.01 + 0.001,
        })
      }
    }

    // Créer les ondes gravitationnelles avec harmoniques
    const createGravitationalWaves = () => {
      for (let i = 0; i < 12; i++) {
        const harmonics = []
        for (let h = 1; h <= 5; h++) {
          harmonics.push(Math.random() * 0.1 + 0.05)
        }

        gravitationalWaves.push({
          x: centerX,
          y: centerY,
          radius: 0,
          intensity: 1,
          maxRadius: Math.max(window.innerWidth, window.innerHeight) * 1.5,
          frequency: Math.random() * 0.15 + 0.05,
          harmonics: harmonics,
          polarization: Math.random() > 0.5 ? "plus" : "cross",
          strain: Math.random() * 1e-21 + 1e-22,
        })
      }
    }

    // Créer la poussière cosmique avec composition
    const createCosmicDust = () => {
      const compositions = ["silicate", "carbon", "ice", "metal"] as const

      for (let i = 0; i < 150; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 400 + 200
        const composition = compositions[Math.floor(Math.random() * compositions.length)]

        cosmicDust.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          life: 0,
          magnetic: Math.random() > 0.7,
          temperature: Math.random() * 100 + 10,
          composition: composition,
        })
      }
    }

    // Créer les ondulations de l'espace-temps
    const createSpacetimeRipples = () => {
      for (let i = 0; i < 20; i++) {
        spacetimeRipples.push({
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 200,
          amplitude: Math.random() * 50 + 20,
          frequency: Math.random() * 0.1 + 0.05,
          phase: Math.random() * Math.PI * 2,
          radius: 0,
          maxRadius: Math.random() * 300 + 200,
          speed: Math.random() * 3 + 2,
        })
      }
    }

    // Effet de lentille gravitationnelle avancé avec images multiples
    const applyAdvancedGravitationalLensing = () => {
      backgroundStars.forEach((star) => {
        const dx = star.originalX - centerX
        const dy = star.originalY - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        star.lensedImages = []

        if (distance < schwarzschildRadius * 4 && schwarzschildRadius > 15) {
          const einsteinRadius = Math.sqrt(
              (4 * GRAVITATIONAL_CONSTANT * blackHoleMass * star.distance) / (SPEED_OF_LIGHT * SPEED_OF_LIGHT),
          )
          const lensStrength = (schwarzschildRadius * 3) / distance

          // Image principale déformée
          const deflectionAngle = lensStrength * 0.15
          star.x = centerX + dx * (1 + deflectionAngle)
          star.y = centerY + dy * (1 + deflectionAngle)
          star.distorted = true
          star.brightness = Math.min(1.5, star.brightness * (1 + lensStrength * 0.8))

          // Images secondaires (anneau d'Einstein partiel)
          if (lensStrength > 0.5) {
            for (let i = 0; i < 3; i++) {
              const imageAngle = Math.atan2(dy, dx) + (i - 1) * 0.3
              const imageDistance = distance * (1 + lensStrength * 0.3)

              star.lensedImages.push({
                x: centerX + Math.cos(imageAngle) * imageDistance,
                y: centerY + Math.sin(imageAngle) * imageDistance,
                magnification: lensStrength * 0.5 + 0.3,
              })
            }
          }
        } else {
          star.x = star.originalX
          star.y = star.originalY
          star.distorted = false
        }
      })
    }

    // Interactions entre particules quantiques
    const updateQuantumInteractions = () => {
      for (let i = 0; i < quantumParticles.length; i++) {
        const particle = quantumParticles[i]
        particle.age++
        particle.waveFunction += 0.1
        particle.phase += particle.energy * 1e12

        // Décroissance des particules instables
        if (particle.age > particle.lifetime && particle.type !== "photon") {
          // Créer des produits de décroissance
          if (particle.type === "quark") {
            // Hadronisation simplifiée
            for (let j = 0; j < 2; j++) {
              quantumParticles.push({
                x: particle.x,
                y: particle.y,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                type: "gluon",
                energy: particle.energy * 0.5,
                spin: 1,
                charge: 0,
                mass: 0,
                lifetime: 100,
                age: 0,
                waveFunction: Math.random() * Math.PI * 2,
                color: "#FFFF00",
                size: 1.2,
                phase: Math.random() * Math.PI * 2,
              })
            }
          }
          quantumParticles.splice(i, 1)
          i--
          continue
        }

        // Mouvement quantique avec incertitude
        const uncertainty = Math.sqrt(PLANCK_CONSTANT / (2 * particle.mass * particle.energy)) * 1e20
        particle.x += particle.vx + (Math.random() - 0.5) * uncertainty
        particle.y += particle.vy + (Math.random() - 0.5) * uncertainty

        // Interactions électromagnétiques
        for (let j = i + 1; j < quantumParticles.length; j++) {
          const other = quantumParticles[j]
          const dx = other.x - particle.x
          const dy = other.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 20 && particle.charge !== 0 && other.charge !== 0) {
            const force = ((particle.charge * other.charge) / (distance * distance)) * 0.1
            const fx = (dx / distance) * force
            const fy = (dy / distance) * force

            particle.vx -= (fx / particle.mass) * 1e20
            particle.vy -= (fy / particle.mass) * 1e20
            other.vx += (fx / other.mass) * 1e20
            other.vy += (fy / other.mass) * 1e20
          }

          // Annihilation particule-antiparticule
          if (
              (particle.type === "electron" && other.type === "positron") ||
              (particle.type === "positron" && other.type === "electron")
          ) {
            if (distance < 5) {
              // Créer des photons gamma
              for (let k = 0; k < 2; k++) {
                const angle = Math.random() * Math.PI * 2
                quantumParticles.push({
                  x: (particle.x + other.x) / 2,
                  y: (particle.y + other.y) / 2,
                  vx: Math.cos(angle) * 5,
                  vy: Math.sin(angle) * 5,
                  type: "photon",
                  energy: (particle.energy + other.energy) / 2,
                  spin: 1,
                  charge: 0,
                  mass: 0,
                  lifetime: Number.POSITIVE_INFINITY,
                  age: 0,
                  waveFunction: Math.random() * Math.PI * 2,
                  color: "#FFFFFF",
                  size: 1.5,
                  phase: Math.random() * Math.PI * 2,
                })
              }
              quantumParticles.splice(Math.max(i, j), 1)
              quantumParticles.splice(Math.min(i, j), 1)
              i -= 2
              break
            }
          }
        }
      }
    }

    // Initialisation
    initBackgroundStars()
    createAccretionDisk()
    createCosmicDust()
    createQuantumParticles()
    createEMFields()
    createDarkMatter()
    createCosmicBackground()
    createSpacetimeRipples()

    const animate = () => {
      // Ensure canvas dimensions are valid
      const canvasWidth = Math.max(100, window.innerWidth)
      const canvasHeight = Math.max(100, window.innerHeight)
      const maxDimension = Math.max(canvasWidth, canvasHeight)

      // Ensure center coordinates are valid
      const safeCenterX = Math.max(50, Math.min(centerX, canvasWidth - 50))
      const safeCenterY = Math.max(50, Math.min(centerY, canvasHeight - 50))

      // Fond de l'espace profond avec rayonnement cosmique de fond
      const spaceGradient = ctx.createRadialGradient(
          safeCenterX,
          safeCenterY,
          0,
          safeCenterX,
          safeCenterY,
          Math.max(100, maxDimension),
      )
      spaceGradient.addColorStop(0, "rgba(20, 15, 35, 1)")
      spaceGradient.addColorStop(0.3, "rgba(15, 10, 25, 1)")
      spaceGradient.addColorStop(0.7, "rgba(8, 8, 20, 1)")
      spaceGradient.addColorStop(1, "rgba(2, 2, 8, 1)")
      ctx.fillStyle = spaceGradient
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      // Rayonnement cosmique de fond avec fluctuations
      cosmicBackground.forEach((cmb) => {
        cmb.age++
        const fluctuation = Math.sin(cmb.age * 0.01 + cmb.x * 0.001 + cmb.y * 0.001) * 0.00005
        const intensity = Math.max(0, Math.min(1, (cmb.intensity + fluctuation) * 0.3))

        if (intensity > 0) {
          ctx.fillStyle = `rgba(50, 30, 80, ${intensity})`
          ctx.beginPath()
          ctx.arc(cmb.x, cmb.y, 0.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Matière noire avec interactions gravitationnelles faibles
      darkMatter.forEach((dm) => {
        dm.age++
        dm.x += dm.vx
        dm.y += dm.vy

        // Interaction gravitationnelle avec le trou noir
        const dx = safeCenterX - dm.x
        const dy = safeCenterY - dm.y
        const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy))

        if (distance > Math.max(10, schwarzschildRadius * 3)) {
          const force = Math.max(0, Math.min(0.1, ((blackHoleMass * dm.mass) / (distance * distance)) * 1e-10))
          dm.vx += (dx / distance) * force
          dm.vy += (dy / distance) * force
        }

        // Visualisation de la matière noire
        const dmOpacity = Math.max(0, Math.min(1, dm.opacity * Math.abs(Math.sin(dm.age * 0.005))))
        ctx.fillStyle = `rgba(75, 0, 130, ${dmOpacity})`
        ctx.beginPath()
        ctx.arc(dm.x, dm.y, 1, 0, Math.PI * 2)
        ctx.fill()

        // Halo de matière noire
        if (Math.random() < 0.01) {
          const haloGradient = ctx.createRadialGradient(dm.x, dm.y, 0, dm.x, dm.y, 20)
          haloGradient.addColorStop(0, `rgba(75, 0, 130, ${dmOpacity * 0.3})`)
          haloGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = haloGradient
          ctx.beginPath()
          ctx.arc(dm.x, dm.y, 20, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Ondulations de l'espace-temps
      spacetimeRipples.forEach((ripple) => {
        ripple.radius += ripple.speed
        ripple.phase += ripple.frequency

        if (ripple.radius < ripple.maxRadius) {
          const waveAmplitude = ripple.amplitude * Math.sin(ripple.phase) * (1 - ripple.radius / ripple.maxRadius)
          const finalRadius = Math.max(1, Math.min(1000, ripple.radius + waveAmplitude))

          ctx.strokeStyle = `rgba(100, 50, 150, ${Math.max(0, 0.3 * (1 - ripple.radius / ripple.maxRadius))})`
          ctx.lineWidth = Math.max(1, Math.abs(waveAmplitude) * 0.1 + 1)
          ctx.setLineDash([10, 10])
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, finalRadius, 0, Math.PI * 2)
          ctx.stroke()
          ctx.setLineDash([])
        } else {
          ripple.radius = 0
          ripple.x = safeCenterX + (Math.random() - 0.5) * 200
          ripple.y = safeCenterY + (Math.random() - 0.5) * 200
        }
      })

      // Appliquer la lentille gravitationnelle avancée
      applyAdvancedGravitationalLensing()

      // Dessiner les étoiles d'arrière-plan avec images multiples
      backgroundStars.forEach((star) => {
        const twinkle = Math.abs(Math.sin(time * 0.03 + star.x * 0.001)) * 0.5 + 0.5
        const alpha = Math.max(0, Math.min(1, star.brightness * twinkle * 0.9))

        // Couleur basée sur le type spectral
        let starColor = "255, 255, 255"
        switch (star.spectralType) {
          case "O":
            starColor = "155, 176, 255"
            break
          case "B":
            starColor = "170, 191, 255"
            break
          case "A":
            starColor = "202, 215, 255"
            break
          case "F":
            starColor = "248, 247, 255"
            break
          case "G":
            starColor = "255, 244, 234"
            break
          case "K":
            starColor = "255, 210, 161"
            break
          case "M":
            starColor = "255, 204, 111"
            break
        }

        if (star.distorted) {
          // Étoile principale déformée
          ctx.fillStyle = `rgba(${starColor}, ${alpha})`
          ctx.shadowColor = `rgba(${starColor}, 0.8)`
          ctx.shadowBlur = 12
          ctx.beginPath()
          ctx.arc(star.x, star.y, Math.max(1.5, Math.random() * 3), 0, Math.PI * 2)
          ctx.fill()

          // Images secondaires (lentille gravitationnelle)
          star.lensedImages.forEach((image) => {
            const imageAlpha = Math.max(0, Math.min(1, alpha * image.magnification))
            const imageRadius = Math.max(1, Math.min(10, image.magnification * 2))

            ctx.fillStyle = `rgba(${starColor}, ${imageAlpha})`
            ctx.shadowBlur = Math.max(1, Math.min(20, 8 * image.magnification))
            ctx.beginPath()
            ctx.arc(image.x, image.y, imageRadius, 0, Math.PI * 2)
            ctx.fill()
          })

          ctx.shadowBlur = 0
        } else {
          ctx.fillStyle = `rgba(${starColor}, ${alpha})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, Math.max(0.8, Math.min(5, Math.random() * 1.8)), 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Champs électromagnétiques
      emFields.forEach((field) => {
        field.phase += field.frequency * 1e-12

        const fieldIntensity = Math.max(0, Math.min(1, Math.abs(Math.sin(field.phase)) * 0.4))
        const fieldColor = field.type === "electric" ? "0, 255, 255" : "255, 100, 0"

        // Lignes de champ
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2
          const lineLength = Math.max(1, Math.min(100, field.radius * (0.5 + fieldIntensity)))

          ctx.strokeStyle = `rgba(${fieldColor}, ${fieldIntensity * 0.6})`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(field.x, field.y)
          ctx.lineTo(field.x + Math.cos(angle) * lineLength, field.y + Math.sin(angle) * lineLength)
          ctx.stroke()
        }

        // Noyau du champ
        ctx.fillStyle = `rgba(${fieldColor}, ${fieldIntensity})`
        ctx.beginPath()
        ctx.arc(field.x, field.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Particules quantiques avec effets d'onde
      updateQuantumInteractions()
      quantumParticles.forEach((particle) => {
        // Fonction d'onde visualisée
        const waveRadius = Math.max(2, Math.min(20, Math.abs(Math.sin(particle.waveFunction)) * 8 + 2))
        const waveOpacity = Math.max(0, Math.min(1, Math.abs(Math.cos(particle.phase)) * 0.3 + 0.1))

        // Halo quantique
        const quantumGradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, waveRadius)
        const baseColor = particle.color.replace("#", "")
        const r = Number.parseInt(baseColor.substr(0, 2), 16)
        const g = Number.parseInt(baseColor.substr(2, 2), 16)
        const b = Number.parseInt(baseColor.substr(4, 2), 16)

        quantumGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${waveOpacity})`)
        quantumGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = quantumGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, waveRadius, 0, Math.PI * 2)
        ctx.fill()

        // Particule centrale
        ctx.fillStyle = particle.color
        if (particle.type === "photon") {
          ctx.shadowColor = particle.color
          ctx.shadowBlur = 8
        }
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, Math.max(0.5, Math.min(5, particle.size)), 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Intrication quantique (lignes entre particules intriquées)
        if (particle.entangled !== undefined && particle.entangled < quantumParticles.length) {
          const entangled = quantumParticles[particle.entangled]
          if (entangled) {
            ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`
            ctx.lineWidth = 1
            ctx.setLineDash([5, 5])
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(entangled.x, entangled.y)
            ctx.stroke()
            ctx.setLineDash([])
          }
        }
      })

      time += 1
      universeAge += 0.1
      quantumFluctuationLevel = Math.abs(Math.sin(time * 0.05)) * 0.5 + 0.3

      // Ensure schwarzschildRadius is always valid
      schwarzschildRadius = Math.max(5, Math.min(200, schwarzschildRadius))
      blackHoleMass = Math.max(10, Math.min(1000, blackHoleMass))

      // Phase 0: Disque d'accrétion avec effets magnétiques avancés (0-150 frames)
      if (time < 150) {
        phase = 0

        // Horizon des événements avec fluctuations quantiques
        const horizonRadius = Math.max(5, Math.min(100, schwarzschildRadius))
        const quantumFluctuation = Math.max(
            0,
            Math.min(10, Math.abs(Math.sin(time * 0.4)) * quantumFluctuationLevel * 8),
        )

        // Ergosphère avec rotation de Kerr
        const ergosphereRadius = Math.max(10, Math.min(200, horizonRadius * 2.2))
        const ergosphereGradient = ctx.createRadialGradient(
            safeCenterX,
            safeCenterY,
            Math.max(1, horizonRadius),
            safeCenterX,
            safeCenterY,
            Math.max(horizonRadius + 1, ergosphereRadius),
        )
        ergosphereGradient.addColorStop(0, "rgba(60, 0, 120, 0.8)")
        ergosphereGradient.addColorStop(0.5, "rgba(40, 0, 80, 0.6)")
        ergosphereGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = ergosphereGradient
        ctx.beginPath()
        ctx.arc(safeCenterX, safeCenterY, ergosphereRadius, 0, Math.PI * 2)
        ctx.fill()

        // Horizon des événements principal avec distorsion
        const horizonGradientRadius = Math.max(20, Math.min(300, horizonRadius * 3))
        const horizonGradient = ctx.createRadialGradient(
            safeCenterX,
            safeCenterY,
            0,
            safeCenterX,
            safeCenterY,
            horizonGradientRadius,
        )
        horizonGradient.addColorStop(0, "rgba(0, 0, 0, 1)")
        horizonGradient.addColorStop(0.4, "rgba(50, 0, 100, 0.98)")
        horizonGradient.addColorStop(0.7, "rgba(80, 0, 160, 0.8)")
        horizonGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = horizonGradient
        ctx.beginPath()
        ctx.arc(safeCenterX, safeCenterY, Math.max(5, horizonRadius + quantumFluctuation), 0, Math.PI * 2)
        ctx.fill()

        // Photon sphere avec pulsation quantique
        const photonSphereRadius = Math.max(10, Math.min(150, horizonRadius * 1.5))
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0.1, 0.5 + Math.abs(Math.sin(time * 0.08)) * 0.4)})`
        ctx.lineWidth = 3
        ctx.setLineDash([8, 8])
        ctx.beginPath()
        ctx.arc(safeCenterX, safeCenterY, photonSphereRadius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])

        // Disque d'accrétion avec champs magnétiques
        accretionParticles.forEach((particle, index) => {
          if (particle.absorbed) return

          // Spirale avec effets relativistes et magnétiques
          const timeDialation = Math.max(0.05, Math.min(1, 1 - (schwarzschildRadius * 2.5) / particle.radius))
          const magneticAcceleration = Math.max(0, Math.min(1, particle.magneticField * 1e-8))

          particle.radius = Math.max(
              schwarzschildRadius + 1,
              particle.radius - (0.5 + magneticAcceleration) * timeDialation,
          )
          particle.angle += particle.angularVelocity * timeDialation * (1 + particle.turbulence)

          // Redshift gravitationnel et Doppler
          particle.redshift = Math.max(0, Math.min(1, 1 - particle.radius / particle.originalRadius))
          const dopplerShift = Math.max(
              0,
              Math.min(0.1, ((particle.angularVelocity * particle.radius) / SPEED_OF_LIGHT) * 1e6),
          )

          // Position mise à jour
          particle.x = safeCenterX + Math.cos(particle.angle) * particle.radius
          particle.y = safeCenterY + Math.sin(particle.angle) * particle.radius

          // Chauffage par friction magnétique et marée
          const tidalHeating = Math.max(0, Math.min(50000, (250 - particle.radius) * 4000))
          const magneticHeating = Math.max(0, Math.min(10000, particle.magneticField * particle.plasmaDensity * 1e-10))
          particle.temperature = Math.min(5e6, particle.temperature + tidalHeating + magneticHeating)
          particle.color = getTemperatureColor(particle.temperature, particle.redshift, dopplerShift)

          // Spaghettification et instabilités MHD
          if (particle.radius < schwarzschildRadius * 1.8) {
            particle.size *= 1.03
            particle.turbulence += 0.01
          }

          // Absorption avec émission de rayons X
          if (particle.radius <= schwarzschildRadius + 3) {
            particle.absorbed = true
            blackHoleMass += 0.2

            // Émission de rayons X et gamma
            for (let i = 0; i < 4; i++) {
              const rayAngle = Math.random() * Math.PI * 2
              const raySpeed = Math.max(1, Math.min(15, Math.random() * 10 + 6))

              hawkingRadiation.push({
                x: particle.x,
                y: particle.y,
                vx: Math.cos(rayAngle) * raySpeed,
                vy: Math.sin(rayAngle) * raySpeed,
                size: Math.max(0.5, Math.min(5, Math.random() * 2 + 0.8)),
                energy: Math.max(1e10, Math.min(1e18, particle.temperature * 1e11)),
                life: 0,
                maxLife: 120,
                wavelength: Math.max(0.001, Math.min(1, Math.random() * 0.1 + 0.01)),
                polarization: Math.random() * Math.PI,
                coherence: Math.max(0.1, Math.min(1, Math.random() * 0.8 + 0.2)),
                entanglement: Math.random() > 0.6,
              })
            }
            return
          }

          // Lignes de champ magnétique
          if (particle.magneticField > 5e3 && Math.random() < 0.1) {
            const fieldLines = 6
            for (let i = 0; i < fieldLines; i++) {
              const fieldAngle = particle.angle + (i / fieldLines) * Math.PI * 2
              const fieldLength = Math.max(1, Math.min(50, particle.magneticField * 1e-2))

              ctx.strokeStyle = `rgba(0, 255, 255, 0.4)`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(
                  particle.x + Math.cos(fieldAngle) * fieldLength,
                  particle.y + Math.sin(fieldAngle) * fieldLength,
              )
              ctx.stroke()
            }
          }

          // Halo thermique avec synchrotron
          if (particle.temperature > 8e5) {
            const thermalRadius = Math.max(2, Math.min(20, particle.size * 4))
            const synchrotronIntensity = Math.max(0, Math.min(1, particle.magneticField * particle.temperature * 1e-12))

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

            thermalGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${Math.min(1, 0.9 + synchrotronIntensity)})`)
            thermalGradient.addColorStop(
                0.4,
                `rgba(${r}, ${g}, ${b}, ${Math.min(1, 0.6 + synchrotronIntensity * 0.5)})`,
            )
            thermalGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

            ctx.fillStyle = thermalGradient
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, thermalRadius, 0, Math.PI * 2)
            ctx.fill()
          }

          // Particule principale avec effets relativistes
          ctx.fillStyle = particle.color
          if (particle.temperature > 2e6) {
            ctx.shadowColor = particle.color
            ctx.shadowBlur = Math.max(1, Math.min(30, 20 * (1 - particle.redshift * 0.3)))
          }
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, Math.max(0.8, Math.min(10, particle.size)), 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0

          particle.life++
        })

        // Jets relativistes avec structure hélicoïdale
        if (time > 80) {
          for (let i = 0; i < 2; i++) {
            const jetDirection = i === 0 ? -1 : 1
            const jetLength = Math.min(500, 300)
            const jetWidth = Math.max(5, Math.min(25, 15))

            // Jet principal avec précession
            const precessionAngle = Math.sin(time * 0.02) * 0.1
            const jetAngle = (jetDirection * Math.PI) / 2 + precessionAngle

            const jetGradient = ctx.createLinearGradient(
                safeCenterX,
                safeCenterY,
                safeCenterX + Math.cos(jetAngle) * jetLength,
                safeCenterY + Math.sin(jetAngle) * jetLength,
            )
            jetGradient.addColorStop(0, "rgba(0, 255, 255, 0.95)")
            jetGradient.addColorStop(0.3, "rgba(100, 200, 255, 0.8)")
            jetGradient.addColorStop(0.7, "rgba(150, 150, 255, 0.6)")
            jetGradient.addColorStop(1, "rgba(0, 100, 200, 0.2)")

            ctx.strokeStyle = jetGradient
            ctx.lineWidth = jetWidth
            ctx.shadowColor = "rgba(0, 255, 255, 0.9)"
            ctx.shadowBlur = 25
            ctx.beginPath()
            ctx.moveTo(safeCenterX, safeCenterY)
            ctx.lineTo(safeCenterX + Math.cos(jetAngle) * jetLength, safeCenterY + Math.sin(jetAngle) * jetLength)
            ctx.stroke()

            // Structure hélicoïdale du jet
            for (let j = 0; j < 20; j++) {
              const helixProgress = j / 20
              const helixRadius = Math.sin(helixProgress * Math.PI * 6 + time * 0.3) * 12
              const helixX =
                  safeCenterX +
                  Math.cos(jetAngle) * (helixProgress * jetLength) +
                  Math.cos(jetAngle + Math.PI / 2) * helixRadius
              const helixY =
                  safeCenterY +
                  Math.sin(jetAngle) * (helixProgress * jetLength) +
                  Math.sin(jetAngle + Math.PI / 2) * helixRadius

              const helixOpacity = Math.max(0, Math.min(1, Math.abs(Math.sin(time * 0.15 + j * 0.4)) * 0.8 + 0.2))
              const particleSize = Math.max(1, Math.min(10, Math.random() * 5)) * (1 - helixProgress * 0.3)

              ctx.fillStyle = `rgba(255, 255, 255, ${helixOpacity * (1 - helixProgress * 0.4)})`
              ctx.shadowColor = "rgba(255, 255, 255, 0.9)"
              ctx.shadowBlur = 12
              ctx.beginPath()
              ctx.arc(helixX, helixY, Math.max(0.5, particleSize), 0, Math.PI * 2)
              ctx.fill()
            }
          }
          ctx.shadowBlur = 0
        }
      }

      // Phase 1: Évaporation de Hawking avec intrication quantique (150-300 frames)
      else if (time < 300) {
        if (phase === 0) {
          phase = 1
          createHawkingRadiation()
        }

        // Évaporation accélérée avec instabilité quantique
        const evaporationRate = Math.max(0.1, Math.min(2, 0.6 + (time - 150) * 0.015))
        schwarzschildRadius = Math.max(6, 60 - (time - 150) * evaporationRate)

        const horizonRadius = Math.max(4, Math.min(80, schwarzschildRadius))
        const instability = Math.max(0, Math.min(1, (time - 150) / 150))
        const quantumFluctuation = Math.max(0, Math.min(20, Math.abs(Math.sin(time * 0.5)) * instability * 15))

        // Horizon des événements instable avec fluctuations du vide
        const horizonGradientRadius = Math.max(25, Math.min(400, horizonRadius + quantumFluctuation + 30))
        const horizonGradient = ctx.createRadialGradient(
            safeCenterX,
            safeCenterY,
            0,
            safeCenterX,
            safeCenterY,
            horizonGradientRadius,
        )
        horizonGradient.addColorStop(0, "rgba(0, 0, 0, 1)")
        horizonGradient.addColorStop(0.3, `rgba(200, 0, 255, ${Math.min(1, 0.95 + instability * 0.05)})`)
        horizonGradient.addColorStop(0.6, `rgba(150, 0, 200, ${Math.min(1, 0.8 + instability * 0.15)})`)
        horizonGradient.addColorStop(0.9, `rgba(100, 0, 150, ${Math.min(1, 0.5 + instability * 0.3)})`)
        horizonGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = horizonGradient
        ctx.beginPath()
        ctx.arc(safeCenterX, safeCenterY, Math.max(4, horizonRadius + quantumFluctuation), 0, Math.PI * 2)
        ctx.fill()

        // Rayonnement de Hawking avec intrication
        hawkingRadiation.forEach((radiation, index) => {
          radiation.x += radiation.vx
          radiation.y += radiation.vy
          radiation.life++
          radiation.polarization += 0.1
          radiation.coherence = Math.max(0.01, radiation.coherence * 0.999)

          const radiationOpacity = Math.max(0, Math.min(1, 1 - radiation.life / radiation.maxLife))

          if (radiationOpacity > 0) {
            // Couleur avec polarisation
            let radiationColor
            const polarizationEffect = Math.abs(Math.sin(radiation.polarization)) * 0.3

            if (radiation.wavelength < 0.1) {
              radiationColor = `255, ${Math.max(0, Math.min(255, 255 - polarizationEffect * 100))}, 255` // Rayons Gamma
            } else if (radiation.wavelength < 1) {
              radiationColor = `255, 255, ${Math.max(0, Math.min(255, 255 - polarizationEffect * 100))}` // Rayons X
            } else if (radiation.wavelength < 400) {
              radiationColor = `${Math.min(255, Math.max(0, 200 + polarizationEffect * 55))}, 100, 255` // UV
            } else {
              radiationColor = `255, ${Math.min(255, Math.max(0, 200 + polarizationEffect * 55))}, 255` // Visible
            }

            // Traînée avec cohérence quantique
            const trailLength = Math.max(3, Math.min(15, radiation.coherence * 10))
            ctx.strokeStyle = `rgba(${radiationColor}, ${radiationOpacity * 0.9})`
            ctx.lineWidth = Math.max(0.8, Math.min(5, radiation.size * 1.5))
            ctx.shadowColor = `rgba(${radiationColor}, 0.9)`
            ctx.shadowBlur = Math.max(1, Math.min(25, 15 + radiation.energy * 1e-14))
            ctx.beginPath()
            ctx.moveTo(radiation.x - radiation.vx * trailLength, radiation.y - radiation.vy * trailLength)
            ctx.lineTo(radiation.x, radiation.y)
            ctx.stroke()

            // Photon principal avec effet d'onde
            const waveRadius = Math.max(1, Math.min(8, Math.abs(Math.sin(radiation.life * 0.2)) * 3 + radiation.size))
            ctx.fillStyle = `rgba(${radiationColor}, ${radiationOpacity * 0.7})`
            ctx.beginPath()
            ctx.arc(radiation.x, radiation.y, waveRadius, 0, Math.PI * 2)
            ctx.fill()

            ctx.fillStyle = `rgba(${radiationColor}, ${radiationOpacity})`
            ctx.beginPath()
            ctx.arc(radiation.x, radiation.y, Math.max(1, Math.min(8, radiation.size)), 0, Math.PI * 2)
            ctx.fill()

            // Intrication quantique visualisée
            if (radiation.entanglement && index % 2 === 0 && index + 1 < hawkingRadiation.length) {
              const partner = hawkingRadiation[index + 1]
              if (partner && partner.entanglement) {
                ctx.strokeStyle = `rgba(255, 0, 255, ${radiationOpacity * 0.4})`
                ctx.lineWidth = 1
                ctx.setLineDash([3, 3])
                ctx.beginPath()
                ctx.moveTo(radiation.x, radiation.y)
                ctx.lineTo(partner.x, partner.y)
                ctx.stroke()
                ctx.setLineDash([])
              }
            }
          }

          if (radiation.life >= radiation.maxLife) {
            hawkingRadiation.splice(index, 1)
          }
        })

        ctx.shadowBlur = 0

        // Créer plus de rayonnement avec intensité croissante
        if (time % Math.max(5, 25 - Math.floor(instability * 20)) === 0 && hawkingRadiation.length < 200) {
          createHawkingRadiation()
        }

        // Halo d'instabilité quantique multi-couches
        for (let layer = 0; layer < 3; layer++) {
          const instabilityRadius = Math.max(80, Math.min(600, horizonRadius + 60 + layer * 20))
          const layerIntensity = Math.max(0, Math.min(1, instability * (0.8 - layer * 0.2)))

          const quantumGradient = ctx.createRadialGradient(
              safeCenterX,
              safeCenterY,
              Math.max(8, horizonRadius + layer * 15),
              safeCenterX,
              safeCenterY,
              instabilityRadius,
          )
          quantumGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
          quantumGradient.addColorStop(0.2, `rgba(255, 0, 255, ${layerIntensity * 0.3})`)
          quantumGradient.addColorStop(0.5, `rgba(200, 100, 255, ${layerIntensity * 0.5})`)
          quantumGradient.addColorStop(0.8, `rgba(150, 50, 200, ${layerIntensity * 0.4})`)
          quantumGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = quantumGradient
          ctx.beginPath()
          ctx.arc(safeCenterX, safeCenterY, instabilityRadius, 0, Math.PI * 2)
          ctx.fill()
        }

        // Fluctuations quantiques du vide avec création de paires
        for (let i = 0; i < 30; i++) {
          const fluctAngle = Math.random() * Math.PI * 2
          const fluctRadius = horizonRadius + Math.random() * 40
          const fluctX = safeCenterX + Math.cos(fluctAngle) * fluctRadius
          const fluctY = safeCenterY + Math.sin(fluctAngle) * fluctRadius
          const fluctIntensity = Math.max(0, Math.min(1, Math.random() * instability * 0.9))

          // Paire particule-antiparticule
          if (Math.random() < 0.3) {
            ctx.fillStyle = `rgba(0, 255, 255, ${fluctIntensity})`
            ctx.beginPath()
            ctx.arc(fluctX - 2, fluctY, Math.max(0.5, Math.min(3, Math.random() * 1.5 + 0.5)), 0, Math.PI * 2)
            ctx.fill()

            ctx.fillStyle = `rgba(255, 0, 255, ${fluctIntensity})`
            ctx.beginPath()
            ctx.arc(fluctX + 2, fluctY, Math.max(0.5, Math.min(3, Math.random() * 1.5 + 0.5)), 0, Math.PI * 2)
            ctx.fill()

            // Ligne d'annihilation potentielle
            ctx.strokeStyle = `rgba(255, 255, 255, ${fluctIntensity * 0.5})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(fluctX - 2, fluctY)
            ctx.lineTo(fluctX + 2, fluctY)
            ctx.stroke()
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${fluctIntensity})`
            ctx.beginPath()
            ctx.arc(fluctX, fluctY, Math.max(0.8, Math.min(4, Math.random() * 2 + 0.8)), 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Phase 2: Explosion finale avec nucléosynthèse (300-420 frames)
      else if (time < 420) {
        if (phase === 1) {
          phase = 2
          createFinalExplosion()
          createGravitationalWaves()
        }

        const explosionProgress = Math.max(0, Math.min(1, (time - 300) / 120))

        // Flash gamma initial multi-spectral
        if (explosionProgress < 0.3) {
          const flashIntensity = Math.max(0, Math.min(1, (0.3 - explosionProgress) * 3.33))

          // Flash gamma principal
          ctx.fillStyle = `rgba(255, 255, 255, ${flashIntensity})`
          ctx.fillRect(0, 0, canvasWidth, canvasHeight)

          // Flash X secondaire
          if (flashIntensity > 0.7) {
            ctx.fillStyle = `rgba(200, 150, 255, ${Math.min(1, (flashIntensity - 0.7) * 0.8)})`
            ctx.fillRect(0, 0, canvasWidth, canvasHeight)
          }

          // Flash UV tertiaire
          if (flashIntensity > 0.4) {
            ctx.fillStyle = `rgba(150, 0, 255, ${Math.min(1, (flashIntensity - 0.4) * 0.6)})`
            ctx.fillRect(0, 0, canvasWidth, canvasHeight)
          }
        }

        // Onde de choc sphérique avec structure
        const shockRadius = Math.max(0, Math.min(maxDimension * 1.5, explosionProgress * maxDimension * 1.1))
        if (shockRadius > 0) {
          // Onde principale
          const shockGradient = ctx.createRadialGradient(
              safeCenterX,
              safeCenterY,
              Math.max(0, shockRadius * 0.9),
              safeCenterX,
              safeCenterY,
              Math.max(shockRadius * 0.9 + 1, shockRadius),
          )
          shockGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
          shockGradient.addColorStop(0.5, `rgba(220, 0, 255, ${Math.max(0, (1 - explosionProgress) * 0.9)})`)
          shockGradient.addColorStop(0.8, `rgba(120, 0, 200, ${Math.max(0, (1 - explosionProgress) * 0.7)})`)
          shockGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = shockGradient
          ctx.beginPath()
          ctx.arc(safeCenterX, safeCenterY, shockRadius, 0, Math.PI * 2)
          ctx.fill()

          // Onde secondaire
          if (shockRadius > 80) {
            const secondaryGradient = ctx.createRadialGradient(
                safeCenterX,
                safeCenterY,
                Math.max(0, shockRadius * 0.7),
                safeCenterX,
                safeCenterY,
                Math.max(shockRadius * 0.7 + 1, shockRadius * 0.85),
            )
            secondaryGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
            secondaryGradient.addColorStop(0.6, `rgba(255, 50, 200, ${Math.max(0, (1 - explosionProgress) * 0.6)})`)
            secondaryGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

            ctx.fillStyle = secondaryGradient
            ctx.beginPath()
            ctx.arc(safeCenterX, safeCenterY, shockRadius * 0.85, 0, Math.PI * 2)
            ctx.fill()
          }

          // Onde tertiaire (filamentaire)
          if (shockRadius > 150) {
            const tertiaryGradient = ctx.createRadialGradient(
                safeCenterX,
                safeCenterY,
                Math.max(0, shockRadius * 0.5),
                safeCenterX,
                safeCenterY,
                Math.max(shockRadius * 0.5 + 1, shockRadius * 0.65),
            )
            tertiaryGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
            tertiaryGradient.addColorStop(0.7, `rgba(200, 100, 255, ${Math.max(0, (1 - explosionProgress) * 0.4)})`)
            tertiaryGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

            ctx.fillStyle = tertiaryGradient
            ctx.beginPath()
            ctx.arc(safeCenterX, safeCenterY, shockRadius * 0.65, 0, Math.PI * 2)
            ctx.fill()
          }
        }

        // Ondes gravitationnelles avec harmoniques variables
        gravitationalWaves.forEach((wave, index) => {
          wave.radius += 12 + Math.sin(time * wave.frequency) * 3
          wave.intensity = Math.max(0, wave.intensity - 0.008)

          if (wave.radius < wave.maxRadius && wave.intensity > 0.08) {
            const waveAmplitude = Math.abs(Math.sin(time * 0.1 + index)) * 25 * wave.intensity
            const waveFrequency = Math.sin(time * wave.frequency * 12) * 6

            // Superposition d'harmoniques
            let harmonicOffset = 0
            wave.harmonics.forEach((harmonic, hIndex) => {
              harmonicOffset += Math.sin(time * harmonic) * 5 * wave.intensity
            })

            const finalRadius = Math.max(
                1,
                Math.min(maxDimension, wave.radius + waveAmplitude + waveFrequency + harmonicOffset),
            )
            const waveColor = wave.polarization === "plus" ? "150, 0, 200" : "0, 200, 255"
            ctx.strokeStyle = `rgba(${waveColor}, ${wave.intensity * 0.8})`
            ctx.lineWidth = Math.max(1.2, Math.min(10, waveAmplitude * 0.35))
            ctx.setLineDash([18, 18])
            ctx.beginPath()
            ctx.arc(wave.x, wave.y, finalRadius, 0, Math.PI * 2)
            ctx.stroke()
            ctx.setLineDash([])
          } else if (wave.radius >= wave.maxRadius) {
            wave.radius = 0
            wave.intensity = 1
            wave.frequency = Math.max(0.01, Math.min(0.3, Math.random() * 0.18 + 0.06))
          }
        })

        // Fragments d'explosion avec interactions complexes
        explosionFragments.forEach((fragment, index) => {
          fragment.x += fragment.vx
          fragment.y += fragment.vy
          fragment.life++
          fragment.interactions += 0.1

          // Décélération et expansion
          fragment.vx *= 0.997
          fragment.vy *= 0.997
          fragment.size = Math.min(20, fragment.size * 1.001)

          // Décroissance radioactive
          fragment.energy = Math.max(1e10, fragment.energy * (1 - fragment.decay))

          // Ajouter à la traînée thermique
          const trailTemperature = Math.max(10, Math.min(1e7, 10000 * (fragment.energy / 1e17)))
          fragment.trail.push({ x: fragment.x, y: fragment.y, opacity: 1, temperature: trailTemperature })
          if (fragment.trail.length > 18) {
            fragment.trail.shift()
          }

          const fragmentOpacity = Math.max(0, Math.min(1, 1 - fragment.life / fragment.maxLife))

          if (fragmentOpacity > 0) {
            // Traînée thermique avec dégradé
            fragment.trail.forEach((point, trailIndex) => {
              const trailOpacity = Math.max(
                  0,
                  Math.min(1, (trailIndex / fragment.trail.length) * fragmentOpacity * 0.8),
              )
              const trailSize = Math.max(0.6, Math.min(15, fragment.size * (trailIndex / fragment.trail.length) * 0.7))
              const trailColor = getTemperatureColor(point.temperature)

              ctx.fillStyle = trailColor.replace(")", `, ${trailOpacity})`)
              ctx.beginPath()
              ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2)
              ctx.fill()
            })

            // Fragment principal avec effets de matière/antimatière
            ctx.fillStyle = fragment.color.replace(")", `, ${fragmentOpacity})`)

            if (fragment.type === "photon" || fragment.energy > 8e16) {
              ctx.shadowColor = fragment.color
              ctx.shadowBlur = Math.min(40, 28)
            } else if (fragment.type === "darkmatter") {
              ctx.shadowColor = "#4B0082"
              ctx.shadowBlur = Math.min(30, 18)
            }

            if (fragment.type === "antimatter") {
              // Scintillement et annihilation
              const flicker = Math.abs(Math.sin(time * 0.4 + index)) * 0.6 + 0.4
              ctx.shadowColor = "#FF00FF"
              ctx.shadowBlur = Math.max(1, Math.min(35, 22 * flicker))

              // Annihilation avec la matière environnante
              if (fragment.interactions > 5 && Math.random() < 0.2) {
                // Créer des photons gamma
                for (let k = 0; k < 3; k++) {
                  const angle = Math.random() * Math.PI * 2
                  quantumParticles.push({
                    x: fragment.x,
                    y: fragment.y,
                    vx: Math.cos(angle) * 6,
                    vy: Math.sin(angle) * 6,
                    type: "photon",
                    energy: Math.max(1e10, fragment.energy * 0.1),
                    spin: 1,
                    charge: 0,
                    mass: 0,
                    lifetime: Number.POSITIVE_INFINITY,
                    age: 0,
                    waveFunction: Math.random() * Math.PI * 2,
                    color: "#FFFFFF",
                    size: 2,
                    phase: Math.random() * Math.PI * 2,
                  })
                }
                fragment.life = fragment.maxLife // Destruction
              }
            }

            ctx.beginPath()
            ctx.arc(fragment.x, fragment.y, Math.max(0.7, Math.min(15, fragment.size)), 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
          }

          if (fragment.life >= fragment.maxLife) {
            explosionFragments.splice(index, 1)
          }
        })

        // Rayons d'énergie avec structure fractale
        const rayCount = 28
        for (let i = 0; i < rayCount; i++) {
          const rayAngle = (i * Math.PI * 2) / rayCount + time * 0.06
          const rayLength = Math.max(0, Math.min(maxDimension * 0.8, shockRadius * 0.9))
          const rayIntensity = Math.max(
              0,
              Math.min(1, (1 - explosionProgress) * 0.9 * Math.abs(Math.sin(time * 0.12 + i * 0.25))),
          )

          if (rayLength > 0 && rayIntensity > 0.1) {
            // Dégradé spectral
            const rayGradient = ctx.createLinearGradient(
                safeCenterX,
                safeCenterY,
                safeCenterX + Math.cos(rayAngle) * rayLength,
                safeCenterY + Math.sin(rayAngle) * rayLength,
            )
            rayGradient.addColorStop(0, `rgba(255, 255, 255, ${rayIntensity})`)
            rayGradient.addColorStop(0.4, `rgba(230, 30, 255, ${rayIntensity * 0.7})`)
            rayGradient.addColorStop(0.8, `rgba(150, 0, 200, ${rayIntensity * 0.4})`)
            rayGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

            ctx.strokeStyle = rayGradient
            ctx.lineWidth = Math.min(15, 5)
            ctx.shadowColor = "rgba(230, 30, 255, 0.9)"
            ctx.shadowBlur = Math.min(40, 30)

            // Structure fractale
            ctx.beginPath()
            ctx.moveTo(safeCenterX, safeCenterY)
            let currentX = safeCenterX
            let currentY = safeCenterY
            for (let j = 0; j < 6; j++) {
              const fractalOffset = Math.sin(time * 0.2 + j * 0.5) * (rayLength / 8)
              currentX += Math.cos(rayAngle) * (rayLength / 6) + fractalOffset
              currentY += Math.sin(rayAngle) * (rayLength / 6) + fractalOffset
              ctx.lineTo(currentX, currentY)
            }
            ctx.stroke()
          }
        }
        ctx.shadowBlur = 0
      }

      // Phase 3: Transition cosmique vers le système solaire (420-480 frames)
      else if (time < 480) {
        if (phase === 2) {
          phase = 3
        }

        const transitionProgress = Math.min(1, (time - 420) / 60)

        // Distorsion spatiale avec vortex multi-couches
        const distortionRadius = Math.max(60, Math.min(maxDimension, 650 * (1 - transitionProgress * 0.7)))
        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, 1 - transitionProgress * 0.85))

        // Vortex cosmique avec filaments
        for (let layer = 0; layer < 4; layer++) {
          const layerRadius = Math.max(10, distortionRadius * (1 - layer * 0.2))
          const layerSpeed = 0.03 + layer * 0.015

          for (let i = 0; i < 15; i++) {
            const angle = (i / 15) * Math.PI * 2
            const spiralRadius = Math.max(5, layerRadius * (1 - transitionProgress * 0.6))

            // Dégradé spectral
            const gradient = ctx.createLinearGradient(
                safeCenterX,
                safeCenterY,
                safeCenterX + Math.cos(angle + time * layerSpeed) * spiralRadius,
                safeCenterY + Math.sin(angle + time * layerSpeed) * spiralRadius,
            )

            const baseOpacity = Math.max(0, Math.min(1, 0.7 - layer * 0.18))
            gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
            gradient.addColorStop(0.3, `rgba(100, 0, 180, ${baseOpacity})`)
            gradient.addColorStop(0.6, `rgba(180, 50, 255, ${baseOpacity * 0.7})`)
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

            ctx.strokeStyle = gradient
            ctx.lineWidth = Math.max(1, Math.min(30, (24 - layer * 6) * (1 - transitionProgress)))
            ctx.beginPath()

            // Spirale fractale
            for (let j = 0; j < 50; j++) {
              const spiralAngle = angle + j * 0.2 + time * layerSpeed
              const radius = Math.max(0, (j * spiralRadius) / 50)
              const fractalOffset = Math.sin(time * 0.3 + j * 0.4) * (radius / 10)

              const x = safeCenterX + Math.cos(spiralAngle) * radius + fractalOffset
              const y = safeCenterY + Math.sin(spiralAngle) * radius + fractalOffset

              if (j === 0) {
                ctx.moveTo(x, y)
              } else {
                ctx.lineTo(x, y)
              }
            }

            ctx.stroke()
          }
        }

        // Formation stellaire avec types spectraux
        for (let i = 0; i < 100; i++) {
          const angle = Math.random() * Math.PI * 2
          const distance = Math.max(0, Math.random() * distortionRadius * 0.9)
          const x = safeCenterX + Math.cos(angle) * distance
          const y = safeCenterY + Math.sin(angle) * distance
          const size = Math.max(1.2, Math.min(8, Math.random() * 3.5 + 1.2))
          const brightness = Math.max(0.15, Math.min(1, Math.random() * 0.95 + 0.15))
          const stellarType = Math.random()

          // Couleurs spectrales
          let starColor
          if (stellarType < 0.25) {
            starColor = `rgba(255, 255, 255, ${brightness})` // Étoiles bleues
          } else if (stellarType < 0.5) {
            starColor = `rgba(255, 240, 180, ${brightness})` // Étoiles jaunes
          } else if (stellarType < 0.75) {
            starColor = `rgba(255, 180, 120, ${brightness})` // Étoiles oranges
          } else {
            starColor = `rgba(255, 100, 100, ${brightness})` // Étoiles rouges
          }

          ctx.fillStyle = starColor
          ctx.shadowColor = starColor
          ctx.shadowBlur = Math.max(1, Math.min(15, size * 3.5))
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }

        // Nébuleuse résiduelle avec structure filamentaire
        const nebulaRadius = Math.max(120, Math.min(maxDimension, 700 * (1 + transitionProgress * 0.35)))
        for (let i = 0; i < 7; i++) {
          const filamentAngle = (i / 7) * Math.PI * 2
          const filamentGradient = ctx.createLinearGradient(
              safeCenterX,
              safeCenterY,
              safeCenterX + Math.cos(filamentAngle) * nebulaRadius,
              safeCenterY + Math.sin(filamentAngle) * nebulaRadius,
          )

          filamentGradient.addColorStop(0, `rgba(200, 120, 255, ${Math.max(0, (1 - transitionProgress) * 0.45)})`)
          filamentGradient.addColorStop(0.5, `rgba(120, 180, 255, ${Math.max(0, (1 - transitionProgress) * 0.35)})`)
          filamentGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.strokeStyle = filamentGradient
          ctx.lineWidth = Math.max(1, Math.min(15, 9 * (1 - transitionProgress)))
          ctx.beginPath()
          ctx.moveTo(safeCenterX, safeCenterY)
          ctx.lineTo(
              safeCenterX + Math.cos(filamentAngle) * nebulaRadius,
              safeCenterY + Math.sin(filamentAngle) * nebulaRadius,
          )
          ctx.stroke()
        }

        // Halo central avec pulsation et dégradé
        const centralPulse = Math.abs(Math.sin(time * 0.12)) * 0.55 + 0.45
        const centralGlowRadius = Math.max(10, Math.min(maxDimension * 0.5, 180 * (1 - transitionProgress * 0.9)))
        const centralGlow = ctx.createRadialGradient(
            safeCenterX,
            safeCenterY,
            0,
            safeCenterX,
            safeCenterY,
            centralGlowRadius,
        )
        centralGlow.addColorStop(0, `rgba(255, 255, 255, ${centralPulse * (1 - transitionProgress)})`)
        centralGlow.addColorStop(0.3, `rgba(200, 30, 255, ${centralPulse * 0.75 * (1 - transitionProgress)})`)
        centralGlow.addColorStop(0.7, `rgba(100, 0, 150, ${centralPulse * 0.5 * (1 - transitionProgress)})`)
        centralGlow.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = centralGlow
        ctx.beginPath()
        ctx.arc(safeCenterX, safeCenterY, centralGlowRadius, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowBlur = 0
        ctx.restore()
      }

      // Continuer l'animation ou transition vers le système solaire
      if (time < 480) {
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
