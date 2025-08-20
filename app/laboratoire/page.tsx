"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlanetBackground3D } from "@/components/PlanetBackground3D"
import { EnhancedCosmicBackground } from "@/components/EnhancedCosmicBackground"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DrawingCanvas } from "@/components/drawing-canvas"
import {
  Palette,
  ImageIcon,
  Code,
  Eye,
  Zap,
  Download,
  Upload,
  Copy,
  RefreshCw,
  Sparkles,
  Grid3X3,
  Contrast,
  Mail,
  Regex,
  Database,
  Award,
  Smile,
  Paintbrush,
  Monitor,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react"

export default function LaboratoirePage() {
  // États pour le générateur de favicon
  const [faviconText, setFaviconText] = useState("A")
  const [faviconBgColor, setFaviconBgColor] = useState("#3b82f6")
  const [faviconTextColor, setFaviconTextColor] = useState("#ffffff")
  const [faviconSize, setFaviconSize] = useState([32])
  const [generatedFavicon, setGeneratedFavicon] = useState<string | null>(null)

  // États pour l'extracteur de couleurs
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [extractedColors, setExtractedColors] = useState<string[]>([])
  const imageInputRef = useRef<HTMLInputElement>(null)

  // États pour le générateur CSS
  const [cssProperty, setCssProperty] = useState("box-shadow")
  const [shadowX, setShadowX] = useState([0])
  const [shadowY, setShadowY] = useState([4])
  const [shadowBlur, setShadowBlur] = useState([8])
  const [shadowSpread, setShadowSpread] = useState([0])
  const [shadowColor, setShadowColor] = useState("#000000")
  const [shadowOpacity, setShadowOpacity] = useState([25])
  const [generatedCSS, setGeneratedCSS] = useState("")

  // États pour le simulateur de daltonisme
  const [colorToTest, setColorToTest] = useState("#ff0000")
  const [daltonismType, setDaltonismType] = useState("protanopia")
  const [simulatedColor, setSimulatedColor] = useState("#ff0000")

  // États pour le générateur de patterns
  const [patternType, setPatternType] = useState("dots")
  const [patternSize, setPatternSize] = useState([20])
  const [patternColor1, setPatternColor1] = useState("#3b82f6")
  const [patternColor2, setPatternColor2] = useState("#ffffff")
  const [generatedPattern, setGeneratedPattern] = useState("")

  // États pour le calculateur de contraste
  const [contrastColor1, setContrastColor1] = useState("#000000")
  const [contrastColor2, setContrastColor2] = useState("#ffffff")
  const [contrastRatio, setContrastRatio] = useState(0)
  const [contrastLevel, setContrastLevel] = useState("")

  // États pour le générateur de mockup
  const [mockupDevice, setMockupDevice] = useState("iphone")
  const [mockupUrl, setMockupUrl] = useState("https://example.com")
  const [mockupBackground, setMockupBackground] = useState("#f3f4f6")

  // États pour le pixel art
  const [pixelGridSize, setPixelGridSize] = useState([16])
  const [pixelColor, setPixelColor] = useState("#000000")
  const [pixelGrid, setPixelGrid] = useState<string[][]>([])
  const pixelCanvasRef = useRef<HTMLCanvasElement>(null)

  // États pour la signature email
  const [signatureName, setSignatureName] = useState("")
  const [signatureTitle, setSignatureTitle] = useState("")
  const [signatureCompany, setSignatureCompany] = useState("")
  const [signatureEmail, setSignatureEmail] = useState("")
  const [signaturePhone, setSignaturePhone] = useState("")
  const [signatureWebsite, setSignatureWebsite] = useState("")
  const [generatedSignature, setGeneratedSignature] = useState("")

  // États pour le générateur de regex
  const [regexPattern, setRegexPattern] = useState("")
  const [regexFlags, setRegexFlags] = useState("g")
  const [regexTestString, setRegexTestString] = useState("")
  const [regexMatches, setRegexMatches] = useState<string[]>([])
  const [regexValid, setRegexValid] = useState(true)

  // États pour le convertisseur de données
  const [dataInput, setDataInput] = useState("")
  const [dataInputFormat, setDataInputFormat] = useState("json")
  const [dataOutputFormat, setDataOutputFormat] = useState("csv")
  const [convertedData, setConvertedData] = useState("")

  // États pour le générateur de certificats
  const [certName, setCertName] = useState("")
  const [certCourse, setCertCourse] = useState("")
  const [certDate, setCertDate] = useState("")
  const [certInstructor, setCertInstructor] = useState("")
  const [certTemplate, setCertTemplate] = useState("modern")

  // États pour le générateur de memes
  const [memeTemplate, setMemeTemplate] = useState("drake")
  const [memeTopText, setMemeTopText] = useState("")
  const [memeBottomText, setMemeBottomText] = useState("")
  const [memeMiddleText, setMemeMiddleText] = useState("")
  const [memeTextSize, setMemeTextSize] = useState([24])
  const [memeTextColor, setMemeTextColor] = useState("#ffffff")
  const [memeTextStroke, setMemeTextStroke] = useState("#000000")
  const [memeCustomImage, setMemeCustomImage] = useState<string | null>(null)
  const memeCanvasRef = useRef<HTMLCanvasElement>(null)
  const memeImageInputRef = useRef<HTMLInputElement>(null)

  // États pour l'analyseur de performance
  const [perfUrl, setPerfUrl] = useState("")
  const [perfMetrics, setPerfMetrics] = useState<any>(null)

  // Fonction pour générer un favicon
  const generateFavicon = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const size = faviconSize[0]

    canvas.width = size
    canvas.height = size

    if (ctx) {
      // Background
      ctx.fillStyle = faviconBgColor
      ctx.fillRect(0, 0, size, size)

      // Text
      ctx.fillStyle = faviconTextColor
      ctx.font = `bold ${size * 0.6}px Arial`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(faviconText, size / 2, size / 2)

      setGeneratedFavicon(canvas.toDataURL())
    }
  }

  // Fonction pour extraire les couleurs d'une image
  const extractColorsFromImage = (imageFile: File) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      if (imageData) {
        const colors = new Map<string, number>()

        // Échantillonner les pixels (tous les 10 pixels pour la performance)
        for (let i = 0; i < imageData.data.length; i += 40) {
          const r = imageData.data[i]
          const g = imageData.data[i + 1]
          const b = imageData.data[i + 2]
          const alpha = imageData.data[i + 3]

          if (alpha > 128) {
            // Ignorer les pixels transparents
            const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
              .toString(16)
              .padStart(2, "0")}`
            colors.set(hex, (colors.get(hex) || 0) + 1)
          }
        }

        // Trier par fréquence et prendre les 8 couleurs les plus communes
        const sortedColors = Array.from(colors.entries())
          .sort(([, a], [, b]) => b - a)
          .slice(0, 8)
          .map(([color]) => color)

        setExtractedColors(sortedColors)
      }
    }

    img.src = URL.createObjectURL(imageFile)
    setUploadedImage(img.src)
  }

  // Fonction pour générer du CSS
  const generateCSS = () => {
    let css = ""
    const opacity = shadowOpacity[0] / 100

    switch (cssProperty) {
      case "box-shadow":
        css = `box-shadow: ${shadowX[0]}px ${shadowY[0]}px ${shadowBlur[0]}px ${shadowSpread[0]}px ${shadowColor}${Math.round(
          opacity * 255,
        )
          .toString(16)
          .padStart(2, "0")};`
        break
      case "text-shadow":
        css = `text-shadow: ${shadowX[0]}px ${shadowY[0]}px ${shadowBlur[0]}px ${shadowColor}${Math.round(opacity * 255)
          .toString(16)
          .padStart(2, "0")};`
        break
      case "border-radius":
        css = `border-radius: ${shadowX[0]}px;`
        break
    }

    setGeneratedCSS(css)
  }

  // Fonction pour simuler le daltonisme
  const simulateDaltonism = () => {
    const hex = colorToTest
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)

    let newR = r,
      newG = g,
      newB = b

    switch (daltonismType) {
      case "protanopia": // Rouge-vert (absence de cônes L)
        newR = 0.567 * r + 0.433 * g
        newG = 0.558 * r + 0.442 * g
        newB = 0.242 * g + 0.758 * b
        break
      case "deuteranopia": // Rouge-vert (absence de cônes M)
        newR = 0.625 * r + 0.375 * g
        newG = 0.7 * r + 0.3 * g
        newB = 0.3 * g + 0.7 * b
        break
      case "tritanopia": // Bleu-jaune (absence de cônes S)
        newR = 0.95 * r + 0.05 * g
        newG = 0.433 * g + 0.567 * b
        newB = 0.475 * g + 0.525 * b
        break
    }

    const simulated = `#${Math.round(newR).toString(16).padStart(2, "0")}${Math.round(newG)
      .toString(16)
      .padStart(2, "0")}${Math.round(newB).toString(16).padStart(2, "0")}`

    setSimulatedColor(simulated)
  }

  // Fonction pour générer des patterns SVG
  const generatePattern = () => {
    const size = patternSize[0]
    let svg = ""

    switch (patternType) {
      case "dots":
        svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${size}" height="${size}" fill="${patternColor2}"/>
          <circle cx="${size / 2}" cy="${size / 2}" r="${size / 6}" fill="${patternColor1}"/>
        </svg>`
        break
      case "stripes":
        svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${size}" height="${size}" fill="${patternColor2}"/>
          <rect width="${size / 2}" height="${size}" fill="${patternColor1}"/>
        </svg>`
        break
      case "grid":
        svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${size}" height="${size}" fill="${patternColor2}"/>
          <rect width="${size - 2}" height="${size - 2}" x="1" y="1" fill="${patternColor1}"/>
        </svg>`
        break
    }

    const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`
    setGeneratedPattern(dataUrl)
  }

  // Fonction pour calculer le contraste
  const calculateContrast = () => {
    const getLuminance = (hex: string) => {
      const r = Number.parseInt(hex.slice(1, 3), 16) / 255
      const g = Number.parseInt(hex.slice(3, 5), 16) / 255
      const b = Number.parseInt(hex.slice(5, 7), 16) / 255

      const sRGB = [r, g, b].map((c) => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      })

      return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
    }

    const lum1 = getLuminance(contrastColor1)
    const lum2 = getLuminance(contrastColor2)
    const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05)

    setContrastRatio(Math.round(ratio * 100) / 100)

    if (ratio >= 7) setContrastLevel("AAA")
    else if (ratio >= 4.5) setContrastLevel("AA")
    else if (ratio >= 3) setContrastLevel("AA Large")
    else setContrastLevel("Fail")
  }

  // Fonction pour initialiser la grille de pixel art
  const initPixelGrid = () => {
    const size = pixelGridSize[0]
    const grid = Array(size)
      .fill(null)
      .map(() => Array(size).fill("#ffffff"))
    setPixelGrid(grid)
  }

  // Fonction pour dessiner un pixel
  const drawPixel = (row: number, col: number) => {
    const newGrid = [...pixelGrid]
    newGrid[row][col] = pixelColor
    setPixelGrid(newGrid)
  }

  // Fonction pour générer la signature email
  const generateEmailSignature = () => {
    const signature = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
        <div style="margin-bottom: 10px;">
          <strong style="font-size: 16px; color: #2563eb;">${signatureName}</strong><br>
          <span style="color: #666;">${signatureTitle}</span><br>
          <span style="color: #666;">${signatureCompany}</span>
        </div>
        <div style="border-top: 2px solid #2563eb; padding-top: 10px;">
          <div style="margin-bottom: 5px;">
            📧 <a href="mailto:${signatureEmail}" style="color: #2563eb; text-decoration: none;">${signatureEmail}</a>
          </div>
          ${
            signaturePhone
              ? `<div style="margin-bottom: 5px;">📞 <span style="color: #666;">${signaturePhone}</span></div>`
              : ""
          }
          ${
            signatureWebsite
              ? `<div>🌐 <a href="${signatureWebsite}" style="color: #2563eb; text-decoration: none;">${signatureWebsite}</a></div>`
              : ""
          }
        </div>
      </div>
    `
    setGeneratedSignature(signature)
  }

  // Fonction pour tester les regex
  const testRegex = () => {
    try {
      const regex = new RegExp(regexPattern, regexFlags)
      const matches = regexTestString.match(regex) || []
      setRegexMatches(matches)
      setRegexValid(true)
    } catch (error) {
      setRegexValid(false)
      setRegexMatches([])
    }
  }

  // Fonction pour convertir les données
  const convertData = () => {
    try {
      let parsedData: any

      // Parse input
      switch (dataInputFormat) {
        case "json":
          parsedData = JSON.parse(dataInput)
          break
        case "csv":
          const lines = dataInput.trim().split("\n")
          const headers = lines[0].split(",")
          parsedData = lines.slice(1).map((line) => {
            const values = line.split(",")
            const obj: any = {}
            headers.forEach((header, index) => {
              obj[header.trim()] = values[index]?.trim()
            })
            return obj
          })
          break
      }

      // Convert to output format
      let output = ""
      switch (dataOutputFormat) {
        case "json":
          output = JSON.stringify(parsedData, null, 2)
          break
        case "csv":
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            const headers = Object.keys(parsedData[0])
            output = headers.join(",") + "\n"
            output += parsedData.map((row) => headers.map((header) => row[header]).join(",")).join("\n")
          }
          break
        case "yaml":
          output = convertToYAML(parsedData)
          break
      }

      setConvertedData(output)
    } catch (error) {
      setConvertedData("Erreur de conversion")
    }
  }

  // Fonction utilitaire pour convertir en YAML (simple)
  const convertToYAML = (obj: any, indent = 0): string => {
    const spaces = "  ".repeat(indent)
    if (Array.isArray(obj)) {
      return obj.map((item) => `${spaces}- ${convertToYAML(item, indent + 1)}`).join("\n")
    } else if (typeof obj === "object" && obj !== null) {
      return Object.entries(obj)
        .map(([key, value]) => `${spaces}${key}: ${convertToYAML(value, indent + 1)}`)
        .join("\n")
    }
    return String(obj)
  }

  // Fonction pour simuler l'analyse de performance
  const analyzePerformance = () => {
    // Simulation de métriques de performance
    const metrics = {
      fcp: Math.random() * 2 + 1, // First Contentful Paint
      lcp: Math.random() * 3 + 2, // Largest Contentful Paint
      fid: Math.random() * 100 + 50, // First Input Delay
      cls: Math.random() * 0.1, // Cumulative Layout Shift
      ttfb: Math.random() * 500 + 200, // Time to First Byte
      score: Math.floor(Math.random() * 40 + 60), // Score global
    }
    setPerfMetrics(metrics)
  }

  // Fonction pour générer un meme
  const generateMeme = () => {
    const canvas = memeCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 500
    canvas.height = 500

    // Configuration du texte
    const fontSize = memeTextSize[0]
    ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`
    ctx.textAlign = "center"
    ctx.fillStyle = memeTextColor
    ctx.strokeStyle = memeTextStroke
    ctx.lineWidth = 2

    // Fonction pour dessiner du texte avec contour
    const drawText = (text: string, x: number, y: number, maxWidth?: number) => {
      if (text) {
        ctx.strokeText(text, x, y, maxWidth)
        ctx.fillText(text, x, y, maxWidth)
      }
    }

    // Templates de memes
    switch (memeTemplate) {
      case "drake":
        // Background
        ctx.fillStyle = "#f3f4f6"
        ctx.fillRect(0, 0, 500, 500)

        // Zones
        ctx.fillStyle = "#e5e7eb"
        ctx.fillRect(0, 0, 250, 250)
        ctx.fillRect(0, 250, 250, 250)

        ctx.fillStyle = "#ffffff"
        ctx.fillRect(250, 0, 250, 250)
        ctx.fillRect(250, 250, 250, 250)

        // Drake emojis
        ctx.font = "60px Arial"
        ctx.fillStyle = "#000000"
        ctx.fillText("🙅‍♂️", 125, 140)
        ctx.fillText("👉", 125, 390)

        // Texte
        ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`
        ctx.fillStyle = memeTextColor
        drawText(memeTopText, 375, 125, 200)
        drawText(memeBottomText, 375, 375, 200)
        break

      case "distracted":
        // Background
        ctx.fillStyle = "#87CEEB"
        ctx.fillRect(0, 0, 500, 500)

        // Personnages simplifiés
        ctx.fillStyle = "#FFB6C1"
        ctx.fillRect(50, 200, 80, 150) // Girlfriend
        ctx.fillStyle = "#87CEFA"
        ctx.fillRect(200, 180, 80, 170) // Boyfriend
        ctx.fillStyle = "#FFB6C1"
        ctx.fillRect(350, 190, 80, 160) // Other woman

        // Visages
        ctx.fillStyle = "#000000"
        ctx.font = "30px Arial"
        ctx.fillText("😠", 90, 230)
        ctx.fillText("😍", 240, 210)
        ctx.fillText("😏", 390, 220)

        // Labels
        drawText(memeTopText, 90, 400, 150) // Girlfriend
        drawText(memeMiddleText, 240, 400, 150) // Boyfriend
        drawText(memeBottomText, 390, 400, 150) // Other woman
        break

      case "woman-cat":
        // Background
        ctx.fillStyle = "#f0f0f0"
        ctx.fillRect(0, 0, 500, 500)

        // Table
        ctx.fillStyle = "#8B4513"
        ctx.fillRect(0, 350, 500, 150)

        // Woman (left side)
        ctx.fillStyle = "#FFB6C1"
        ctx.fillRect(50, 150, 100, 200)
        ctx.fillStyle = "#000000"
        ctx.font = "40px Arial"
        ctx.fillText("😤", 100, 200)

        // Pointing finger
        ctx.font = "60px Arial"
        ctx.fillText("👉", 180, 250)

        // Cat (right side)
        ctx.fillStyle = "#FFA500"
        ctx.fillRect(350, 200, 100, 150)
        ctx.font = "50px Arial"
        ctx.fillText("😼", 400, 250)

        // Plate
        ctx.fillStyle = "#FFFFFF"
        ctx.beginPath()
        ctx.arc(400, 320, 30, 0, 2 * Math.PI)
        ctx.fill()

        // Text
        drawText(memeTopText, 250, 100, 400)
        drawText(memeBottomText, 250, 450, 400)
        break

      case "this-is-fine":
        // Background (room on fire)
        ctx.fillStyle = "#FF4500"
        ctx.fillRect(0, 0, 500, 500)

        // Table
        ctx.fillStyle = "#8B4513"
        ctx.fillRect(0, 300, 500, 200)

        // Dog
        ctx.fillStyle = "#DEB887"
        ctx.fillRect(200, 200, 100, 100)
        ctx.fillStyle = "#000000"
        ctx.font = "40px Arial"
        ctx.fillText("🐕", 250, 240)

        // Coffee cup
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(320, 280, 30, 40)
        ctx.fillStyle = "#8B4513"
        ctx.fillRect(325, 285, 20, 30)

        // Fire effects
        ctx.font = "30px Arial"
        ctx.fillText("🔥", 100, 150)
        ctx.fillText("🔥", 400, 120)
        ctx.fillText("🔥", 50, 200)
        ctx.fillText("🔥", 450, 180)

        drawText(memeTopText, 250, 50, 400)
        drawText(memeBottomText, 250, 450, 400)
        break

      case "expanding-brain":
        // Background
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, 500, 500)

        // Four panels
        const panels = [
          { y: 0, brain: "🧠", glow: "#666666" },
          { y: 125, brain: "🧠", glow: "#FFD700" },
          { y: 250, brain: "🧠", glow: "#FF69B4" },
          { y: 375, brain: "🧠", glow: "#00FFFF" },
        ]

        panels.forEach((panel, index) => {
          // Panel background
          ctx.fillStyle = panel.glow
          ctx.fillRect(0, panel.y, 500, 125)

          // Brain
          ctx.font = "60px Arial"
          ctx.fillStyle = "#000000"
          ctx.fillText(panel.brain, 80, panel.y + 80)

          // Text area
          ctx.fillStyle = "rgba(255,255,255,0.9)"
          ctx.fillRect(150, panel.y + 10, 340, 105)
        })

        // Add text (you'd need to split memeTopText into 4 parts)
        const texts = [memeTopText, memeMiddleText, memeBottomText, "Final form"].slice(0, 4)
        texts.forEach((text, index) => {
          ctx.fillStyle = "#000000"
          ctx.font = `bold ${Math.max(16, fontSize - 8)}px Impact, Arial Black, sans-serif`
          drawText(text, 320, panels[index].y + 70, 320)
        })
        break

      case "two-buttons":
        // Background
        ctx.fillStyle = "#87CEEB"
        ctx.fillRect(0, 0, 500, 500)

        // Person
        ctx.fillStyle = "#FFB6C1"
        ctx.fillRect(200, 200, 100, 200)
        ctx.fillStyle = "#000000"
        ctx.font = "40px Arial"
        ctx.fillText("😰", 250, 240)

        // Buttons
        ctx.fillStyle = "#FF0000"
        ctx.fillRect(100, 100, 120, 60)
        ctx.fillStyle = "#0000FF"
        ctx.fillRect(280, 100, 120, 60)

        // Button labels
        ctx.fillStyle = "#FFFFFF"
        ctx.font = `bold ${Math.max(12, fontSize - 12)}px Arial`
        drawText(memeTopText, 160, 135, 100)
        drawText(memeBottomText, 340, 135, 100)

        // Sweat
        ctx.font = "20px Arial"
        ctx.fillText("💧", 280, 200)
        break

      case "change-my-mind":
        // Background (park/campus)
        ctx.fillStyle = "#90EE90"
        ctx.fillRect(0, 0, 500, 500)

        // Table
        ctx.fillStyle = "#8B4513"
        ctx.fillRect(100, 250, 300, 150)

        // Sign on table
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(150, 200, 200, 100)
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 2
        ctx.strokeRect(150, 200, 200, 100)

        // Person behind table
        ctx.fillStyle = "#FFB6C1"
        ctx.fillRect(220, 150, 60, 100)
        ctx.fillStyle = "#000000"
        ctx.font = "30px Arial"
        ctx.fillText("🧔", 250, 180)

        // Text on sign
        ctx.fillStyle = "#000000"
        ctx.font = `bold ${Math.max(14, fontSize - 10)}px Arial`
        drawText(memeTopText, 250, 240, 180)
        drawText("CHANGE MY MIND", 250, 270, 180)

        drawText(memeBottomText, 250, 450, 400)
        break

      case "stonks":
        // Background
        ctx.fillStyle = "#000080"
        ctx.fillRect(0, 0, 500, 500)

        // Graph arrow going up
        ctx.strokeStyle = "#00FF00"
        ctx.lineWidth = 8
        ctx.beginPath()
        ctx.moveTo(50, 400)
        ctx.lineTo(200, 300)
        ctx.lineTo(350, 150)
        ctx.lineTo(450, 100)
        ctx.stroke()

        // Arrow head
        ctx.fillStyle = "#00FF00"
        ctx.beginPath()
        ctx.moveTo(450, 100)
        ctx.lineTo(430, 110)
        ctx.lineTo(430, 90)
        ctx.closePath()
        ctx.fill()

        // Meme man
        ctx.fillStyle = "#FFB6C1"
        ctx.fillRect(200, 300, 100, 150)
        ctx.fillStyle = "#000000"
        ctx.font = "40px Arial"
        ctx.fillText("📈", 250, 340)

        // STONKS text
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "bold 48px Impact"
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 3
        drawText("STONKS", 250, 200)

        drawText(memeTopText, 250, 50, 400)
        drawText(memeBottomText, 250, 480, 400)
        break

      case "surprised-pikachu":
        // Background
        ctx.fillStyle = "#FFFF99"
        ctx.fillRect(0, 0, 500, 500)

        // Pikachu body (simplified)
        ctx.fillStyle = "#FFD700"
        ctx.beginPath()
        ctx.arc(250, 300, 120, 0, 2 * Math.PI)
        ctx.fill()

        // Face
        ctx.fillStyle = "#000000"
        ctx.font = "80px Arial"
        ctx.fillText("😲", 250, 280)

        // Ears
        ctx.fillStyle = "#FFD700"
        ctx.beginPath()
        ctx.moveTo(180, 200)
        ctx.lineTo(160, 120)
        ctx.lineTo(220, 150)
        ctx.closePath()
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(320, 200)
        ctx.lineTo(340, 120)
        ctx.lineTo(280, 150)
        ctx.closePath()
        ctx.fill()

        // Ear tips
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(170, 130, 10, 0, 2 * Math.PI)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(330, 130, 10, 0, 2 * Math.PI)
        ctx.fill()

        drawText(memeTopText, 250, 80, 400)
        drawText(memeBottomText, 250, 480, 400)
        break

      case "galaxy-brain":
        // Background
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, 500, 500)

        // Cosmic background
        ctx.fillStyle = "#4B0082"
        for (let i = 0; i < 50; i++) {
          ctx.beginPath()
          ctx.arc(Math.random() * 500, Math.random() * 500, Math.random() * 2, 0, 2 * Math.PI)
          ctx.fill()
        }

        // Giant glowing brain
        ctx.fillStyle = "#00FFFF"
        ctx.shadowColor = "#00FFFF"
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.arc(250, 250, 150, 0, 2 * Math.PI)
        ctx.fill()

        // Brain details
        ctx.shadowBlur = 0
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "120px Arial"
        ctx.fillText("🧠", 250, 280)

        // Cosmic effects
        ctx.fillStyle = "#FFD700"
        ctx.font = "30px Arial"
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI * 2) / 8
          const x = 250 + Math.cos(angle) * 200
          const y = 250 + Math.sin(angle) * 200
          ctx.fillText("✨", x, y)
        }

        drawText(memeTopText, 250, 80, 400)
        drawText(memeBottomText, 250, 450, 400)
        break

      case "custom":
        if (memeCustomImage) {
          const img = new Image()
          img.onload = () => {
            ctx.drawImage(img, 0, 0, 500, 500)
            // Add text overlay
            drawText(memeTopText, 250, 80, 400)
            drawText(memeBottomText, 250, 450, 400)
          }
          img.src = memeCustomImage
        } else {
          // Default custom template
          ctx.fillStyle = "#f3f4f6"
          ctx.fillRect(0, 0, 500, 500)
          ctx.fillStyle = "#666666"
          ctx.font = "48px Arial"
          ctx.fillText("📷", 250, 250)
          drawText("Upload your image", 250, 300, 400)
          drawText(memeTopText, 250, 80, 400)
          drawText(memeBottomText, 250, 450, 400)
        }
        break

      default:
        // Default template
        ctx.fillStyle = "#f3f4f6"
        ctx.fillRect(0, 0, 500, 500)
        drawText(memeTopText, 250, 100, 400)
        drawText(memeBottomText, 250, 400, 400)
    }
  }

  // Fonction pour copier dans le presse-papiers
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Fonction pour télécharger un fichier
  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  // Initialiser la grille de pixel art au chargement
  useEffect(() => {
    initPixelGrid()
  }, [pixelGridSize])

  return (
    <div className="min-h-screen flex flex-col">
      <PlanetBackground3D planetType="jupiter" />
      <EnhancedCosmicBackground />
      <Header />

      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Laboratoire Créatif
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Outils uniques et innovants pour créateurs et développeurs
            </p>
          </div>

          <Tabs defaultValue="design" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="design" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Design
              </TabsTrigger>
              <TabsTrigger value="dev" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Dev Tools
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Média
              </TabsTrigger>
              <TabsTrigger value="productivity" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Productivité
              </TabsTrigger>
              <TabsTrigger value="fun" className="flex items-center gap-2">
                <Smile className="h-4 w-4" />
                Fun
              </TabsTrigger>
            </TabsList>

            {/* Onglet Design */}
            <TabsContent value="design" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Générateur de Favicon */}
                <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] hover:border-primary/30">
                  <CardHeader className="group-hover:bg-primary/5 transition-colors duration-300">
                    <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                      <Star className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      Générateur de Favicon
                    </CardTitle>
                    <CardDescription>Créez des favicons personnalisés</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Texte</Label>
                        <Input
                          value={faviconText}
                          onChange={(e) => setFaviconText(e.target.value.slice(0, 2))}
                          placeholder="A"
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <Label>Taille: {faviconSize[0]}px</Label>
                        <Slider value={faviconSize} onValueChange={setFaviconSize} max={64} min={16} step={8} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Couleur de fond</Label>
                        <input
                          type="color"
                          value={faviconBgColor}
                          onChange={(e) => setFaviconBgColor(e.target.value)}
                          className="w-full h-10 rounded border cursor-pointer"
                        />
                      </div>
                      <div>
                        <Label>Couleur du texte</Label>
                        <input
                          type="color"
                          value={faviconTextColor}
                          onChange={(e) => setFaviconTextColor(e.target.value)}
                          className="w-full h-10 rounded border cursor-pointer"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={generateFavicon}
                      className="w-full group/btn hover:scale-105 transition-all duration-200"
                    >
                      <Sparkles className="h-4 w-4 mr-2 group-hover/btn:animate-spin" />
                      Générer Favicon
                    </Button>

                    {generatedFavicon && (
                      <div className="space-y-2">
                        <div className="flex justify-center p-4 bg-muted rounded">
                          <img src={generatedFavicon || "/placeholder.svg"} alt="Favicon généré" className="border" />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const link = document.createElement("a")
                            link.download = "favicon.png"
                            link.href = generatedFavicon
                            link.click()
                          }}
                          className="w-full"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Extracteur de couleurs */}
                <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] hover:border-primary/30">
                  <CardHeader className="group-hover:bg-primary/5 transition-colors duration-300">
                    <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                      <Eye className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      Extracteur de couleurs
                    </CardTitle>
                    <CardDescription>Extrayez la palette d'une image</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Sélectionner une image</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) extractColorsFromImage(file)
                        }}
                        ref={imageInputRef}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => imageInputRef.current?.click()}
                        className="w-full mt-2 hover:scale-105 transition-all duration-200"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choisir une image
                      </Button>
                    </div>

                    {uploadedImage && (
                      <div className="space-y-2">
                        <img
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Image uploadée"
                          className="w-full max-h-32 object-contain rounded border"
                        />
                      </div>
                    )}

                    {extractedColors.length > 0 && (
                      <div className="space-y-2">
                        <Label>Couleurs extraites</Label>
                        <div className="grid grid-cols-4 gap-2">
                          {extractedColors.map((color, index) => (
                            <div
                              key={index}
                              className="aspect-square rounded cursor-pointer border-2 border-transparent hover:border-white hover:scale-110 transition-all duration-200 relative group shadow-lg"
                              style={{ backgroundColor: color }}
                              onClick={() => copyToClipboard(color)}
                              title={color}
                            >
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/20 rounded">
                                <Copy className="h-4 w-4 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">Cliquez pour copier</div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Générateur CSS */}
                <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] hover:border-primary/30">
                  <CardHeader className="group-hover:bg-primary/5 transition-colors duration-300">
                    <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                      <Code className="h-5 w-5 group-hover:rotate-6 transition-transform duration-300" />
                      Générateur CSS
                    </CardTitle>
                    <CardDescription>Créez des effets CSS visuellement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Propriété CSS</Label>
                      <Select value={cssProperty} onValueChange={setCssProperty}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="box-shadow">Box Shadow</SelectItem>
                          <SelectItem value="text-shadow">Text Shadow</SelectItem>
                          <SelectItem value="border-radius">Border Radius</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {cssProperty.includes("shadow") && (
                      <>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>X: {shadowX[0]}px</Label>
                            <Slider value={shadowX} onValueChange={setShadowX} max={50} min={-50} step={1} />
                          </div>
                          <div>
                            <Label>Y: {shadowY[0]}px</Label>
                            <Slider value={shadowY} onValueChange={setShadowY} max={50} min={-50} step={1} />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Blur: {shadowBlur[0]}px</Label>
                            <Slider value={shadowBlur} onValueChange={setShadowBlur} max={50} min={0} step={1} />
                          </div>
                          {cssProperty === "box-shadow" && (
                            <div>
                              <Label>Spread: {shadowSpread[0]}px</Label>
                              <Slider
                                value={shadowSpread}
                                onValueChange={setShadowSpread}
                                max={50}
                                min={-50}
                                step={1}
                              />
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Couleur</Label>
                            <input
                              type="color"
                              value={shadowColor}
                              onChange={(e) => setShadowColor(e.target.value)}
                              className="w-full h-10 rounded border cursor-pointer"
                            />
                          </div>
                          <div>
                            <Label>Opacité: {shadowOpacity[0]}%</Label>
                            <Slider value={shadowOpacity} onValueChange={setShadowOpacity} max={100} min={0} step={5} />
                          </div>
                        </div>
                      </>
                    )}

                    <Button onClick={generateCSS} className="w-full hover:scale-105 transition-all duration-200">
                      <Code className="h-4 w-4 mr-2" />
                      Générer CSS
                    </Button>

                    {generatedCSS && (
                      <div className="space-y-2">
                        <div
                          className="w-full h-20 bg-white border rounded flex items-center justify-center"
                          style={{
                            boxShadow:
                              cssProperty === "box-shadow"
                                ? `${shadowX[0]}px ${shadowY[0]}px ${shadowBlur[0]}px ${shadowSpread[0]}px ${shadowColor}${Math.round(
                                    (shadowOpacity[0] / 100) * 255,
                                  )
                                    .toString(16)
                                    .padStart(2, "0")}`
                                : undefined,
                            textShadow:
                              cssProperty === "text-shadow"
                                ? `${shadowX[0]}px ${shadowY[0]}px ${shadowBlur[0]}px ${shadowColor}${Math.round(
                                    (shadowOpacity[0] / 100) * 255,
                                  )
                                    .toString(16)
                                    .padStart(2, "0")}`
                                : undefined,
                          }}
                        >
                          <span className="text-lg font-bold">Aperçu</span>
                        </div>
                        <Textarea value={generatedCSS} readOnly className="font-mono text-sm" rows={2} />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(generatedCSS)}
                          className="w-full hover:scale-105 transition-all duration-200"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copier CSS
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Simulateur de daltonisme */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Simulateur de daltonisme
                    </CardTitle>
                    <CardDescription>Testez l'accessibilité des couleurs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Couleur à tester</Label>
                      <input
                        type="color"
                        value={colorToTest}
                        onChange={(e) => setColorToTest(e.target.value)}
                        className="w-full h-12 rounded border cursor-pointer"
                      />
                    </div>

                    <div>
                      <Label>Type de daltonisme</Label>
                      <Select value={daltonismType} onValueChange={setDaltonismType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="protanopia">Protanopie (Rouge-Vert)</SelectItem>
                          <SelectItem value="deuteranopia">Deutéranopie (Rouge-Vert)</SelectItem>
                          <SelectItem value="tritanopia">Tritanopie (Bleu-Jaune)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={simulateDaltonism} className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Simuler
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center">
                        <Label className="text-sm">Couleur originale</Label>
                        <div className="w-full h-16 rounded border mt-1" style={{ backgroundColor: colorToTest }} />
                        <div className="text-xs mt-1 font-mono">{colorToTest}</div>
                      </div>
                      <div className="text-center">
                        <Label className="text-sm">Vue daltonienne</Label>
                        <div className="w-full h-16 rounded border mt-1" style={{ backgroundColor: simulatedColor }} />
                        <div className="text-xs mt-1 font-mono">{simulatedColor}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Générateur de patterns */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Grid3X3 className="h-5 w-5" />
                      Générateur de patterns
                    </CardTitle>
                    <CardDescription>Créez des motifs SVG répétables</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Type de motif</Label>
                        <Select value={patternType} onValueChange={setPatternType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dots">Points</SelectItem>
                            <SelectItem value="stripes">Rayures</SelectItem>
                            <SelectItem value="grid">Grille</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Taille: {patternSize[0]}px</Label>
                        <Slider value={patternSize} onValueChange={setPatternSize} max={100} min={10} step={5} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Couleur 1</Label>
                        <input
                          type="color"
                          value={patternColor1}
                          onChange={(e) => setPatternColor1(e.target.value)}
                          className="w-full h-10 rounded border cursor-pointer"
                        />
                      </div>
                      <div>
                        <Label>Couleur 2</Label>
                        <input
                          type="color"
                          value={patternColor2}
                          onChange={(e) => setPatternColor2(e.target.value)}
                          className="w-full h-10 rounded border cursor-pointer"
                        />
                      </div>
                    </div>

                    <Button onClick={generatePattern} className="w-full">
                      <Grid3X3 className="h-4 w-4 mr-2" />
                      Générer Pattern
                    </Button>

                    {generatedPattern && (
                      <div className="space-y-2">
                        <div
                          className="w-full h-32 rounded border"
                          style={{
                            backgroundImage: `url(${generatedPattern})`,
                            backgroundRepeat: "repeat",
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(generatedPattern)}
                          className="w-full"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copier Data URL
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Calculateur de contraste */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Contrast className="h-5 w-5" />
                      Calculateur de contraste
                    </CardTitle>
                    <CardDescription>Vérifiez l'accessibilité WCAG</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Couleur de fond</Label>
                        <input
                          type="color"
                          value={contrastColor1}
                          onChange={(e) => setContrastColor1(e.target.value)}
                          className="w-full h-12 rounded border cursor-pointer"
                        />
                      </div>
                      <div>
                        <Label>Couleur du texte</Label>
                        <input
                          type="color"
                          value={contrastColor2}
                          onChange={(e) => setContrastColor2(e.target.value)}
                          className="w-full h-12 rounded border cursor-pointer"
                        />
                      </div>
                    </div>

                    <Button onClick={calculateContrast} className="w-full">
                      <Contrast className="h-4 w-4 mr-2" />
                      Calculer le contraste
                    </Button>

                    {contrastRatio > 0 && (
                      <div className="space-y-3">
                        <div
                          className="w-full h-16 rounded border flex items-center justify-center text-lg font-bold"
                          style={{
                            backgroundColor: contrastColor1,
                            color: contrastColor2,
                          }}
                        >
                          Exemple de texte
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-muted p-3 rounded text-center">
                            <div className="text-2xl font-bold">{contrastRatio}:1</div>
                            <div className="text-sm text-muted-foreground">Ratio</div>
                          </div>
                          <div className="bg-muted p-3 rounded text-center">
                            <div
                              className={`text-2xl font-bold ${
                                contrastLevel === "AAA"
                                  ? "text-green-600"
                                  : contrastLevel.includes("AA")
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                            >
                              {contrastLevel}
                            </div>
                            <div className="text-sm text-muted-foreground">Niveau</div>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            AAA: Contraste optimal (7:1)
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="h-3 w-3 text-yellow-600" />
                            AA: Contraste acceptable (4.5:1)
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-3 w-3 text-red-600" />
                            Fail: Contraste insuffisant
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Onglet Dev Tools */}
            <TabsContent value="dev" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Générateur de Regex */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Regex className="h-5 w-5" />
                      Testeur de Regex
                    </CardTitle>
                    <CardDescription>Testez vos expressions régulières</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Pattern Regex</Label>
                      <Input
                        value={regexPattern}
                        onChange={(e) => setRegexPattern(e.target.value)}
                        placeholder="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        className={!regexValid ? "border-red-500" : ""}
                      />
                    </div>

                    <div>
                      <Label>Flags</Label>
                      <Input
                        value={regexFlags}
                        onChange={(e) => setRegexFlags(e.target.value)}
                        placeholder="g, i, m..."
                        maxLength={10}
                      />
                    </div>

                    <div>
                      <Label>Texte de laboratoire</Label>
                      <Textarea
                        value={regexTestString}
                        onChange={(e) => setRegexTestString(e.target.value)}
                        placeholder="Entrez le texte à tester..."
                        rows={3}
                      />
                    </div>

                    <Button onClick={testRegex} disabled={!regexPattern} className="w-full">
                      <Regex className="h-4 w-4 mr-2" />
                      Tester Regex
                    </Button>

                    {!regexValid && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        Expression régulière invalide
                      </div>
                    )}

                    {regexMatches.length > 0 && (
                      <div className="space-y-2">
                        <Label>Correspondances trouvées ({regexMatches.length})</Label>
                        <div className="bg-muted p-3 rounded max-h-32 overflow-y-auto">
                          {regexMatches.map((match, index) => (
                            <div key={index} className="font-mono text-sm bg-green-100 px-2 py-1 rounded mb-1">
                              {match}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Convertisseur de données */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Convertisseur de données
                    </CardTitle>
                    <CardDescription>Convertissez entre JSON, CSV, YAML</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Format d'entrée</Label>
                        <Select value={dataInputFormat} onValueChange={setDataInputFormat}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Format de sortie</Label>
                        <Select value={dataOutputFormat} onValueChange={setDataOutputFormat}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="yaml">YAML</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Données d'entrée</Label>
                      <Textarea
                        value={dataInput}
                        onChange={(e) => setDataInput(e.target.value)}
                        placeholder={
                          dataInputFormat === "json" ? '{"name": "John", "age": 30}' : "name,age\nJohn,30\nJane,25"
                        }
                        rows={4}
                        className="font-mono text-sm"
                      />
                    </div>

                    <Button onClick={convertData} disabled={!dataInput} className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Convertir
                    </Button>

                    {convertedData && (
                      <div className="space-y-2">
                        <Label>Données converties</Label>
                        <Textarea value={convertedData} readOnly rows={6} className="font-mono text-sm" />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(convertedData)}
                            className="flex-1"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copier
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              downloadFile(convertedData, `converted.${dataOutputFormat}`, `text/${dataOutputFormat}`)
                            }
                            className="flex-1"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Analyseur de performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      Simulateur de performance
                    </CardTitle>
                    <CardDescription>Simulez des métriques de performance web</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>URL du site</Label>
                      <Input
                        value={perfUrl}
                        onChange={(e) => setPerfUrl(e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>

                    <Button onClick={analyzePerformance} disabled={!perfUrl} className="w-full">
                      <Monitor className="h-4 w-4 mr-2" />
                      Analyser (Simulation)
                    </Button>

                    {perfMetrics && (
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">{perfMetrics.score}</div>
                          <div className="text-sm text-muted-foreground">Score Performance</div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-muted p-2 rounded">
                            <div className="font-medium">FCP</div>
                            <div className="text-muted-foreground">{perfMetrics.fcp.toFixed(1)}s</div>
                          </div>
                          <div className="bg-muted p-2 rounded">
                            <div className="font-medium">FID</div>
                            <div className="text-muted-foreground">{perfMetrics.fid.toFixed(0)}ms</div>
                          </div>
                          <div className="bg-muted p-2 rounded">
                            <div className="font-medium">CLS</div>
                            <div className="text-muted-foreground">{perfMetrics.cls.toFixed(3)}</div>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <div className="mb-1">FCP: First Contentful Paint</div>
                          <div className="mb-1">LCP: Largest Contentful Paint</div>
                          <div className="mb-1">FID: First Input Delay</div>
                          <div>CLS: Cumulative Layout Shift</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Onglet Média */}
            <TabsContent value="media" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pixel Art Creator */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Grid3X3 className="h-5 w-5" />
                      Créateur de Pixel Art
                    </CardTitle>
                    <CardDescription>Créez du pixel art simple</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>
                          Taille de grille: {pixelGridSize[0]}x{pixelGridSize[0]}
                        </Label>
                        <Slider value={pixelGridSize} onValueChange={setPixelGridSize} max={32} min={8} step={4} />
                      </div>
                      <div>
                        <Label>Couleur</Label>
                        <input
                          type="color"
                          value={pixelColor}
                          onChange={(e) => setPixelColor(e.target.value)}
                          className="w-full h-10 rounded border cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={initPixelGrid} variant="outline" className="flex-1 bg-transparent">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Effacer
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div
                        className="grid gap-1 mx-auto border p-2 rounded bg-white shadow-lg"
                        style={{
                          gridTemplateColumns: `repeat(${pixelGridSize[0]}, 1fr)`,
                          width: "fit-content",
                        }}
                      >
                        {pixelGrid.map((row, rowIndex) =>
                          row.map((pixel, colIndex) => (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              className="w-4 h-4 border border-gray-200 cursor-pointer hover:opacity-80 hover:scale-110 transition-all duration-150 hover:shadow-md"
                              style={{ backgroundColor: pixel }}
                              onClick={() => drawPixel(rowIndex, colIndex)}
                            />
                          )),
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Canvas créatif */}
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Paintbrush className="h-5 w-5" />
                      Canvas créatif
                    </CardTitle>
                    <CardDescription>Espace de dessin libre</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DrawingCanvas />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Onglet Productivité */}
            <TabsContent value="productivity" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Générateur de signature email */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Générateur de signature email
                    </CardTitle>
                    <CardDescription>Créez une signature HTML professionnelle</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Nom</Label>
                        <Input
                          value={signatureName}
                          onChange={(e) => setSignatureName(e.target.value)}
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <div>
                        <Label>Titre</Label>
                        <Input
                          value={signatureTitle}
                          onChange={(e) => setSignatureTitle(e.target.value)}
                          placeholder="Développeur Web"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Entreprise</Label>
                      <Input
                        value={signatureCompany}
                        onChange={(e) => setSignatureCompany(e.target.value)}
                        placeholder="Mon Entreprise"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Email</Label>
                        <Input
                          value={signatureEmail}
                          onChange={(e) => setSignatureEmail(e.target.value)}
                          placeholder="jean@exemple.com"
                          type="email"
                        />
                      </div>
                      <div>
                        <Label>Téléphone</Label>
                        <Input
                          value={signaturePhone}
                          onChange={(e) => setSignaturePhone(e.target.value)}
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Site web</Label>
                      <Input
                        value={signatureWebsite}
                        onChange={(e) => setSignatureWebsite(e.target.value)}
                        placeholder="https://monsite.com"
                      />
                    </div>

                    <Button
                      onClick={generateEmailSignature}
                      disabled={!signatureName || !signatureEmail}
                      className="w-full"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Générer signature
                    </Button>

                    {generatedSignature && (
                      <div className="space-y-2">
                        <Label>Aperçu</Label>
                        <div
                          className="border rounded p-4 bg-white"
                          dangerouslySetInnerHTML={{ __html: generatedSignature }}
                        />
                        <Textarea value={generatedSignature} readOnly rows={8} className="font-mono text-xs" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(generatedSignature)}
                          className="w-full"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copier HTML
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Générateur de certificats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Générateur de certificats
                    </CardTitle>
                    <CardDescription>Créez des certificats personnalisés</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Nom du bénéficiaire</Label>
                        <Input
                          value={certName}
                          onChange={(e) => setCertName(e.target.value)}
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <div>
                        <Label>Cours/Formation</Label>
                        <Input
                          value={certCourse}
                          onChange={(e) => setCertCourse(e.target.value)}
                          placeholder="Développement Web"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Date</Label>
                        <Input value={certDate} onChange={(e) => setCertDate(e.target.value)} type="date" />
                      </div>
                      <div>
                        <Label>Instructeur</Label>
                        <Input
                          value={certInstructor}
                          onChange={(e) => setCertInstructor(e.target.value)}
                          placeholder="Marie Martin"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Template</Label>
                      <Select value={certTemplate} onValueChange={setCertTemplate}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Moderne</SelectItem>
                          <SelectItem value="classic">Classique</SelectItem>
                          <SelectItem value="elegant">Élégant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={() => {
                        // Simulation de génération de certificat
                        const cert = `
                          <div style="width: 600px; height: 400px; border: 3px solid #2563eb; padding: 40px; text-align: center; font-family: Arial, sans-serif; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
                            <h1 style="color: #2563eb; font-size: 32px; margin-bottom: 20px;">CERTIFICAT</h1>
                            <p style="font-size: 18px; margin-bottom: 30px;">Ceci certifie que</p>
                            <h2 style="color: #1e40af; font-size: 28px; margin-bottom: 30px; text-decoration: underline;">${certName}</h2>
                            <p style="font-size: 16px; margin-bottom: 20px;">a complété avec succès le cours</p>
                            <h3 style="color: #2563eb; font-size: 24px; margin-bottom: 40px;">${certCourse}</h3>
                            <div style="display: flex; justify-content: space-between; margin-top: 60px;">
                              <div>
                                <p style="border-top: 1px solid #000; padding-top: 5px; margin: 0;">Date: ${certDate}</p>
                              </div>
                              <div>
                                <p style="border-top: 1px solid #000; padding-top: 5px; margin: 0;">Instructeur: ${certInstructor}</p>
                              </div>
                            </div>
                          </div>
                        `
                        copyToClipboard(cert)
                      }}
                      disabled={!certName || !certCourse}
                      className="w-full"
                    >
                      <Award className="h-4 w-4 mr-2" />
                      Générer certificat
                    </Button>

                    <div className="text-xs text-muted-foreground">
                      Le certificat sera copié dans le presse-papiers au format HTML
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Onglet Fun */}
            <TabsContent value="fun" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Générateur de memes */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smile className="h-5 w-5" />
                      Générateur de Memes Avancé
                    </CardTitle>
                    <CardDescription>Créez des memes avec de nombreux templates populaires</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Controls */}
                      <div className="space-y-4">
                        <div>
                          <Label>Template de meme</Label>
                          <Select value={memeTemplate} onValueChange={setMemeTemplate}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="drake">🙅‍♂️ Drake Pointing</SelectItem>
                              <SelectItem value="distracted">😍 Distracted Boyfriend</SelectItem>
                              <SelectItem value="woman-cat">😤 Woman Yelling at Cat</SelectItem>
                              <SelectItem value="this-is-fine">🔥 This is Fine</SelectItem>
                              <SelectItem value="expanding-brain">🧠 Expanding Brain</SelectItem>
                              <SelectItem value="two-buttons">😰 Two Buttons</SelectItem>
                              <SelectItem value="change-my-mind">🧔 Change My Mind</SelectItem>
                              <SelectItem value="stonks">📈 Stonks</SelectItem>
                              <SelectItem value="surprised-pikachu">😲 Surprised Pikachu</SelectItem>
                              <SelectItem value="galaxy-brain">🌌 Galaxy Brain</SelectItem>
                              <SelectItem value="custom">📷 Custom Image</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {memeTemplate === "custom" && (
                          <div>
                            <Label>Image personnalisée</Label>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onload = (e) => {
                                    setMemeCustomImage(e.target?.result as string)
                                  }
                                  reader.readAsDataURL(file)
                                }
                              }}
                              ref={memeImageInputRef}
                              className="hidden"
                            />
                            <Button
                              variant="outline"
                              onClick={() => memeImageInputRef.current?.click()}
                              className="w-full mt-2"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Choisir une image
                            </Button>
                          </div>
                        )}

                        <div>
                          <Label>Texte du haut</Label>
                          <Input
                            value={memeTopText}
                            onChange={(e) => setMemeTopText(e.target.value)}
                            placeholder={
                              memeTemplate === "two-buttons"
                                ? "Option 1"
                                : memeTemplate === "distracted"
                                  ? "Girlfriend"
                                  : "Texte du haut..."
                            }
                          />
                        </div>

                        {(memeTemplate === "distracted" || memeTemplate === "expanding-brain") && (
                          <div>
                            <Label>Texte du milieu</Label>
                            <Input
                              value={memeMiddleText}
                              onChange={(e) => setMemeMiddleText(e.target.value)}
                              placeholder={memeTemplate === "distracted" ? "Boyfriend" : "Niveau 2..."}
                            />
                          </div>
                        )}

                        <div>
                          <Label>Texte du bas</Label>
                          <Input
                            value={memeBottomText}
                            onChange={(e) => setMemeBottomText(e.target.value)}
                            placeholder={
                              memeTemplate === "two-buttons"
                                ? "Option 2"
                                : memeTemplate === "distracted"
                                  ? "Other Woman"
                                  : "Texte du bas..."
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Taille du texte: {memeTextSize[0]}px</Label>
                            <Slider value={memeTextSize} onValueChange={setMemeTextSize} max={48} min={12} step={2} />
                          </div>
                          <div>
                            <Label>Couleur du texte</Label>
                            <input
                              type="color"
                              value={memeTextColor}
                              onChange={(e) => setMemeTextColor(e.target.value)}
                              className="w-full h-10 rounded border cursor-pointer"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Couleur du contour</Label>
                          <input
                            type="color"
                            value={memeTextStroke}
                            onChange={(e) => setMemeTextStroke(e.target.value)}
                            className="w-full h-10 rounded border cursor-pointer"
                          />
                        </div>

                        <Button onClick={generateMeme} className="w-full">
                          <Smile className="h-4 w-4 mr-2" />
                          Générer Meme
                        </Button>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              const canvas = memeCanvasRef.current
                              if (canvas) {
                                const link = document.createElement("a")
                                link.download = `meme-${memeTemplate}.png`
                                link.href = canvas.toDataURL()
                                link.click()
                              }
                            }}
                            className="flex-1"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger PNG
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              const canvas = memeCanvasRef.current
                              if (canvas) {
                                canvas.toBlob((blob) => {
                                  if (blob) {
                                    const url = URL.createObjectURL(blob)
                                    copyToClipboard(url)
                                  }
                                })
                              }
                            }}
                            className="flex-1"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copier
                          </Button>
                        </div>
                      </div>

                      {/* Preview */}
                      <div className="space-y-2">
                        <Label>Aperçu du meme</Label>
                        <div className="border rounded-lg p-4 bg-white">
                          <canvas
                            ref={memeCanvasRef}
                            className="w-full border rounded"
                            style={{ maxWidth: "100%", height: "auto", aspectRatio: "1/1" }}
                          />
                        </div>

                        {/* Template Info */}
                        <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                          <strong>Template actuel:</strong>{" "}
                          {memeTemplate === "drake"
                            ? "Drake Pointing - Classique choix binaire"
                            : memeTemplate === "distracted"
                              ? "Distracted Boyfriend - Tentation vs loyauté"
                              : memeTemplate === "woman-cat"
                                ? "Woman Yelling at Cat - Confrontation"
                                : memeTemplate === "this-is-fine"
                                  ? "This is Fine - Déni face aux problèmes"
                                  : memeTemplate === "expanding-brain"
                                    ? "Expanding Brain - Évolution d'idées"
                                    : memeTemplate === "two-buttons"
                                      ? "Two Buttons - Choix difficile"
                                      : memeTemplate === "change-my-mind"
                                        ? "Change My Mind - Débat/Opinion"
                                        : memeTemplate === "stonks"
                                          ? "Stonks - Investissements/Gains"
                                          : memeTemplate === "surprised-pikachu"
                                            ? "Surprised Pikachu - Conséquences prévisibles"
                                            : memeTemplate === "galaxy-brain"
                                              ? "Galaxy Brain - Intelligence cosmique"
                                              : "Template personnalisé"}
                        </div>
                      </div>
                    </div>

                    {/* Quick Templates */}
                    <div className="border-t pt-4">
                      <Label className="text-sm font-medium mb-2 block">Templates rapides populaires</Label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {[
                          { id: "drake", emoji: "🙅‍♂️", name: "Drake" },
                          { id: "distracted", emoji: "😍", name: "Distracted" },
                          { id: "woman-cat", emoji: "😤", name: "Woman Cat" },
                          { id: "this-is-fine", emoji: "🔥", name: "This is Fine" },
                          { id: "stonks", emoji: "📈", name: "Stonks" },
                          { id: "surprised-pikachu", emoji: "😲", name: "Pikachu" },
                          { id: "galaxy-brain", emoji: "🌌", name: "Galaxy" },
                          { id: "expanding-brain", emoji: "🧠", name: "Brain" },
                          { id: "two-buttons", emoji: "😰", name: "Buttons" },
                          { id: "change-my-mind", emoji: "🧔", name: "Change Mind" },
                        ].map((template) => (
                          <Button
                            key={template.id}
                            variant={memeTemplate === template.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setMemeTemplate(template.id)}
                            className="flex flex-col h-auto py-2"
                          >
                            <span className="text-lg">{template.emoji}</span>
                            <span className="text-xs">{template.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Section Technologies */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-6">Technologies & APIs Utilisées</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "React",
                "TypeScript",
                "Next.js",
                "Tailwind CSS",
                "Shadcn/ui",
                "Canvas API",
                "Web Crypto API",
                "File API",
                "Blob API",
                "SVG",
                "HTML5",
                "CSS3",
                "JavaScript",
                "Color Theory",
                "WCAG Guidelines",
                "Regex",
                "Data Conversion",
                "Image Processing",
              ].map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
