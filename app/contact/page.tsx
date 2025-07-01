"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlanetBackground3D } from "@/components/PlanetBackground3D"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AtSign, MapPin } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

// Chargement dynamique de la carte pour éviter les erreurs SSR
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-black/30 rounded-lg flex items-center justify-center">
      <p className="text-white/70">Chargement de la carte...</p>
    </div>
  ),
})

export default function ContactPage() {
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    setMapLoaded(true)
  }, [])

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <PlanetBackground3D planetType="venus" />
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />

        <div className="container mx-auto px-4 flex-grow">
          <section className="py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">Contact</h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              N'hésitez pas à me contacter pour échanger sur un projet ou simplement pour discuter.
            </p>

            <div className="max-w-3xl mx-auto">
              <GlassCard>
                <CardHeader>
                  <CardTitle className="text-primary">Informations de contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <AtSign className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-primary">Email</h3>
                      <p className="text-muted-foreground">lilyangiraud@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-primary">Adresse</h3>
                      <p className="text-muted-foreground">173 Rue des Fougères, Bons-en-Chablais, France</p>
                    </div>
                  </div>

                  {mapLoaded && (
                    <div className="mt-6">
                      <h3 className="font-medium text-primary mb-2">Nous trouver</h3>
                      <div className="h-[400px] w-full overflow-hidden rounded-lg border border-white/10">
                        <MapComponent />
                      </div>
                    </div>
                  )}
                </CardContent>
              </GlassCard>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </main>
  )
}

