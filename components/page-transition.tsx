"use client"

import { useEffect, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Vérifier si c'est le premier chargement de la session
    const hasVisitedBefore = sessionStorage.getItem("hasVisitedBefore")

    if (!hasVisitedBefore) {
      // Premier chargement de la session
      setIsFirstLoad(true)
      sessionStorage.setItem("hasVisitedBefore", "true")

      // Animation de chargement initial
      const timer = setTimeout(() => {
        setHasLoaded(true)
      }, 2500)

      return () => clearTimeout(timer)
    } else {
      // Navigation ultérieure
      setIsFirstLoad(false)
      setHasLoaded(true)
    }
  }, [])

  // Réinitialiser l'état si l'utilisateur recharge manuellement la page
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("hasVisitedBefore")
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [])

  if (!hasLoaded && isFirstLoad) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
          <h2 className="text-2xl font-bold text-white">Chargement de l'univers...</h2>
        </div>
      </div>
    )
  }

  return <div className="flex-grow">{children}</div>
}

