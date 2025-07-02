"use client"

import Link from "next/link"
import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
      <header className="bg-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            Your Logo
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/a-propos" className="hover:text-primary transition-colors">
              À Propos
            </Link>
            <Link href="/realisations" className="hover:text-primary transition-colors">
              Réalisations
            </Link>
            <Link href="/laboratoire" className="hover:text-primary transition-colors">
              Laboratoire
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile Navigation Button */}
          <button className="md:hidden text-gray-600 hover:text-primary focus:outline-none" onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
            className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white z-50 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <button
                className="absolute top-6 right-6 text-gray-600 hover:text-primary focus:outline-none"
                onClick={toggleMenu}
            >
              <FaTimes size={24} />
            </button>
            <Link href="/" className="text-2xl font-bold text-primary mb-4" onClick={toggleMenu}>
              Accueil
            </Link>
            <Link href="/a-propos" className="text-2xl font-bold text-primary mb-4" onClick={toggleMenu}>
              À Propos
            </Link>
            <Link href="/realisations" className="text-2xl font-bold text-primary mb-4" onClick={toggleMenu}>
              Réalisations
            </Link>
            <Link href="/laboratoire" className="text-2xl font-bold text-primary mb-4" onClick={toggleMenu}>
              Laboratoire
            </Link>
            <Link href="/contact" className="text-2xl font-bold text-primary mb-4" onClick={toggleMenu}>
              Contact
            </Link>
          </div>
        </div>
      </header>
  )
}

export default Header
