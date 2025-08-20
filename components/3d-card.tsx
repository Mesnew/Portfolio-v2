"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"

interface ThreeDCardProps {
  children: ReactNode
  className?: string
  glareColor?: string
  depth?: number
  onClick?: () => void
}

export function ThreeDCard({
  children,
  className = "",
  glareColor = "rgba(255, 255, 255, 0.1)",
  depth = 20,
  onClick,
}: ThreeDCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setRotate({
      x: -y * 15,
      y: x * 15,
    })

    setGlarePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPressed(false)
    setRotate({ x: 0, y: 0 })
  }

  const handleMouseDown = () => {
    setIsPressed(true)
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isPressed ? 0.98 : 1.05}, ${isPressed ? 0.98 : 1.05}, ${isPressed ? 0.98 : 1.05})`
          : "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
    >
      {children}

      {/* Enhanced glare effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}px ${glarePosition.y}px, ${glareColor} 0%, transparent 70%)`,
            opacity: isPressed ? 0.9 : 0.7,
          }}
        />
      )}

      {/* Pulse effect on hover */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none animate-pulse"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${glareColor} 50%, transparent 70%)`,
            opacity: 0.3,
          }}
        />
      )}

      {/* Enhanced shadow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          boxShadow: isHovered
            ? `0 ${depth * 1.5}px ${depth * 2}px rgba(0, 0, 0, 0.25), 0 0 ${depth}px rgba(59, 130, 246, 0.15)`
            : "0 5px 15px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  )
}
