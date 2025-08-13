"use client"
import { AdvancedBlackHole } from "@/components/AdvancedBlackHole"
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

    return () => {
      document.removeEventListener("contextmenu", preventDefaultBehavior)
      document.removeEventListener("dragstart", preventDefaultBehavior)
      document.removeEventListener("selectstart", preventDefaultBehavior)
    }
  }, [])

  return (
      <main className="min-h-screen flex flex-col relative overflow-hidden">
        <AdvancedBlackHole />
      </main>
  )
}
