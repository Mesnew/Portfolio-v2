"use client"

import { SolarSystem3D } from "@/components/SolarSystem3D"
import { useEffect, useState } from "react"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [showSystem, setShowSystem] = useState(false)

  // Désactiver les comportements par défaut du navigateur qui pourraient interférer
  useEffect(() => {
    const preventDefaultBehavior = (e: Event) => {
      e.preventDefault()
    }

    // Empêcher le comportement par défaut pour les événements de souris et de toucher
    document.addEventListener("contextmenu", preventDefaultBehavior)
    document.addEventListener("dragstart", preventDefaultBehavior)
    document.addEventListener("selectstart", preventDefaultBehavior)

    // Afficher le système solaire après l'animation d'intro
    const timer = setTimeout(() => {
      setShowSystem(true)
      setTimeout(() => {
        setShowIntro(false)
      }, 1000)
    }, 3000)

    return () => {
      document.removeEventListener("contextmenu", preventDefaultBehavior)
      document.removeEventListener("dragstart", preventDefaultBehavior)
      document.removeEventListener("selectstart", preventDefaultBehavior)
      clearTimeout(timer)
    }
  }, [])

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {showIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">Mon Portfolio Spatial</h1>
            <p className="text-xl text-white/80">Bienvenue dans mon univers numérique</p>
            <div className="mt-8">
              <p className="text-white/60">Chargement du système solaire...</p>
              <div className="w-64 h-1 bg-gray-800 mt-2 mx-auto rounded-full overflow-hidden">
                <div className="h-full bg-primary w-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {showSystem && <SolarSystem3D />}
    </main>
  )
}

