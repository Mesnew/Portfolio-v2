import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { SpaceNavIndicator } from "@/components/space-nav-indicator"
import { CosmicCursor } from "@/components/cosmic-cursor"
import React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mon Portfolio",
  description: "Portfolio professionnel avec mes projets et mon parcours",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={inter.className}>
        <React.Fragment>{children}</React.Fragment>
        <SpaceNavIndicator />
        <CosmicCursor />
      </body>
    </html>
  )
}
