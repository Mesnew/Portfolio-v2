"use client"

import { useState, useEffect } from "react"
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
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Dice3D } from "@/components/dice-3d"
import { QRGenerator } from "@/components/qr-generator"
import { DrawingCanvas } from "@/components/drawing-canvas"
import {
    Calculator,
    Key,
    Palette,
    Timer,
    Gamepad2,
    Code,
    Paintbrush,
    FileText,
    Play,
    Pause,
    RotateCcw,
    Copy,
    RefreshCw,
    Zap,
    Target,
    Dice1,
    Hash,
    Download,
    QrCode,
    Thermometer,
    Clock,
    Shuffle,
} from "lucide-react"

export default function LaboratoirePage() {
    // États pour la calculatrice
    const [calculatorDisplay, setCalculatorDisplay] = useState("0")
    const [previousValue, setPreviousValue] = useState("")
    const [operation, setOperation] = useState("")
    const [waitingForOperand, setWaitingForOperand] = useState(false)

    // États pour le générateur de mots de passe
    const [passwordLength, setPasswordLength] = useState([12])
    const [generatedPassword, setGeneratedPassword] = useState("")
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(true)

    // États pour la palette de couleurs
    const [selectedColor, setSelectedColor] = useState("#3b82f6")
    const [colorHistory, setColorHistory] = useState(["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"])

    // États pour le chronomètre
    const [timerSeconds, setTimerSeconds] = useState(0)
    const [timerRunning, setTimerRunning] = useState(false)
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)

    // États pour le jeu de devinette
    const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1)
    const [guess, setGuess] = useState("")
    const [attempts, setAttempts] = useState(0)
    const [gameMessage, setGameMessage] = useState("Devinez un nombre entre 1 et 100 !")
    const [gameWon, setGameWon] = useState(false)

    // États pour le simulateur de progression
    const [progress, setProgress] = useState(0)
    const [progressRunning, setProgressRunning] = useState(false)

    // États pour le générateur Lorem Ipsum
    const [loremParagraphs, setLoremParagraphs] = useState([3])
    const [generatedLorem, setGeneratedLorem] = useState("")

    // États pour le convertisseur d'unités
    const [fromValue, setFromValue] = useState("")
    const [fromUnit, setFromUnit] = useState("celsius")
    const [toUnit, setToUnit] = useState("fahrenheit")
    const [convertedValue, setConvertedValue] = useState("")

    // États pour l'encodeur/décodeur Base64
    const [textToEncode, setTextToEncode] = useState("")
    const [encodedText, setEncodedText] = useState("")
    const [textToDecode, setTextToDecode] = useState("")
    const [decodedText, setDecodedText] = useState("")

    // États pour le dé 3D
    const [diceValue, setDiceValue] = useState(1)
    const [isDiceRolling, setIsDiceRolling] = useState(false)
    const [diceHistory, setDiceHistory] = useState<number[]>([])

    // États pour l'horloge mondiale
    const [selectedTimezone, setSelectedTimezone] = useState("Europe/Paris")
    const [currentTime, setCurrentTime] = useState(new Date())

    // Effet pour l'horloge
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    // Fonctions pour la calculatrice
    const inputNumber = (num: string) => {
        if (waitingForOperand) {
            setCalculatorDisplay(num)
            setWaitingForOperand(false)
        } else {
            setCalculatorDisplay(calculatorDisplay === "0" ? num : calculatorDisplay + num)
        }
    }

    const inputOperation = (nextOperation: string) => {
        const inputValue = Number.parseFloat(calculatorDisplay)

        if (previousValue === "") {
            setPreviousValue(calculatorDisplay)
        } else if (operation) {
            const currentValue = Number.parseFloat(previousValue)
            const newValue = calculate(currentValue, inputValue, operation)

            setCalculatorDisplay(String(newValue))
            setPreviousValue(String(newValue))
        }

        setWaitingForOperand(true)
        setOperation(nextOperation)
    }

    const calculate = (firstValue: number, secondValue: number, operation: string) => {
        switch (operation) {
            case "+":
                return firstValue + secondValue
            case "-":
                return firstValue - secondValue
            case "*":
                return firstValue * secondValue
            case "/":
                return firstValue / secondValue
            case "=":
                return secondValue
            default:
                return secondValue
        }
    }

    const performCalculation = () => {
        const inputValue = Number.parseFloat(calculatorDisplay)

        if (previousValue !== "" && operation) {
            const currentValue = Number.parseFloat(previousValue)
            const newValue = calculate(currentValue, inputValue, operation)

            setCalculatorDisplay(String(newValue))
            setPreviousValue("")
            setOperation("")
            setWaitingForOperand(true)
        }
    }

    const clearCalculator = () => {
        setCalculatorDisplay("0")
        setPreviousValue("")
        setOperation("")
        setWaitingForOperand(false)
    }

    // Fonction pour générer un mot de passe
    const generatePassword = () => {
        let chars = ""
        if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz"
        if (includeNumbers) chars += "0123456789"
        if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"

        if (chars === "") {
            setGeneratedPassword("Sélectionnez au moins un type de caractère")
            return
        }

        let password = ""
        for (let i = 0; i < passwordLength[0]; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setGeneratedPassword(password)
    }

    // Fonction pour copier dans le presse-papiers
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    // Fonction pour générer une couleur aléatoire
    const generateRandomColor = () => {
        const randomColor =
            "#" +
            Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")
        setSelectedColor(randomColor)
        if (!colorHistory.includes(randomColor)) {
            setColorHistory([randomColor, ...colorHistory.slice(0, 4)])
        }
    }

    // Fonctions pour le chronomètre
    const startTimer = () => {
        if (!timerRunning) {
            setTimerRunning(true)
            const interval = setInterval(() => {
                setTimerSeconds((prev) => prev + 1)
            }, 1000)
            setTimerInterval(interval)
        }
    }

    const pauseTimer = () => {
        if (timerRunning && timerInterval) {
            clearInterval(timerInterval)
            setTimerRunning(false)
            setTimerInterval(null)
        }
    }

    const resetTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval)
        }
        setTimerRunning(false)
        setTimerInterval(null)
        setTimerSeconds(0)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    // Fonctions pour le jeu de devinette
    const makeGuess = () => {
        const guessNumber = Number.parseInt(guess)
        if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
            setGameMessage("Veuillez entrer un nombre entre 1 et 100")
            return
        }

        const newAttempts = attempts + 1
        setAttempts(newAttempts)

        if (guessNumber === targetNumber) {
            setGameMessage(`🎉 Bravo ! Vous avez trouvé ${targetNumber} en ${newAttempts} tentative(s) !`)
            setGameWon(true)
        } else if (guessNumber < targetNumber) {
            setGameMessage(`📈 Trop petit ! Tentative ${newAttempts}`)
        } else {
            setGameMessage(`📉 Trop grand ! Tentative ${newAttempts}`)
        }
        setGuess("")
    }

    const resetGame = () => {
        setTargetNumber(Math.floor(Math.random() * 100) + 1)
        setGuess("")
        setAttempts(0)
        setGameMessage("Devinez un nombre entre 1 et 100 !")
        setGameWon(false)
    }

    // Fonction pour le simulateur de progression
    const startProgress = () => {
        if (progressRunning) return

        setProgressRunning(true)
        setProgress(0)

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setProgressRunning(false)
                    return 100
                }
                return prev + Math.random() * 5
            })
        }, 100)
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
        for (let p = 0; p < loremParagraphs[0]; p++) {
            const sentenceCount = Math.floor(Math.random() * 5) + 3
            let paragraph = ""

            for (let s = 0; s < sentenceCount; s++) {
                const wordCount = Math.floor(Math.random() * 10) + 5
                let sentence = ""

                for (let w = 0; w < wordCount; w++) {
                    const word = loremWords[Math.floor(Math.random() * loremWords.length)]
                    sentence += (w === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + " "
                }

                paragraph += sentence.trim() + ". "
            }

            result += paragraph.trim() + "\n\n"
        }

        setGeneratedLorem(result.trim())
    }

    // Fonctions pour le convertisseur d'unités
    const convertTemperature = () => {
        const value = Number.parseFloat(fromValue)
        if (isNaN(value)) {
            setConvertedValue("Valeur invalide")
            return
        }

        let result = 0
        if (fromUnit === "celsius" && toUnit === "fahrenheit") {
            result = (value * 9) / 5 + 32
        } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
            result = ((value - 32) * 5) / 9
        } else if (fromUnit === "celsius" && toUnit === "kelvin") {
            result = value + 273.15
        } else if (fromUnit === "kelvin" && toUnit === "celsius") {
            result = value - 273.15
        } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
            result = ((value - 32) * 5) / 9 + 273.15
        } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
            result = ((value - 273.15) * 9) / 5 + 32
        } else {
            result = value
        }

        setConvertedValue(result.toFixed(2))
    }

    // Fonctions pour l'encodeur/décodeur Base64
    const encodeBase64 = () => {
        try {
            const encoded = btoa(textToEncode)
            setEncodedText(encoded)
        } catch (error) {
            setEncodedText("Erreur d'encodage")
        }
    }

    const decodeBase64 = () => {
        try {
            const decoded = atob(textToDecode)
            setDecodedText(decoded)
        } catch (error) {
            setDecodedText("Erreur de décodage")
        }
    }

    // Fonctions pour le dé 3D
    const handleDiceRoll = (value: number) => {
        setIsDiceRolling(true)
        setTimeout(() => {
            setDiceValue(value)
            setDiceHistory([value, ...diceHistory.slice(0, 9)])
            setIsDiceRolling(false)
        }, 1000)
    }

    // Fonction pour formater l'heure selon le fuseau horaire
    const formatTimeForTimezone = (timezone: string) => {
        return new Intl.DateTimeFormat("fr-FR", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(currentTime)
    }

    const timezones = [
        { value: "Europe/Paris", label: "Paris (France)" },
        { value: "America/New_York", label: "New York (USA)" },
        { value: "America/Los_Angeles", label: "Los Angeles (USA)" },
        { value: "Asia/Tokyo", label: "Tokyo (Japon)" },
        { value: "Asia/Shanghai", label: "Shanghai (Chine)" },
        { value: "Europe/London", label: "Londres (UK)" },
        { value: "Australia/Sydney", label: "Sydney (Australie)" },
        { value: "America/Sao_Paulo", label: "São Paulo (Brésil)" },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <PlanetBackground3D planetType="jupiter" />
            <Header />

            <main className="flex-1 relative z-10">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                            Laboratoire
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Explorez mes outils interactifs et expérimentations créatives
                        </p>
                    </div>

                    <Tabs defaultValue="outils" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-8">
                            <TabsTrigger value="outils" className="flex items-center gap-2">
                                <Calculator className="h-4 w-4" />
                                Outils
                            </TabsTrigger>
                            <TabsTrigger value="jeux" className="flex items-center gap-2">
                                <Gamepad2 className="h-4 w-4" />
                                Mini-Jeux
                            </TabsTrigger>
                            <TabsTrigger value="demos" className="flex items-center gap-2">
                                <Code className="h-4 w-4" />
                                Démos Tech
                            </TabsTrigger>
                            <TabsTrigger value="creatif" className="flex items-center gap-2">
                                <Paintbrush className="h-4 w-4" />
                                Créatif
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="outils" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Calculatrice */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Calculator className="h-5 w-5" />
                                            Calculatrice
                                        </CardTitle>
                                        <CardDescription>Calculatrice complète et fonctionnelle</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="bg-black text-white p-4 rounded text-right text-2xl font-mono min-h-[60px] flex items-center justify-end">
                                            {calculatorDisplay}
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            <Button variant="outline" onClick={clearCalculator} className="bg-red-500 text-white">
                                                C
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => inputOperation("/")}
                                                className="bg-orange-500 text-white"
                                            >
                                                ÷
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => inputOperation("*")}
                                                className="bg-orange-500 text-white"
                                            >
                                                ×
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => inputOperation("-")}
                                                className="bg-orange-500 text-white"
                                            >
                                                -
                                            </Button>

                                            <Button variant="outline" onClick={() => inputNumber("7")}>
                                                7
                                            </Button>
                                            <Button variant="outline" onClick={() => inputNumber("8")}>
                                                8
                                            </Button>
                                            <Button variant="outline" onClick={() => inputNumber("9")}>
                                                9
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => inputOperation("+")}
                                                className="bg-orange-500 text-white row-span-2"
                                            >
                                                +
                                            </Button>

                                            <Button variant="outline" onClick={() => inputNumber("4")}>
                                                4
                                            </Button>
                                            <Button variant="outline" onClick={() => inputNumber("5")}>
                                                5
                                            </Button>
                                            <Button variant="outline" onClick={() => inputNumber("6")}>
                                                6
                                            </Button>

                                            <Button variant="outline" onClick={() => inputNumber("1")}>
                                                1
                                            </Button>
                                            <Button variant="outline" onClick={() => inputNumber("2")}>
                                                2
                                            </Button>
                                            <Button variant="outline" onClick={() => inputNumber("3")}>
                                                3
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={performCalculation}
                                                className="bg-blue-500 text-white row-span-2"
                                            >
                                                =
                                            </Button>

                                            <Button variant="outline" onClick={() => inputNumber("0")} className="col-span-2">
                                                0
                                            </Button>
                                            <Button variant="outline" onClick={() => inputNumber(".")}>
                                                .
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Générateur de mots de passe avancé */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Key className="h-5 w-5" />
                                            Générateur de mots de passe
                                        </CardTitle>
                                        <CardDescription>Créez des mots de passe sécurisés personnalisés</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>Longueur: {passwordLength[0]} caractères</Label>
                                            <Slider
                                                value={passwordLength}
                                                onValueChange={setPasswordLength}
                                                max={50}
                                                min={4}
                                                step={1}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id="uppercase"
                                                    checked={includeUppercase}
                                                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                                                />
                                                <Label htmlFor="uppercase">Majuscules (A-Z)</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id="lowercase"
                                                    checked={includeLowercase}
                                                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                                                />
                                                <Label htmlFor="lowercase">Minuscules (a-z)</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id="numbers"
                                                    checked={includeNumbers}
                                                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                                                />
                                                <Label htmlFor="numbers">Chiffres (0-9)</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id="symbols"
                                                    checked={includeSymbols}
                                                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                                                />
                                                <Label htmlFor="symbols">Symboles (!@#$...)</Label>
                                            </div>
                                        </div>

                                        <Button onClick={generatePassword} className="w-full">
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                            Générer
                                        </Button>

                                        {generatedPassword && (
                                            <div className="space-y-2">
                                                <Textarea
                                                    value={generatedPassword}
                                                    readOnly
                                                    className="font-mono text-sm resize-none"
                                                    rows={3}
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => copyToClipboard(generatedPassword)}
                                                    className="w-full"
                                                >
                                                    <Copy className="h-4 w-4 mr-2" />
                                                    Copier
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Palette de couleurs avancée */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Palette className="h-5 w-5" />
                                            Palette de couleurs
                                        </CardTitle>
                                        <CardDescription>Sélectionnez et générez des couleurs</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <input
                                                type="color"
                                                value={selectedColor}
                                                onChange={(e) => setSelectedColor(e.target.value)}
                                                className="w-full h-16 rounded border cursor-pointer"
                                            />
                                            <Input value={selectedColor} readOnly className="font-mono" />
                                            <div className="text-xs text-muted-foreground">
                                                RGB: {Number.parseInt(selectedColor.slice(1, 3), 16)},{" "}
                                                {Number.parseInt(selectedColor.slice(3, 5), 16)},{" "}
                                                {Number.parseInt(selectedColor.slice(5, 7), 16)}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button onClick={generateRandomColor} className="flex-1">
                                                <RefreshCw className="h-4 w-4 mr-2" />
                                                Aléatoire
                                            </Button>
                                            <Button variant="outline" onClick={() => copyToClipboard(selectedColor)} className="flex-1">
                                                <Copy className="h-4 w-4 mr-2" />
                                                Copier
                                            </Button>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium">Historique</Label>
                                            <div className="grid grid-cols-5 gap-2 mt-2">
                                                {colorHistory.map((color, index) => (
                                                    <div
                                                        key={index}
                                                        className="aspect-square rounded cursor-pointer border-2 border-transparent hover:border-white transition-all"
                                                        style={{ backgroundColor: color }}
                                                        onClick={() => setSelectedColor(color)}
                                                        title={color}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Convertisseur d'unités */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Thermometer className="h-5 w-5" />
                                            Convertisseur de température
                                        </CardTitle>
                                        <CardDescription>Convertissez entre Celsius, Fahrenheit et Kelvin</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Valeur à convertir</Label>
                                            <Input
                                                type="number"
                                                value={fromValue}
                                                onChange={(e) => setFromValue(e.target.value)}
                                                placeholder="Entrez une valeur"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <Label>De</Label>
                                                <select
                                                    value={fromUnit}
                                                    onChange={(e) => setFromUnit(e.target.value)}
                                                    className="w-full p-2 border rounded"
                                                >
                                                    <option value="celsius">Celsius (°C)</option>
                                                    <option value="fahrenheit">Fahrenheit (°F)</option>
                                                    <option value="kelvin">Kelvin (K)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <Label>Vers</Label>
                                                <select
                                                    value={toUnit}
                                                    onChange={(e) => setToUnit(e.target.value)}
                                                    className="w-full p-2 border rounded"
                                                >
                                                    <option value="celsius">Celsius (°C)</option>
                                                    <option value="fahrenheit">Fahrenheit (°F)</option>
                                                    <option value="kelvin">Kelvin (K)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <Button onClick={convertTemperature} className="w-full">
                                            Convertir
                                        </Button>

                                        {convertedValue && (
                                            <div className="bg-muted p-3 rounded">
                                                <div className="text-lg font-mono">{convertedValue}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {fromValue} {fromUnit} = {convertedValue} {toUnit}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Encodeur/Décodeur Base64 */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Hash className="h-5 w-5" />
                                            Encodeur/Décodeur Base64
                                        </CardTitle>
                                        <CardDescription>Encodez et décodez du texte en Base64</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Texte à encoder</Label>
                                            <Textarea
                                                value={textToEncode}
                                                onChange={(e) => setTextToEncode(e.target.value)}
                                                placeholder="Entrez le texte à encoder"
                                                rows={2}
                                            />
                                            <Button onClick={encodeBase64} className="w-full">
                                                Encoder
                                            </Button>
                                            {encodedText && (
                                                <div className="bg-muted p-2 rounded font-mono text-sm break-all">{encodedText}</div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Base64 à décoder</Label>
                                            <Textarea
                                                value={textToDecode}
                                                onChange={(e) => setTextToDecode(e.target.value)}
                                                placeholder="Entrez le Base64 à décoder"
                                                rows={2}
                                            />
                                            <Button onClick={decodeBase64} className="w-full">
                                                Décoder
                                            </Button>
                                            {decodedText && <div className="bg-muted p-2 rounded text-sm">{decodedText}</div>}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Horloge mondiale */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Clock className="h-5 w-5" />
                                            Horloge mondiale
                                        </CardTitle>
                                        <CardDescription>Consultez l'heure dans différents fuseaux horaires</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>Fuseau horaire</Label>
                                            <select
                                                value={selectedTimezone}
                                                onChange={(e) => setSelectedTimezone(e.target.value)}
                                                className="w-full p-2 border rounded"
                                            >
                                                {timezones.map((tz) => (
                                                    <option key={tz.value} value={tz.value}>
                                                        {tz.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="text-center">
                                            <div className="text-2xl font-mono font-bold">{formatTimeForTimezone(selectedTimezone)}</div>
                                            <div className="text-sm text-muted-foreground mt-2">
                                                {timezones.find((tz) => tz.value === selectedTimezone)?.label}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="jeux" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Chronomètre */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Timer className="h-5 w-5" />
                                            Chronomètre
                                        </CardTitle>
                                        <CardDescription>Mesurez le temps avec précision</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-center">
                                            <div className="text-6xl font-mono font-bold mb-4">{formatTime(timerSeconds)}</div>
                                            <div className="flex gap-2 justify-center">
                                                <Button onClick={startTimer} disabled={timerRunning} className="flex items-center gap-2">
                                                    <Play className="h-4 w-4" />
                                                    Start
                                                </Button>
                                                <Button
                                                    onClick={pauseTimer}
                                                    disabled={!timerRunning}
                                                    variant="outline"
                                                    className="flex items-center gap-2 bg-transparent"
                                                >
                                                    <Pause className="h-4 w-4" />
                                                    Pause
                                                </Button>
                                                <Button onClick={resetTimer} variant="destructive" className="flex items-center gap-2">
                                                    <RotateCcw className="h-4 w-4" />
                                                    Reset
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Jeu de devinette */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Target className="h-5 w-5" />
                                            Jeu de devinette
                                        </CardTitle>
                                        <CardDescription>Devinez le nombre entre 1 et 100</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-center">
                                            <div className="text-lg mb-4">{gameMessage}</div>
                                            <div className="text-sm text-muted-foreground mb-4">Tentatives: {attempts}</div>
                                        </div>

                                        {!gameWon && (
                                            <div className="space-y-2">
                                                <Input
                                                    type="number"
                                                    value={guess}
                                                    onChange={(e) => setGuess(e.target.value)}
                                                    placeholder="Votre nombre (1-100)"
                                                    min="1"
                                                    max="100"
                                                    onKeyPress={(e) => e.key === "Enter" && makeGuess()}
                                                />
                                                <Button onClick={makeGuess} className="w-full">
                                                    <Target className="h-4 w-4 mr-2" />
                                                    Deviner
                                                </Button>
                                            </div>
                                        )}

                                        <Button onClick={resetGame} variant="outline" className="w-full bg-transparent">
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                            Nouvelle partie
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Lanceur de dés 3D */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Dice1 className="h-5 w-5" />
                                            Lanceur de dés 3D
                                        </CardTitle>
                                        <CardDescription>Dé virtuel avec animation 3D</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Dice3D onRoll={handleDiceRoll} isRolling={isDiceRolling} />

                                        {diceHistory.length > 0 && (
                                            <div>
                                                <Label className="text-sm font-medium">Historique des lancers</Label>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {diceHistory.map((value, index) => (
                                                        <Badge key={index} variant="secondary" className="text-xs">
                                                            {value}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Générateur de nombres aléatoires */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Shuffle className="h-5 w-5" />
                                            Générateur de nombres
                                        </CardTitle>
                                        <CardDescription>Générez des nombres aléatoires</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <Label>Min</Label>
                                                <Input type="number" defaultValue="1" id="min-random" />
                                            </div>
                                            <div>
                                                <Label>Max</Label>
                                                <Input type="number" defaultValue="100" id="max-random" />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <div className="text-4xl font-bold mb-4" id="random-result">
                                                {Math.floor(Math.random() * 100) + 1}
                                            </div>
                                            <Button
                                                onClick={() => {
                                                    const min = Number((document.getElementById("min-random") as HTMLInputElement)?.value) || 1
                                                    const max = Number((document.getElementById("max-random") as HTMLInputElement)?.value) || 100
                                                    const result = Math.floor(Math.random() * (max - min + 1)) + min
                                                    const element = document.getElementById("random-result")
                                                    if (element) element.textContent = result.toString()
                                                }}
                                                className="w-full"
                                            >
                                                <Shuffle className="h-4 w-4 mr-2" />
                                                Générer
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="demos" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Simulateur de progression */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Zap className="h-5 w-5" />
                                            Simulateur de progression
                                        </CardTitle>
                                        <CardDescription>Démonstration d'une barre de progression animée</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Progression</span>
                                                <span>{Math.round(progress)}%</span>
                                            </div>
                                            <Progress value={progress} className="w-full h-4" />
                                        </div>

                                        <Button onClick={startProgress} disabled={progressRunning} className="w-full">
                                            <Play className="h-4 w-4 mr-2" />
                                            {progressRunning ? "En cours..." : "Démarrer la simulation"}
                                        </Button>

                                        <div className="text-xs text-muted-foreground text-center">
                                            Simulation d'un processus de chargement avec vitesse variable
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Générateur de QR Code */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <QrCode className="h-5 w-5" />
                                            Générateur de QR Code
                                        </CardTitle>
                                        <CardDescription>Créez des QR codes personnalisés</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <QRGenerator />
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="creatif" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Générateur Lorem Ipsum */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="h-5 w-5" />
                                            Générateur Lorem Ipsum
                                        </CardTitle>
                                        <CardDescription>Générez du texte placeholder personnalisé</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>Nombre de paragraphes: {loremParagraphs[0]}</Label>
                                            <Slider
                                                value={loremParagraphs}
                                                onValueChange={setLoremParagraphs}
                                                max={10}
                                                min={1}
                                                step={1}
                                                className="mt-2"
                                            />
                                        </div>

                                        <Button onClick={generateLorem} className="w-full">
                                            <FileText className="h-4 w-4 mr-2" />
                                            Générer Lorem Ipsum
                                        </Button>

                                        {generatedLorem && (
                                            <div className="space-y-2">
                                                <Textarea value={generatedLorem} readOnly className="min-h-[200px] text-sm" />
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => copyToClipboard(generatedLorem)}
                                                        className="flex-1"
                                                    >
                                                        <Copy className="h-4 w-4 mr-2" />
                                                        Copier
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            const blob = new Blob([generatedLorem], { type: "text/plain" })
                                                            const url = URL.createObjectURL(blob)
                                                            const a = document.createElement("a")
                                                            a.href = url
                                                            a.download = "lorem-ipsum.txt"
                                                            a.click()
                                                        }}
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

                                {/* Canvas créatif */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Paintbrush className="h-5 w-5" />
                                            Canvas créatif
                                        </CardTitle>
                                        <CardDescription>Espace de dessin HTML5 Canvas</CardDescription>
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
                                "JavaScript",
                                "HTML5",
                                "CSS3",
                                "Canvas API",
                                "Web APIs",
                                "Local Storage",
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
