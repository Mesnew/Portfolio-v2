"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import L from "leaflet"

// Correction des icônes Leaflet qui ne fonctionnent pas correctement avec Next.js
const MapComponent = () => {
  const [mounted, setMounted] = useState(false)
  const position: [number, number] = [46.2738, 6.3475] // Nouvelles coordonnées ajustées pour le point rouge

  useEffect(() => {
    setMounted(true)

    // Correction des icônes Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }, [])

  if (!mounted) return null

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          <div className="text-black">
            <strong>Nicomatic</strong>
            <br />
            173 Rue des Fougères
            <br />
            Bons-en-Chablais, France
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapComponent
