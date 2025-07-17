"use client"

import { SolarSystem3D } from "@/components/SolarSystem3D"
import { useEffect, useState, useRef } from "react"

export default function Home() {
  const [showBigBang, setShowBigBang] = useState(true)
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

    // Centre de l'explosion
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    // Particules pour l'explosion avec physique réaliste
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      mass: number
      temperature: number
      color: string
      life: number
      maxLife: number
      type: "quark" | "photon" | "electron" | "proton" | "neutron" | "hydrogen" | "helium" | "star" | "galaxy"
      energy: number
      spin: number
      charge: number
    }> = []

    // Ondes gravitationnelles
    const gravitationalWaves: Array<{
      x: number
      y: number
      radius: number
      intensity: number
      frequency: number
    }> = []

    // Distorsions spatio-temporelles
    const spaceTimeDistortions: Array<{
      x: number
      y: number
      strength: number
      radius: number
      age: number
    }> = []

    let time = 0
    let universeAge = 0 // En "années" cosmiques simulées
    let temperature = 1e32 // Température de Planck en Kelvin
    let density = 1e96 // Densité initiale

    // Créer les particules selon l'évolution cosmologique
    const createQuantumFluctuations = () => {
      // Fluctuations quantiques initiales
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 0.1

        particles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 0.01,
          vy: (Math.random() - 0.5) * 0.01,
          size: 0.1,
          mass: 1e-35, // Masse de Planck
          temperature: 1e32,
          color: "#FFFFFF",
          life: 0,
          maxLife: 1000,
          type: "quark",
          energy: 1e19, // Énergie de Planck
          spin: Math.random() * 2 - 1,
          charge: Math.random() > 0.5 ? 1 : -1,
        })
      }
    }

    const createInflationParticles = () => {
      // Inflation cosmique - expansion exponentielle
      const particleCount = 2000

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 25 + 15 // Vitesse proche de c
        const distance = Math.random() * 10

        particles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 0.5,
          mass: Math.random() * 1e-27 + 1e-28,
          temperature: 1e28 - Math.random() * 1e27,
          color: getTemperatureColor(1e28 - Math.random() * 1e27),
          life: 0,
          maxLife: Math.random() * 400 + 300,
          type: Math.random() > 0.7 ? "photon" : Math.random() > 0.5 ? "electron" : "quark",
          energy: Math.random() * 1e15 + 1e14,
          spin: Math.random() * 2 - 1,
          charge: Math.random() > 0.66 ? 1 : Math.random() > 0.33 ? -1 : 0,
        })
      }
    }

    const createNucleosynthesisParticles = () => {
      // Nucléosynthèse primordiale
      const nucleiCount = 800

      for (let i = 0; i < nucleiCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 12 + 8
        const distance = Math.random() * 100 + 50

        particles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1,
          mass: Math.random() > 0.75 ? 6.64e-27 : 1.67e-27, // Hélium ou Hydrogène
          temperature: 1e9 - Math.random() * 5e8,
          color: Math.random() > 0.75 ? "#FFE135" : "#FF6B6B", // Hélium jaune, Hydrogène rouge
          life: 0,
          maxLife: Math.random() * 600 + 400,
          type: Math.random() > 0.75 ? "helium" : "hydrogen",
          energy: Math.random() * 1e12 + 1e11,
          spin: Math.random() * 2 - 1,
          charge: Math.random() > 0.75 ? 2 : 1,
        })
      }
    }

    const createStarFormation = () => {
      // Formation des premières étoiles
      const starCount = 200

      for (let i = 0; i < starCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 5 + 2
        const distance = Math.random() * 300 + 100

        particles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 8 + 3,
          mass: Math.random() * 1e31 + 1e30, // Masse stellaire
          temperature: Math.random() * 3e4 + 1e4,
          color: getStarColor(Math.random() * 3e4 + 1e4),
          life: 0,
          maxLife: Math.random() * 800 + 600,
          type: "star",
          energy: Math.random() * 1e26 + 1e25,
          spin: Math.random() * 2 - 1,
          charge: 0,
        })
      }
    }

    // Couleur basée sur la température (loi de Wien)
    const getTemperatureColor = (temp: number): string => {
      if (temp > 1e30) return "#FFFFFF" // Blanc pur - température de Planck
      if (temp > 1e15) return "#E6E6FA" // Lavande - rayons gamma
      if (temp > 1e12) return "#87CEEB" // Bleu ciel - rayons X
      if (temp > 1e9) return "#4169E1" // Bleu royal - UV
      if (temp > 1e6) return "#FFD700" // Or - visible
      if (temp > 1e4) return "#FF6347" // Rouge tomate - infrarouge
      return "#8B0000" // Rouge foncé - micro-ondes
    }

    // Couleur des étoiles selon leur température
    const getStarColor = (temp: number): string => {
      if (temp > 30000) return "#9BB0FF" // Bleu - étoiles O
      if (temp > 10000) return "#AABFFF" // Bleu-blanc - étoiles B
      if (temp > 7500) return "#CAD7FF" // Blanc - étoiles A
      if (temp > 6000) return "#F8F7FF" // Blanc-jaune - étoiles F
      if (temp > 5200) return "#FFF4EA" // Jaune - étoiles G (Soleil)
      if (temp > 3700) return "#FFD2A1" // Orange - étoiles K
      return "#FFAD51" // Rouge - étoiles M
    }

    // Créer une onde gravitationnelle
    const createGravitationalWave = (x: number, y: number, intensity: number) => {
      gravitationalWaves.push({
        x,
        y,
        radius: 0,
        intensity,
        frequency: Math.random() * 100 + 50,
      })
    }

    // Créer une distorsion spatio-temporelle
    const createSpaceTimeDistortion = (x: number, y: number, strength: number) => {
      spaceTimeDistortions.push({
        x,
        y,
        strength,
        radius: 0,
        age: 0,
      })
    }

    createQuantumFluctuations()

    const animate = () => {
      // Fond cosmique avec rayonnement de fond
      const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          Math.max(canvas.width, canvas.height),
      )
      gradient.addColorStop(0, `rgba(${Math.floor(temperature / 1e29)}, 0, ${Math.floor(temperature / 1e30)}, 0.1)`)
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 1
      universeAge = time / 60 // 1 seconde = 1 milliard d'années

      // Évolution de la température et densité selon le modèle cosmologique
      temperature = Math.max(2.7, 1e32 * Math.pow(time + 1, -1)) // Refroidissement adiabatique
      density = 1e96 * Math.pow(time + 1, -3) // Dilution par expansion

      // Phase 0: Ère de Planck (0-1s) - Fluctuations quantiques
      if (time < 60) {
        const intensity = Math.sin(time * 0.5) * 0.8 + 0.2
        const size = 1 + intensity * 15

        // Singularité avec distorsion spatio-temporelle
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.scale(1 + Math.sin(time * 0.3) * 0.1, 1 + Math.cos(time * 0.3) * 0.1)

        // Horizon des événements
        const horizonGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 5)
        horizonGradient.addColorStop(0, `rgba(255, 255, 255, ${intensity})`)
        horizonGradient.addColorStop(0.2, `rgba(255, 215, 0, ${intensity * 0.9})`)
        horizonGradient.addColorStop(0.4, `rgba(255, 69, 0, ${intensity * 0.7})`)
        horizonGradient.addColorStop(0.6, `rgba(138, 43, 226, ${intensity * 0.5})`)
        horizonGradient.addColorStop(0.8, `rgba(75, 0, 130, ${intensity * 0.3})`)
        horizonGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = horizonGradient
        ctx.beginPath()
        ctx.arc(0, 0, size * 5, 0, Math.PI * 2)
        ctx.fill()

        // Fluctuations quantiques
        for (let i = 0; i < 20; i++) {
          const angle = (time * 0.1 + i) * 0.5
          const radius = size * 2 + Math.sin(time * 0.2 + i) * size
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.3})`
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()

        // Texte avec effet de distorsion temporelle
        ctx.save()
        ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.8})`
        ctx.font = `bold ${20 + intensity * 10}px Arial`
        ctx.textAlign = "center"
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)"
        ctx.shadowBlur = 10

        const textY = centerY - 120 + Math.sin(time * 0.2) * 5
        ctx.fillText("Ère de Planck", centerX, textY)

        ctx.font = "16px Arial"
        ctx.fillStyle = `rgba(200, 200, 255, ${intensity * 0.6})`
        ctx.fillText(`T = ${(temperature / 1e32).toExponential(1)} × 10³² K`, centerX, textY + 30)
        ctx.fillText(`t = ${((time / 60) * 5.39e-44).toExponential(1)} s`, centerX, textY + 50)
        ctx.restore()

        // Créer des distorsions spatio-temporelles
        if (time % 10 === 0) {
          createSpaceTimeDistortion(
              centerX + (Math.random() - 0.5) * 100,
              centerY + (Math.random() - 0.5) * 100,
              Math.random() * 50 + 25,
          )
        }
      }

      // Phase 1: Inflation cosmique (1-2s)
      else if (time < 120) {
        if (time === 60) {
          createInflationParticles()
          createGravitationalWave(centerX, centerY, 100)
        }

        const inflationProgress = (time - 60) / 60
        const expansionFactor = Math.pow(10, inflationProgress * 26) // Expansion de 10^26

        // Flash d'inflation
        if (time < 80) {
          ctx.fillStyle = `rgba(255, 255, 255, ${(1 - inflationProgress) * 0.7})`
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        // Horizon cosmique en expansion
        const horizonRadius = expansionFactor * 0.1
        const horizonGradient = ctx.createRadialGradient(
            centerX,
            centerY,
            horizonRadius * 0.5,
            centerX,
            centerY,
            horizonRadius,
        )
        horizonGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
        horizonGradient.addColorStop(0.8, `rgba(100, 149, 237, ${(1 - inflationProgress) * 0.3})`)
        horizonGradient.addColorStop(1, "rgba(0, 0, 139, 0)")

        ctx.fillStyle = horizonGradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, horizonRadius, 0, Math.PI * 2)
        ctx.fill()

        // Texte d'inflation
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - inflationProgress * 0.5})`
        ctx.font = "bold 28px Arial"
        ctx.textAlign = "center"
        ctx.shadowColor = "rgba(100, 149, 237, 0.8)"
        ctx.shadowBlur = 15
        ctx.fillText("INFLATION COSMIQUE", centerX, centerY - 180)

        ctx.font = "18px Arial"
        ctx.fillStyle = `rgba(200, 200, 255, ${1 - inflationProgress * 0.3})`
        ctx.fillText(`Expansion: ×${expansionFactor.toExponential(1)}`, centerX, centerY - 150)
        ctx.fillText(`T = ${(temperature / 1e15).toFixed(1)} × 10¹⁵ K`, centerX, centerY - 130)
      }

      // Phase 2: Ère électrofaible et QCD (2-4s)
      else if (time < 240) {
        if (time === 120) {
          // Transition de phase - brisure de symétrie
          for (let i = 0; i < 500; i++) {
            const angle = Math.random() * Math.PI * 2
            const speed = Math.random() * 15 + 10
            const distance = Math.random() * 200 + 100

            particles.push({
              x: centerX + Math.cos(angle) * distance,
              y: centerY + Math.sin(angle) * distance,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * 4 + 2,
              mass: Math.random() * 1e-25 + 1e-26,
              temperature: 1e15 - Math.random() * 5e14,
              color: getTemperatureColor(1e15 - Math.random() * 5e14),
              life: 0,
              maxLife: Math.random() * 300 + 200,
              type: Math.random() > 0.6 ? "proton" : Math.random() > 0.3 ? "neutron" : "electron",
              energy: Math.random() * 1e13 + 1e12,
              spin: Math.random() * 2 - 1,
              charge: Math.random() > 0.6 ? 1 : Math.random() > 0.3 ? 0 : -1,
            })
          }
        }

        ctx.fillStyle = `rgba(255, 255, 255, 0.8)`
        ctx.font = "bold 24px Arial"
        ctx.textAlign = "center"
        ctx.shadowColor = "rgba(255, 100, 100, 0.6)"
        ctx.shadowBlur = 12
        ctx.fillText("Formation des Particules", centerX, centerY - 200)

        ctx.font = "16px Arial"
        ctx.fillStyle = `rgba(255, 200, 200, 0.9)`
        ctx.fillText("Quarks → Protons & Neutrons", centerX, centerY - 175)
        ctx.fillText(`T = ${(temperature / 1e12).toFixed(1)} × 10¹² K`, centerX, centerY - 155)
      }

      // Phase 3: Nucléosynthèse primordiale (4-8s)
      else if (time < 480) {
        if (time === 240) {
          createNucleosynthesisParticles()
        }

        ctx.fillStyle = `rgba(255, 215, 0, 0.9)`
        ctx.font = "bold 26px Arial"
        ctx.textAlign = "center"
        ctx.shadowColor = "rgba(255, 215, 0, 0.8)"
        ctx.shadowBlur = 15
        ctx.fillText("Nucléosynthèse Primordiale", centerX, centerY - 220)

        ctx.font = "18px Arial"
        ctx.fillStyle = `rgba(255, 255, 200, 0.8)`
        ctx.fillText("Formation: 75% H, 25% He", centerX, centerY - 195)
        ctx.fillText(`T = ${(temperature / 1e9).toFixed(1)} × 10⁹ K`, centerX, centerY - 175)
        ctx.fillText(`Âge: ${(universeAge * 1e9).toFixed(0)} ans`, centerX, centerY - 155)
      }

      // Phase 4: Formation des premières étoiles (8-12s)
      else if (time < 720) {
        if (time === 480) {
          createStarFormation()
        }

        ctx.fillStyle = `rgba(135, 206, 235, 0.9)`
        ctx.font = "bold 28px Arial"
        ctx.textAlign = "center"
        ctx.shadowColor = "rgba(135, 206, 235, 0.8)"
        ctx.shadowBlur = 18
        ctx.fillText("Premières Étoiles", centerX, centerY - 240)

        ctx.font = "20px Arial"
        ctx.fillStyle = `rgba(200, 230, 255, 0.8)`
        ctx.fillText("Population III", centerX, centerY - 210)
        ctx.fillText(`T = ${temperature.toFixed(1)} K (CMB)`, centerX, centerY - 185)
        ctx.fillText(`Âge: ${(universeAge * 1e6).toFixed(0)} millions d'années`, centerX, centerY - 160)
      }

      // Phase 5: Transition vers le système solaire (12s+)
      else {
        const transitionProgress = Math.min(1, (time - 720) / 120)

        ctx.fillStyle = `rgba(0, 200, 200, ${1 - transitionProgress * 0.3})`
        ctx.font = "bold 32px Arial"
        ctx.textAlign = "center"
        ctx.shadowColor = "rgba(0, 200, 200, 0.8)"
        ctx.shadowBlur = 20
        ctx.fillText("Mon Portfolio Spatial", centerX, centerY - 250)

        ctx.font = "20px Arial"
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - transitionProgress * 0.5})`
        ctx.fillText("Bienvenue dans mon univers numérique", centerX, centerY - 220)
        ctx.fillText("13.8 milliards d'années plus tard...", centerX, centerY - 195)
      }

      // Animer les particules avec physique réaliste
      particles.forEach((particle, index) => {
        particle.life++

        // Forces gravitationnelles entre particules massives
        if (particle.mass > 1e-26) {
          particles.forEach((other, otherIndex) => {
            if (index !== otherIndex && other.mass > 1e-26) {
              const dx = other.x - particle.x
              const dy = other.y - particle.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance > 0 && distance < 200) {
                const force = ((6.67e-11 * particle.mass * other.mass) / (distance * distance)) * 1e20
                const fx = (dx / distance) * force
                const fy = (dy / distance) * force

                particle.vx += fx / particle.mass
                particle.vy += fy / particle.mass
              }
            }
          })
        }

        // Expansion de Hubble
        const hubbleConstant = 70 // km/s/Mpc
        const distanceFromCenter = Math.sqrt(
            (particle.x - centerX) * (particle.x - centerX) + (particle.y - centerY) * (particle.y - centerY),
        )

        if (distanceFromCenter > 100) {
          const expansionVelocity = hubbleConstant * distanceFromCenter * 1e-6
          const angle = Math.atan2(particle.y - centerY, particle.x - centerX)
          particle.vx += Math.cos(angle) * expansionVelocity * 0.01
          particle.vy += Math.sin(angle) * expansionVelocity * 0.01
        }

        // Mouvement et refroidissement
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.9995 // Friction cosmique
        particle.vy *= 0.9995
        particle.temperature *= 0.9999 // Refroidissement adiabatique

        // Mise à jour de la couleur selon la température
        particle.color =
            particle.type === "star" ? getStarColor(particle.temperature) : getTemperatureColor(particle.temperature)

        // Calculer l'opacité
        const lifeRatio = particle.life / particle.maxLife
        const opacity = Math.max(0, 1 - lifeRatio)

        if (opacity > 0) {
          ctx.save()

          // Effets selon le type de particule
          switch (particle.type) {
            case "star":
              // Étoiles avec fusion nucléaire
              const pulsation = Math.sin(time * 0.05 + index * 0.1) * 0.3 + 0.7
              const stellarSize = particle.size * pulsation

              // Cœur stellaire
              ctx.fillStyle = particle.color.replace(")", `, ${opacity})`)
              ctx.beginPath()
              ctx.arc(particle.x, particle.y, stellarSize, 0, Math.PI * 2)
              ctx.fill()

              // Couronne stellaire
              const coronaGradient = ctx.createRadialGradient(
                  particle.x,
                  particle.y,
                  stellarSize,
                  particle.x,
                  particle.y,
                  stellarSize * 3,
              )
              coronaGradient.addColorStop(0, particle.color.replace(")", `, ${opacity * 0.6})`))
              coronaGradient.addColorStop(0.5, particle.color.replace(")", `, ${opacity * 0.3})`))
              coronaGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

              ctx.fillStyle = coronaGradient
              ctx.beginPath()
              ctx.arc(particle.x, particle.y, stellarSize * 3, 0, Math.PI * 2)
              ctx.fill()

              // Éjections de masse coronale
              if (Math.random() < 0.01) {
                for (let i = 0; i < 3; i++) {
                  const ejectAngle = Math.random() * Math.PI * 2
                  const ejectSpeed = Math.random() * 5 + 2
                  particles.push({
                    x: particle.x,
                    y: particle.y,
                    vx: particle.vx + Math.cos(ejectAngle) * ejectSpeed,
                    vy: particle.vy + Math.sin(ejectAngle) * ejectSpeed,
                    size: Math.random() * 2 + 0.5,
                    mass: particle.mass * 0.001,
                    temperature: particle.temperature * 0.8,
                    color: particle.color,
                    life: 0,
                    maxLife: 100,
                    type: "photon",
                    energy: particle.energy * 0.1,
                    spin: Math.random() * 2 - 1,
                    charge: 0,
                  })
                }
              }
              break

            case "photon":
              // Photons - particules de lumière
              const photonTrail = 5
              ctx.strokeStyle = particle.color.replace(")", `, ${opacity * 0.8})`)
              ctx.lineWidth = particle.size
              ctx.beginPath()
              ctx.moveTo(particle.x - particle.vx * photonTrail, particle.y - particle.vy * photonTrail)
              ctx.lineTo(particle.x, particle.y)
              ctx.stroke()
              break

            case "hydrogen":
            case "helium":
              // Atomes avec électrons en orbite
              const atomSize = particle.size

              // Noyau
              ctx.fillStyle = particle.color.replace(")", `, ${opacity})`)
              ctx.beginPath()
              ctx.arc(particle.x, particle.y, atomSize * 0.3, 0, Math.PI * 2)
              ctx.fill()

              // Orbitales électroniques
              const electronCount = particle.type === "helium" ? 2 : 1
              for (let e = 0; e < electronCount; e++) {
                const orbitRadius = atomSize * (0.8 + e * 0.4)
                const electronAngle = time * 0.1 + index + e * Math.PI
                const electronX = particle.x + Math.cos(electronAngle) * orbitRadius
                const electronY = particle.y + Math.sin(electronAngle) * orbitRadius

                ctx.fillStyle = `rgba(100, 150, 255, ${opacity * 0.8})`
                ctx.beginPath()
                ctx.arc(electronX, electronY, 1, 0, Math.PI * 2)
                ctx.fill()
              }
              break

            default:
              // Particules subatomiques
              const quantumFluctuation = Math.sin(time * 0.2 + index * 0.3) * 0.2 + 0.8
              ctx.fillStyle = particle.color.replace(")", `, ${opacity * quantumFluctuation})`)
              ctx.beginPath()
              ctx.arc(particle.x, particle.y, particle.size * quantumFluctuation, 0, Math.PI * 2)
              ctx.fill()

              // Effet quantique - incertitude de Heisenberg
              if (particle.size < 2) {
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3 * quantumFluctuation})`
                ctx.beginPath()
                ctx.arc(
                    particle.x + (Math.random() - 0.5) * 4,
                    particle.y + (Math.random() - 0.5) * 4,
                    particle.size * 0.5,
                    0,
                    Math.PI * 2,
                )
                ctx.fill()
              }
          }

          ctx.restore()
        }

        // Supprimer les particules mortes
        if (
            lifeRatio >= 1 ||
            particle.x < -100 ||
            particle.x > canvas.width + 100 ||
            particle.y < -100 ||
            particle.y > canvas.height + 100
        ) {
          particles.splice(index, 1)
        }
      })

      // Animer les ondes gravitationnelles
      gravitationalWaves.forEach((wave, index) => {
        wave.radius += 15
        wave.intensity *= 0.98

        if (wave.intensity > 0.01) {
          // Distorsion de l'espace-temps
          ctx.save()
          ctx.strokeStyle = `rgba(138, 43, 226, ${wave.intensity * 0.3})`
          ctx.lineWidth = 2
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
          ctx.stroke()
          ctx.restore()
        } else {
          gravitationalWaves.splice(index, 1)
        }
      })

      // Animer les distorsions spatio-temporelles
      spaceTimeDistortions.forEach((distortion, index) => {
        distortion.age++
        distortion.radius += 2
        distortion.strength *= 0.95

        if (distortion.strength > 1) {
          // Effet de lentille gravitationnelle
          ctx.save()
          ctx.globalCompositeOperation = "screen"

          const lensGradient = ctx.createRadialGradient(
              distortion.x,
              distortion.y,
              0,
              distortion.x,
              distortion.y,
              distortion.radius,
          )
          lensGradient.addColorStop(0, `rgba(255, 255, 255, ${distortion.strength * 0.1})`)
          lensGradient.addColorStop(0.5, `rgba(100, 100, 255, ${distortion.strength * 0.05})`)
          lensGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = lensGradient
          ctx.beginPath()
          ctx.arc(distortion.x, distortion.y, distortion.radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        } else {
          spaceTimeDistortions.splice(index, 1)
        }
      })

      // Continuer l'animation ou transition
      if (time < 840) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Transition douce vers le système solaire
        setShowSystem(true)
        setTimeout(() => {
          setShowBigBang(false)
        }, 2000)
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
        {showBigBang && (
            <div className="fixed inset-0 z-50 bg-black">
              <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: "radial-gradient(circle, #0a0a0a 0%, #000000 100%)",
                    imageRendering: "auto",
                  }}
              />
            </div>
        )}

        {showSystem && (
            <div className={`transition-opacity duration-2000 ${showBigBang ? "opacity-0" : "opacity-100"}`}>
              <SolarSystem3D />
            </div>
        )}
      </main>
  )
}
