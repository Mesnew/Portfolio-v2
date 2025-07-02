"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Menu, Moon, Sun, X } from "lucide-react"
import { GlassPanel } from "@/components/glass-panel"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    closeMenu()
    router.push(href)
  }

  return (
      <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md bg-background/80" : ""}`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
                href="/"
                onClick={(e) => handleNavigation(e, "/")}
                className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              Mon Portfolio
            </a>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                  href="/"
                  onClick={(e) => handleNavigation(e, "/")}
                  className="text-foreground hover:text-primary transition-colors relative group"
              >
                Accueil
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                  href="/cv"
                  onClick={(e) => handleNavigation(e, "/cv")}
                  className="text-foreground hover:text-primary transition-colors relative group"
              >
                CV
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                  href="/laboratoire"
                  onClick={(e) => handleNavigation(e, "/laboratoire")}
                  className="text-foreground hover:text-primary transition-colors relative group"
              >
                Laboratoire
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                  href="/realisations"
                  onClick={(e) => handleNavigation(e, "/realisations")}
                  className="text-foreground hover:text-primary transition-colors relative group"
              >
                Réalisations
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                  href="/veille"
                  onClick={(e) => handleNavigation(e, "/veille")}
                  className="text-foreground hover:text-primary transition-colors relative group"
              >
                Veille
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                  href="/contact"
                  onClick={(e) => handleNavigation(e, "/contact")}
                  className="text-foreground hover:text-primary transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center space-x-4">
              {/* Bouton thème */}
              {mounted && (
                  <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="relative overflow-hidden"
                      aria-label={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
                  >
                    <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 transition-transform duration-300 hover:scale-100"></div>
                    {theme === "dark" ? (
                        <Sun className="h-5 w-5 relative z-10" />
                    ) : (
                        <Moon className="h-5 w-5 relative z-10" />
                    )}
                  </Button>
              )}

              {/* Bouton menu mobile */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Menu">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Menu mobile */}
          {isMenuOpen && (
              <GlassPanel className="md:hidden mt-4 p-6">
                <div className="flex flex-col space-y-4">
                  <a
                      href="/"
                      onClick={(e) => handleNavigation(e, "/")}
                      className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Accueil
                  </a>
                  <a
                      href="/cv"
                      onClick={(e) => handleNavigation(e, "/cv")}
                      className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    CV
                  </a>
                  <a
                      href="/laboratoire"
                      onClick={(e) => handleNavigation(e, "/laboratoire")}
                      className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Laboratoire
                  </a>
                  <a
                      href="/realisations"
                      onClick={(e) => handleNavigation(e, "/realisations")}
                      className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Réalisations
                  </a>
                  <a
                      href="/veille"
                      onClick={(e) => handleNavigation(e, "/veille")}
                      className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Veille
                  </a>
                  <a
                      href="/contact"
                      onClick={(e) => handleNavigation(e, "/contact")}
                      className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </GlassPanel>
          )}
        </nav>
      </header>
  )
}
