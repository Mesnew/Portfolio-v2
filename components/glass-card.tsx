import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function GlassCard({ children, className, glowColor = "rgba(0, 200, 255, 0.2)" }: GlassCardProps) {
  return (
    <div
      className={cn("relative rounded-xl overflow-hidden backdrop-blur-md border border-white/10 p-6", className)}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        boxShadow: `0 8px 32px 0 rgba(0,0,0,0.36), 0 0 20px ${glowColor}`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      {children}
    </div>
  )
}

