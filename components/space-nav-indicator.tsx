"use client"

import { usePathname } from "next/navigation"

export function SpaceNavIndicator() {
  const pathname = usePathname()

  // Ne plus afficher l'indicateur de navigation
  return null
}

