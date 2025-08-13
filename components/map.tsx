"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"

interface MapProps {
  position: [number, number] // [latitude, longitude]
  zoom: number
  markerPosition: [number, number]
  popupContent?: string
}

export default function MapComponent({ position, zoom, markerPosition, popupContent }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Dynamically import Leaflet only on the client side
    import("leaflet").then((L) => {
      // Create map instance
      const map = L.map(mapRef.current!).setView(position, zoom)

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      // Create custom icon
      const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })

      // Add marker with popup
      const marker = L.marker(markerPosition, { icon }).addTo(map)

      if (popupContent) {
        marker.bindPopup(popupContent).openPopup()
      }

      // Cleanup function
      return () => {
        map.remove()
      }
    })
  }, [position, zoom, markerPosition, popupContent])

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />
}
