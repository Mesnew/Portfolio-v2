"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlanetBackground3D } from "@/components/PlanetBackground3D"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { QRGenerator } from "@/components/qr-generator"
import { DrawingCanvas } from "@/components/drawing-canvas"
import {
    QrCode,
    Paintbrush,
    ImageIcon,
    Key,
    Hash,
    Type,
    Palette,
    FileText,
    Calculator,
    CheckCircle,
    Download,
    Upload,
    Copy,
    RefreshCw,
    Zap,
    Calendar,
    Ruler,
    Search,
    Target,
    Sparkles,
    Eye,
    EyeOff,
} from "lucide-react"

export default function LaboratoirePage() {
    // États pour le générateur de mots de passe
    const [passwordLength, setPasswordLength] = useState([16])
    const [generatedPassword, setGeneratedPassword] = useState("")
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(true)
    const [excludeSimilar, setExcludeSimilar] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [showPassword, setShowPassword] = useState(true)

    // États pour le calculateur de hash
    const [textToHash, setTextToHash] = useState("")
    const [hashResults, setHashResults] = useState<Record<string, string>>({})
    const [selectedHashType, setSelectedHashType] = useState("SHA-256")

    // États pour l'analyseur de texte
    const [textToAnalyze, setTextToAnalyze] = useState("")
    const [textAnalysis, setTextAnalysis] = useState<any>(null)

    // États pour le générateur de couleurs
    const [selectedColor, setSelectedColor] = useState("#3b82f6")
    const [colorPalette, setColorPalette] = useState<string[]>([])
    const [colorFormat, setColorFormat] = useState("hex")

    // États pour le convertisseur d'unités
    const [unitValue, setUnitValue] = useState("")
    const [fromUnit, setFromUnit] = useState("meters")
    const [toUnit, setToUnit] = useState("feet")
    const [unitCategory, setUnitCategory] = useState("length")
    const [convertedValue, setConvertedValue] = useState("")

    // États pour le générateur Lorem Ipsum
    const [loremType, setLoremType] = useState("paragraphs")
    const [loremCount, setLoremCount] = useState([3])
    const [generatedLorem, setGeneratedLorem] = useState("")

    // États pour le raccourcisseur d'URL
    const [longUrl, setLongUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [customAlias, setCustomAlias] = useState("")

    // États pour le validateur
    const [validationText, setValidationText] = useState("")
    const [validationType, setValidationType] = useState("email")
    const [validationResult, setValidationResult] = useState<any>(null)

    // États pour le convertisseur d'images
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [outputFormat, setOutputFormat] = useState("webp")
    const [quality, setQuality] = useState([80])
    const [convertedImage, setConvertedImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // États pour le calculateur de dates
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [dateCalculation, setDateCalculation] = useState<any>(null)

    // États pour le générateur de données
    const [dataType, setDataType] = useState("person")
    const [dataCount, setDataCount] = useState([1])
    const [generatedData, setGeneratedData] = useState<any[]>([])

    // Fonction pour générer un mot de passe
    const generatePassword = () => {
        let chars = ""
        if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz"
        if (includeNumbers) chars += "0123456789"
        if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"

        if (excludeSimilar) {
            chars = chars.replace(/[il1Lo0O]/g, "")
        }

        if (chars === "") {
            setGeneratedPassword("Sélectionnez au moins un type de caractère")
            return
        }

        let password = ""
        for (let i = 0; i < passwordLength[0]; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setGeneratedPassword(password)
        calculatePasswordStrength(password)
    }

    // Fonction pour calculer la force du mot de passe
    const calculatePasswordStrength = (password: string) => {
        let score = 0
        if (password.length >= 8) score += 25
        if (password.length >= 12) score += 25
        if (/[a-z]/.test(password)) score += 10
        if (/[A-Z]/.test(password)) score += 10
        if (/[0-9]/.test(password)) score += 10
        if (/[^A-Za-z0-9]/.test(password)) score += 20
        setPasswordStrength(Math.min(score, 100))
    }

    // Fonction pour calculer les hash
    const calculateHashes = async () => {
        if (!textToHash) return

        const results: Record<string, string> = {}

        try {
            // SHA-256
            const sha256Buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(textToHash))
            results["SHA-256"] = Array.from(new Uint8Array(sha256Buffer))
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("")

            // SHA-1
            const sha1Buffer = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(textToHash))
            results["SHA-1"] = Array.from(new Uint8Array(sha1Buffer))
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("")

            // Base64
            results["Base64"] = btoa(textToHash)

            // MD5 simulation (simple hash pour demo)
            results["MD5"] = simpleHash(textToHash)

            setHashResults(results)
        } catch (error) {
            console.error("Erreur lors du calcul des hash:", error)
        }
    }

    // Fonction de hash simple pour simuler MD5
    const simpleHash = (str: string) => {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i)
            hash = (hash << 5) - hash + char
            hash = hash & hash // Convert to 32bit integer
        }
        return Math.abs(hash).toString(16)
    }

    // Fonction pour analyser le texte
    const analyzeText = () => {
        if (!textToAnalyze) return

        const words = textToAnalyze.trim().split(/\s+/)
        const sentences = textToAnalyze.split(/[.!?]+/).filter((s) => s.trim().length > 0)
        const paragraphs = textToAnalyze.split(/\n\s*\n/).filter((p) => p.trim().length > 0)
        const characters = textToAnalyze.length
        const charactersNoSpaces = textToAnalyze.replace(/\s/g, "").length

        // Analyse de fréquence des mots
        const wordFreq: Record<string, number> = {}
        words.forEach((word) => {
            const cleanWord = word.toLowerCase().replace(/[^\w]/g, "")
            if (cleanWord.length > 2) {
                wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1
            }
        })

        const topWords = Object.entries(wordFreq)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)

        // Temps de lecture estimé (250 mots par minute)
        const readingTime = Math.ceil(words.length / 250)

        setTextAnalysis({
            characters,
            charactersNoSpaces,
            words: words.length,
            sentences: sentences.length,
            paragraphs: paragraphs.length,
            readingTime,
            topWords,
            averageWordsPerSentence: Math.round(words.length / sentences.length) || 0,
        })
    }

    // Fonction pour générer une palette de couleurs
    const generateColorPalette = () => {
        const baseColor = selectedColor
        const palette = [baseColor]

        // Générer des couleurs complémentaires
        const hsl = hexToHsl(baseColor)
        for (let i = 1; i < 5; i++) {
            const newHue = (hsl.h + i * 72) % 360
            palette.push(hslToHex(newHue, hsl.s, hsl.l))
        }

        setColorPalette(palette)
    }

    // Fonctions utilitaires pour les couleurs
    const hexToHsl = (hex: string) => {
        const r = Number.parseInt(hex.slice(1, 3), 16) / 255
        const g = Number.parseInt(hex.slice(3, 5), 16) / 255
        const b = Number.parseInt(hex.slice(5, 7), 16) / 255

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        let h = 0,
            s = 0,
            l = (max + min) / 2

        if (max !== min) {
            const d = max - min
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0)
                    break
                case g:
                    h = (b - r) / d + 2
                    break
                case b:
                    h = (r - g) / d + 4
                    break
            }
            h /= 6
        }

        return { h: h * 360, s: s * 100, l: l * 100 }
    }

    const hslToHex = (h: number, s: number, l: number) => {
        h /= 360
        s /= 100
        l /= 100

        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        let r, g, b
        if (s === 0) {
            r = g = b = l
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s
            const p = 2 * l - q
            r = hue2rgb(p, q, h + 1 / 3)
            g = hue2rgb(p, q, h)
            b = hue2rgb(p, q, h - 1 / 3)
        }

        const toHex = (c: number) => {
            const hex = Math.round(c * 255).toString(16)
            return hex.length === 1 ? "0" + hex : hex
        }

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`
    }

    // Fonction pour convertir les unités
    const convertUnits = () => {
        const value = Number.parseFloat(unitValue)
        if (isNaN(value)) {
            setConvertedValue("Valeur invalide")
            return
        }

        const conversions: Record<string, Record<string, number>> = {
            length: {
                meters: 1,
                feet: 3.28084,
                inches: 39.3701,
                centimeters: 100,
                kilometers: 0.001,
                miles: 0.000621371,
            },
            weight: {
                kilograms: 1,
                pounds: 2.20462,
                grams: 1000,
                ounces: 35.274,
                tons: 0.001,
            },
            temperature: {
                celsius: (c: number) => c,
                fahrenheit: (c: number) => (c * 9) / 5 + 32,
                kelvin: (c: number) => c + 273.15,
            },
        }

        if (unitCategory === "temperature") {
            let celsius = value
            if (fromUnit === "fahrenheit") celsius = ((value - 32) * 5) / 9
            if (fromUnit === "kelvin") celsius = value - 273.15

            const result = conversions.temperature[toUnit as keyof typeof conversions.temperature](celsius)
            setConvertedValue(result.toFixed(2))
        } else {
            const categoryConversions = conversions[unitCategory as keyof typeof conversions] as Record<string, number>
            const baseValue = value / categoryConversions[fromUnit]
            const result = baseValue * categoryConversions[toUnit]
            setConvertedValue(result.toFixed(6))
        }
    }

    // Fonction pour générer Lorem Ipsum
    const generateLorem = () => {
        const loremWords = [
            "lorem",
            "ipsum",
            "dolor",
            "sit",
            "amet",
            "consectetur",
            "adipiscing",
            "elit",
            "sed",
            "do",
            "eiusmod",
            "tempor",
            "incididunt",
            "ut",
            "labore",
            "et",
            "dolore",
            "magna",
            "aliqua",
            "enim",
            "ad",
            "minim",
            "veniam",
            "quis",
            "nostrud",
            "exercitation",
            "ullamco",
            "laboris",
            "nisi",
            "aliquip",
            "ex",
            "ea",
            "commodo",
            "consequat",
            "duis",
            "aute",
            "irure",
            "in",
            "reprehenderit",
            "voluptate",
            "velit",
            "esse",
            "cillum",
            "fugiat",
            "nulla",
            "pariatur",
            "excepteur",
            "sint",
            "occaecat",
            "cupidatat",
            "non",
            "proident",
            "sunt",
            "culpa",
            "qui",
            "officia",
            "deserunt",
            "mollit",
            "anim",
            "id",
            "est",
            "laborum",
        ]

        let result = ""
        const count = loremCount[0]

        if (loremType === "words") {
            const words = []
            for (let i = 0; i < count; i++) {
                words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
            }
            result = words.join(" ")
        } else if (loremType === "sentences") {
            const sentences = []
            for (let i = 0; i < count; i++) {
                const sentenceLength = Math.floor(Math.random() * 10) + 5
                const words = []
                for (let j = 0; j < sentenceLength; j++) {
                    words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
                }
                sentences.push(words.join(" ") + ".")
            }
            result = sentences.join(" ")
        } else {
            // paragraphs
            const paragraphs = []
            for (let i = 0; i < count; i++) {
                const sentenceCount = Math.floor(Math.random() * 5) + 3
                const sentences = []
                for (let j = 0; j < sentenceCount; j++) {
                    const sentenceLength = Math.floor(Math.random() * 10) + 5
                    const words = []
                    for (let k = 0; k < sentenceLength; k++) {
                        words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
                    }
                    sentences.push(words.join(" ") + ".")
                }
                paragraphs.push(sentences.join(" "))
            }
            result = paragraphs.join("\n\n")
        }

        setGeneratedLorem(result)
    }

    // Fonction pour valider
    const validateInput = () => {
        const result: any = { valid: false, message: "" }

        switch (validationType) {
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                result.valid = emailRegex.test(validationText)
                result.message = result.valid ? "Email valide" : "Format d'email invalide"
                break
            case "url":
                try {
                    new URL(validationText)
                    result.valid = true
                    result.message = "URL valide"
                } catch {
                    result.valid = false
                    result.message = "Format d'URL invalide"
                }
                break
            case "phone":
                const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
                result.valid = phoneRegex.test(validationText.replace(/[\s\-$$$$]/g, ""))
                result.message = result.valid ? "Numéro de téléphone valide" : "Format de téléphone invalide"
                break
            case "json":
                try {
                    JSON.parse(validationText)
                    result.valid = true
                    result.message = "JSON valide"
                } catch {
                    result.valid = false
                    result.message = "JSON invalide"
                }
                break
        }

        setValidationResult(result)
    }

    // Fonction pour convertir les images
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedFile(file)
        }
    }

    const convertImage = () => {
        if (!selectedFile) return

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const img = new Image()

        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx?.drawImage(img, 0, 0)

            const mimeType = `image/${outputFormat}`
            const qualityValue = quality[0] / 100

            const dataUrl = canvas.toDataURL(mimeType, qualityValue)
            setConvertedImage(dataUrl)
        }

        img.src = URL.createObjectURL(selectedFile)
    }

    // Fonction pour calculer la différence entre dates
    const calculateDateDifference = () => {
        if (!startDate || !endDate) return

        const start = new Date(startDate)
        const end = new Date(endDate)
        const diffTime = Math.abs(end.getTime() - start.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        const diffWeeks = Math.floor(diffDays / 7)
        const diffMonths = Math.floor(diffDays / 30.44)
        const diffYears = Math.floor(diffDays / 365.25)

        setDateCalculation({
            days: diffDays,
            weeks: diffWeeks,
            months: diffMonths,
            years: diffYears,
            businessDays: Math.floor(diffDays * (5 / 7)), // Approximation
        })
    }

    // Fonction pour générer des données factices
    const generateFakeData = () => {
        const firstNames = ["Jean", "Marie", "Pierre", "Sophie", "Paul", "Julie", "Michel", "Anne", "David", "Claire"]
        const lastNames = [
            "Martin",
            "Bernard",
            "Dubois",
            "Thomas",
            "Robert",
            "Richard",
            "Petit",
            "Durand",
            "Leroy",
            "Moreau",
        ]
        const domains = ["gmail.com", "yahoo.fr", "hotmail.com", "outlook.fr", "free.fr"]
        const companies = ["TechCorp", "InnoSoft", "DataSys", "WebPro", "CloudTech"]

        const data = []
        for (let i = 0; i < dataCount[0]; i++) {
            if (dataType === "person") {
                const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
                const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
                data.push({
                    id: i + 1,
                    firstName,
                    lastName,
                    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${
                        domains[Math.floor(Math.random() * domains.length)]
                    }`,
                    age: Math.floor(Math.random() * 50) + 18,
                    phone: `0${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 100000000)
                        .toString()
                        .padStart(8, "0")}`,
                })
            } else if (dataType === "company") {
                data.push({
                    id: i + 1,
                    name: companies[Math.floor(Math.random() * companies.length)],
                    revenue: Math.floor(Math.random() * 10000000) + 100000,
                    employees: Math.floor(Math.random() * 1000) + 10,
                    founded: Math.floor(Math.random() * 30) + 1990,
                })
            }
        }
        setGeneratedData(data)
    }

    // Fonction pour copier dans le presse-papiers
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <PlanetBackground3D planetType="jupiter" />
            <Header />

            <main className="flex-1 relative z-10">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                            Laboratoire Digital
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Collection d'outils utiles pour développeurs et créateurs
                        </p>
                    </div>

                    <Tabs defaultValue="generateurs" className="w-full">
                        <TabsList className="grid w-full grid-cols-6 mb-8">
                            <TabsTrigger value="generateurs" className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                Générateurs
                            </TabsTrigger>
                            <TabsTrigger value="convertisseurs" className="flex items-center gap-2">
                                <RefreshCw className="h-4 w-4" />
                                Convertisseurs
                            </TabsTrigger>
                            <TabsTrigger value="analyseurs" className="flex items-center gap-2">
                                <Search className="h-4 w-4" />
                                Analyseurs
                            </TabsTrigger>
                            <TabsTrigger value="validateurs" className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Validateurs
                            </TabsTrigger>
                            <TabsTrigger value="calculateurs" className="flex items-center gap-2">
                                <Calculator className="h-4 w-4" />
                                Calculateurs
                            </TabsTrigger>
                            <TabsTrigger value="creatif" className="flex items-center gap-2">
                                <Paintbrush className="h-4 w-4" />
                                Créatif
                            </TabsTrigger>
                        </TabsList>

                        {/* Onglet Générateurs */}
                        <TabsContent value="generateurs" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Générateur de mots de passe avancé */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Key className="h-5 w-5" />
                                            Générateur de mots de passe
                                        </CardTitle>
                                        <CardDescription>Créez des mots de passe sécurisés</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>Longueur: {passwordLength[0]} caractères</Label>
                                            <Slider
                                                value={passwordLength}
                                                onValueChange={setPasswordLength}
                                                max={64}
                                                min={4}
                                                step={1}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="uppercase">Majuscules (A-Z)</Label>
                                                <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="lowercase">Minuscules (a-z)</Label>
                                                <Switch id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="numbers">Chiffres (0-9)</Label>
                                                <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="symbols">Symboles (!@#$...)</Label>
                                                <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="exclude">Exclure similaires</Label>
                                                <Switch id="exclude" checked={excludeSimilar} onCheckedChange={setExcludeSimilar} />
                                            </div>
                                        </div>

                                        <Button onClick={generatePassword} className="w-full">
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                            Générer
                                        </Button>

                                        {generatedPassword && (
                                            <div className="space-y-3">
                                                <div className="relative">
                                                    <Input
                                                        value={generatedPassword}
                                                        readOnly
                                                        type={showPassword ? "text" : "password"}
                                                        className="font-mono pr-20"
                                                    />
                                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                                        <Button size="sm" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                        </Button>
                                                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(generatedPassword)}>
                                                            <Copy className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span>Force du mot de passe</span>
                                                        <span>{passwordStrength}%</span>
                                                    </div>
                                                    <Progress value={passwordStrength} className="h-2" />
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Générateur QR Code */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <QrCode className="h-5 w-5" />
                                            Générateur QR Code
                                        </CardTitle>
                                        <CardDescription>Créez des QR codes personnalisés</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <QRGenerator />
                                    </CardContent>
                                </Card>

                                {/* Générateur Lorem Ipsum */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="h-5 w-5" />
                                            Générateur Lorem Ipsum
                                        </CardTitle>
                                        <CardDescription>Générez du texte de remplissage</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <Label>Type</Label>
                                                <Select value={loremType} onValueChange={setLoremType}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="words">Mots</SelectItem>
                                                        <SelectItem value="sentences">Phrases</SelectItem>
                                                        <SelectItem value="paragraphs">Paragraphes</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label>Quantité: {loremCount[0]}</Label>
                                                <Slider value={loremCount} onValueChange={setLoremCount} max={20} min={1} step={1} />
                                            </div>
                                        </div>

                                        <Button onClick={generateLorem} className="w-full">
                                            <FileText className="h-4 w-4 mr-2" />
                                            Générer
                                        </Button>

                                        {generatedLorem && (
                                            <div className="space-y-2">
                                                <Textarea value={generatedLorem} readOnly className="min-h-[120px] text-sm" />
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => copyToClipboard(generatedLorem)}
                                                    className="w-full"
                                                >
                                                    <Copy className="h-4 w-4 mr-2" />
                                                    Copier
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Générateur de couleurs */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Palette className="h-5 w-5" />
                                            Générateur de palettes
                                        </CardTitle>
                                        <CardDescription>Créez des palettes harmonieuses</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>Couleur de base</Label>
                                            <input
                                                type="color"
                                                value={selectedColor}
                                                onChange={(e) => setSelectedColor(e.target.value)}
                                                className="w-full h-12 rounded border cursor-pointer"
                                            />
                                        </div>

                                        <Button onClick={generateColorPalette} className="w-full">
                                            <Sparkles className="h-4 w-4 mr-2" />
                                            Générer palette
                                        </Button>

                                        {colorPalette.length > 0 && (
                                            <div className="space-y-2">
                                                <Label>Palette générée</Label>
                                                <div className="grid grid-cols-5 gap-2">
                                                    {colorPalette.map((color, index) => (
                                                        <div
                                                            key={index}
                                                            className="aspect-square rounded cursor-pointer border-2 border-transparent hover:border-white transition-all relative group"
                                                            style={{ backgroundColor: color }}
                                                            onClick={() => copyToClipboard(color)}
                                                            title={color}
                                                        >
                                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Copy className="h-4 w-4 text-white drop-shadow-lg" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Cliquez sur une couleur pour copier son code
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Générateur de données factices */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Target className="h-5 w-5" />
                                            Générateur de données
                                        </CardTitle>
                                        <CardDescription>Générez des données de test</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <Label>Type de données</Label>
                                                <Select value={dataType} onValueChange={setDataType}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="person">Personnes</SelectItem>
                                                        <SelectItem value="company">Entreprises</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label>Quantité: {dataCount[0]}</Label>
                                                <Slider value={dataCount} onValueChange={setDataCount} max={50} min={1} step={1} />
                                            </div>
                                        </div>

                                        <Button onClick={generateFakeData} className="w-full">
                                            <Target className="h-4 w-4 mr-2" />
                                            Générer
                                        </Button>

                                        {generatedData.length > 0 && (
                                            <div className="space-y-2">
                                                <Textarea
                                                    value={JSON.stringify(generatedData, null, 2)}
                                                    readOnly
                                                    className="min-h-[120px] font-mono text-xs"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => copyToClipboard(JSON.stringify(generatedData, null, 2))}
                                                    className="w-full"
                                                >
                                                    <Copy className="h-4 w-4 mr-2" />
                                                    Copier JSON
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Onglet Convertisseurs */}
                        <TabsContent value="convertisseurs" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Convertisseur d'unités */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Ruler className="h-5 w-5" />
                                            Convertisseur d'unités
                                        </CardTitle>
                                        <CardDescription>Convertissez entre différentes unités</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>Catégorie</Label>
                                            <Select value={unitCategory} onValueChange={setUnitCategory}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="length">Longueur</SelectItem>
                                                    <SelectItem value="weight">Poids</SelectItem>
                                                    <SelectItem value="temperature">Température</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label>Valeur</Label>
                                            <Input
                                                type="number"
                                                value={unitValue}
                                                onChange={(e) => setUnitValue(e.target.value)}
                                                placeholder="Entrez une valeur"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <Label>De</Label>
                                                <Select value={fromUnit} onValueChange={setFromUnit}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {unitCategory === "length" && (
                                                            <>
                                                                <SelectItem value="meters">Mètres</SelectItem>
                                                                <SelectItem value="feet">Pieds</SelectItem>
                                                                <SelectItem value="inches">Pouces</SelectItem>
                                                                <SelectItem value="centimeters">Centimètres</SelectItem>
                                                                <SelectItem value="kilometers">Kilomètres</SelectItem>
                                                                <SelectItem value="miles">Miles</SelectItem>
                                                            </>
                                                        )}
                                                        {unitCategory === "weight" && (
                                                            <>
                                                                <SelectItem value="kilograms">Kilogrammes</SelectItem>
                                                                <SelectItem value="pounds">Livres</SelectItem>
                                                                <SelectItem value="grams">Grammes</SelectItem>
                                                                <SelectItem value="ounces">Onces</SelectItem>
                                                                <SelectItem value="tons">Tonnes</SelectItem>
                                                            </>
                                                        )}
                                                        {unitCategory === "temperature" && (
                                                            <>
                                                                <SelectItem value="celsius">Celsius</SelectItem>
                                                                <SelectItem value="fahrenheit">Fahrenheit</SelectItem>
                                                                <SelectItem value="kelvin">Kelvin</SelectItem>
                                                            </>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label>Vers</Label>
                                                <Select value={toUnit} onValueChange={setToUnit}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {unitCategory === "length" && (
                                                            <>
                                                                <SelectItem value="meters">Mètres</SelectItem>
                                                                <SelectItem value="feet">Pieds</SelectItem>
                                                                <SelectItem value="inches">Pouces</SelectItem>
                                                                <SelectItem value="centimeters">Centimètres</SelectItem>
                                                                <SelectItem value="kilometers">Kilomètres</SelectItem>
                                                                <SelectItem value="miles">Miles</SelectItem>
                                                            </>
                                                        )}
                                                        {unitCategory === "weight" && (
                                                            <>
                                                                <SelectItem value="kilograms">Kilogrammes</SelectItem>
                                                                <SelectItem value="pounds">Livres</SelectItem>
                                                                <SelectItem value="grams">Grammes</SelectItem>
                                                                <SelectItem value="ounces">Onces</SelectItem>
                                                                <SelectItem value="tons">Tonnes</SelectItem>
                                                            </>
                                                        )}
                                                        {unitCategory === "temperature" && (
                                                            <>
                                                                <SelectItem value="celsius">Celsius</SelectItem>
                                                                <SelectItem value="fahrenheit">Fahrenheit</SelectItem>
                                                                <SelectItem value="kelvin">Kelvin</SelectItem>
                                                            </>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <Button onClick={convertUnits} className="w-full">
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                            Convertir
                                        </Button>

                                        {convertedValue && (
                                            <div className="bg-muted p-3 rounded">
                                                <div className="text-lg font-mono font-bold">{convertedValue}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {unitValue} {fromUnit} = {convertedValue} {toUnit}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Convertisseur d'images */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <ImageIcon className="h-5 w-5" />
                                            Convertisseur d'images
                                        </CardTitle>
                                        <CardDescription>Convertissez et compressez vos images</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>Sélectionner une image</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileSelect}
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                />
                                                <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex-1">
                                                    <Upload className="h-4 w-4 mr-2" />
                                                    Choisir un fichier
                                                </Button>
                                            </div>
                                            {selectedFile && (
                                                <div className="text-sm text-muted-foreground mt-1">
                                                    {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <Label>Format de sortie</Label>
                                                <Select value={outputFormat} onValueChange={setOutputFormat}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="webp">WebP</SelectItem>
                                                        <SelectItem value="jpeg">JPEG</SelectItem>
                                                        <SelectItem value="png">PNG</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label>Qualité: {quality[0]}%</Label>
                                                <Slider value={quality} onValueChange={setQuality} max={100} min={10} step={5} />
                                            </div>
                                        </div>

                                        <Button onClick={convertImage} disabled={!selectedFile} className="w-full">
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                            Convertir
                                        </Button>

                                        {convertedImage && (
                                            <div className="space-y-2">
                                                <img
                                                    src={convertedImage || "/placeholder.svg"}
                                                    alt="Image convertie"
                                                    className="w-full max-h-32 object-contain rounded border"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        const link = document.createElement("a")
                                                        link.download = `converted.${outputFormat}`
                                                        link.href = convertedImage
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
                            </div>
                        </TabsContent>

                        {/* Onglet Analyseurs */}
                        <TabsContent value="analyseurs" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Analyseur de texte */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Type className="h-5 w-5" />
                                            Analyseur de texte
                                        </CardTitle>
                                        <CardDescription>Analysez vos textes en détail</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>Texte à analyser</Label>
                                            <Textarea
                                                value={textToAnalyze}
                                                onChange={(e) => setTextToAnalyze(e.target.value)}
                                                placeholder="Collez votre texte ici..."
                                                className="min-h-[120px]"
                                            />
                                        </div>

                                        <Button onClick={analyzeText} disabled={!textToAnalyze} className="w-full">
                                            <Search className="h-4 w-4 mr-2" />
                                            Analyser
                                        </Button>

                                        {textAnalysis && (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-muted p-3 rounded">
                                                        <div className="text-2xl font-bold">{textAnalysis.characters}</div>
                                                        <div className="text-sm text-muted-foreground">Caractères</div>
                                                    </div>
                                                    <div className="bg-muted p-3 rounded">
                                                        <div className="text-2xl font-bold">{textAnalysis.words}</div>
                                                        <div className="text-sm text-muted-foreground">Mots</div>
                                                    </div>
                                                    <div className="bg-muted p-3 rounded">
                                                        <div className="text-2xl font-bold">{textAnalysis.sentences}</div>
                                                        <div className="text-sm text-muted-foreground">Phrases</div>
                                                    </div>
                                                    <div className="bg-muted p-3 rounded">
                                                        <div className="text-2xl font-bold">{textAnalysis.readingTime} min</div>
                                                        <div className="text-sm text-muted-foreground">Lecture</div>
                                                    </div>
                                                </div>

                                                {textAnalysis.topWords.length > 0 && (
                                                    <div>
                                                        <Label className="text-sm font-medium">Mots les plus fréquents</Label>
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {textAnalysis.topWords.slice(0, 8).map(([word, count]: [string, number]) => (
                                                                <Badge key={word} variant="secondary" className="text-xs">
                                                                    {word} ({count})
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Calculateur de hash */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Hash className="h-5 w-5" />
                                            Calculateur de hash
                                        </CardTitle>
                                        <CardDescription>Générez des empreintes cryptographiques</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>Texte à hasher</Label>
                                            <Textarea
                                                value={textToHash}
                                                onChange={(e) => setTextToHash(e.target.value)}
                                                placeholder="Entrez le texte..."
                                                rows={3}
                                            />
                                        </div>

                                        <Button onClick={calculateHashes} disabled={!textToHash} className="w-full">
                                            <Hash className="h-4 w-4 mr-2" />
                                            Calculer les hash
                                        </Button>

                                        {Object.keys(hashResults).length > 0 && (
                                            <div className="space-y-3">
                                                {Object.entries(hashResults).map(([type, hash]) => (
                                                    <div key={type} className="space-y-1">
                                                        <Label className="text-sm font-medium">{type}</Label>
                                                        <div className="flex gap-2">
                                                            <Input value={hash} readOnly className="font-mono text-xs" />
                                                            <Button size="sm" variant="outline" onClick={() => copyToClipboard(hash)}>
                                                                <Copy className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Onglet Validateurs */}
                        <TabsContent value="validateurs" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Validateur universel */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <CheckCircle className="h-5 w-5" />
                                            Validateur universel
                                        </CardTitle>
                                        <CardDescription>Validez différents formats de données</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>Type de validation</Label>
                                            <Select value={validationType} onValueChange={setValidationType}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="email">Email</SelectItem>
                                                    <SelectItem value="url">URL</SelectItem>
                                                    <SelectItem value="phone">Téléphone</SelectItem>
                                                    <SelectItem value="json">JSON</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label>Données à valider</Label>
                                            <Textarea
                                                value={validationText}
                                                onChange={(e) => setValidationText(e.target.value)}
                                                placeholder={`Entrez ${
                                                    validationType === "email"
                                                        ? "une adresse email"
                                                        : validationType === "url"
                                                            ? "une URL"
                                                            : validationType === "phone"
                                                                ? "un numéro de téléphone"
                                                                : "du JSON"
                                                }...`}
                                                rows={3}
                                            />
                                        </div>

                                        <Button onClick={validateInput} disabled={!validationText} className="w-full">
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Valider
                                        </Button>

                                        {validationResult && (
                                            <div
                                                className={`p-3 rounded border ${
                                                    validationResult.valid
                                                        ? "bg-green-50 border-green-200 text-green-800"
                                                        : "bg-red-50 border-red-200 text-red-800"
                                                }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle
                                                        className={`h-4 w-4 ${validationResult.valid ? "text-green-600" : "text-red-600"}`}
                                                    />
                                                    <span className="font-medium">{validationResult.message}</span>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Onglet Calculateurs */}
                        <TabsContent value="calculateurs" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Calculateur de dates */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5" />
                                            Calculateur de dates
                                        </CardTitle>
                                        <CardDescription>Calculez la différence entre deux dates</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <Label>Date de début</Label>
                                                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>Date de fin</Label>
                                                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                            </div>
                                        </div>

                                        <Button onClick={calculateDateDifference} disabled={!startDate || !endDate} className="w-full">
                                            <Calculator className="h-4 w-4 mr-2" />
                                            Calculer
                                        </Button>

                                        {dateCalculation && (
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-muted p-3 rounded text-center">
                                                    <div className="text-2xl font-bold">{dateCalculation.days}</div>
                                                    <div className="text-sm text-muted-foreground">Jours</div>
                                                </div>
                                                <div className="bg-muted p-3 rounded text-center">
                                                    <div className="text-2xl font-bold">{dateCalculation.weeks}</div>
                                                    <div className="text-sm text-muted-foreground">Semaines</div>
                                                </div>
                                                <div className="bg-muted p-3 rounded text-center">
                                                    <div className="text-2xl font-bold">{dateCalculation.months}</div>
                                                    <div className="text-sm text-muted-foreground">Mois</div>
                                                </div>
                                                <div className="bg-muted p-3 rounded text-center">
                                                    <div className="text-2xl font-bold">{dateCalculation.businessDays}</div>
                                                    <div className="text-sm text-muted-foreground">Jours ouvrés</div>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Onglet Créatif */}
                        <TabsContent value="creatif" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Canvas créatif */}
                                <Card className="md:col-span-2">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Paintbrush className="h-5 w-5" />
                                            Canvas créatif
                                        </CardTitle>
                                        <CardDescription>Espace de dessin HTML5 Canvas avec outils avancés</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <DrawingCanvas />
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Section Technologies */}
                    <div className="mt-16 text-center">
                        <h2 className="text-2xl font-bold mb-6">Technologies Utilisées</h2>
                        <div className="flex flex-wrap justify-center gap-2">
                            {[
                                "React",
                                "TypeScript",
                                "Next.js",
                                "Tailwind CSS",
                                "Shadcn/ui",
                                "Web Crypto API",
                                "Canvas API",
                                "HTML5",
                                "CSS3",
                                "JavaScript",
                                "Web APIs",
                                "Local Storage",
                                "File API",
                                "Blob API",
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
