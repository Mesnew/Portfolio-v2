"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlanetBackground3D } from "@/components/PlanetBackground3D"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calculator, Key, Palette, Timer, Gamepad2, Code, Paintbrush, FileText } from "lucide-react"

export default function LaboratoirePage() {
    // États pour les différents outils
    const [calculatorDisplay, setCalculatorDisplay] = useState("0")
    const [passwordLength, setPasswordLength] = useState([12])
    const [generatedPassword, setGeneratedPassword] = useState("")
    const [selectedColor, setSelectedColor] = useState("#3b82f6")
    const [timerSeconds, setTimerSeconds] = useState(0)
    const [timerRunning, setTimerRunning] = useState(false)
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)

    // Fonctions pour la calculatrice
    const handleCalculatorInput = (value: string) => {
        if (calculatorDisplay === "0" && value !== ".") {
            setCalculatorDisplay(value)
        } else {
            setCalculatorDisplay(calculatorDisplay + value)
        }
    }

    const calculateResult = () => {
        try {
            const result = eval(calculatorDisplay)
            setCalculatorDisplay(result.toString())
        } catch (error) {
            setCalculatorDisplay("Erreur")
        }
    }

    const clearCalculator = () => {
        setCalculatorDisplay("0")
    }

    // Fonction pour générer un mot de passe
    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
        let password = ""
        for (let i = 0; i < passwordLength[0]; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setGeneratedPassword(password)
    }

    // Fonction pour générer une couleur aléatoire
    const generateRandomColor = () => {
        const randomColor =
            "#" +
            Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")
        setSelectedColor(randomColor)
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
                                        <CardDescription>Calculatrice simple et fonctionnelle</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="bg-muted p-4 rounded text-right text-2xl font-mono">{calculatorDisplay}</div>
                                        <div className="grid grid-cols-4 gap-2">
                                            <Button variant="outline" onClick={clearCalculator}>
                                                C
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalculatorInput("/")}>
                                                /
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalculatorInput("*")}>
                                                ×
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalculatorInput("-")}>
                                                -
                                            </Button>

                                            <Button variant="outline" onClick={() => handleCalculatorInput("7")}>
                                                7
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalculatorInput("8")}>
                                                8
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalculatorInput("9")}>
                                                9
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalculatorInput("+")}>
                                                +
                                            </Button>

                                            <Button variant="outline" onClick={() => handleCalculatorInput("4")}>
                                                4
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalculatorInput("5")}>
                                                5
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalculatorInput("6")}>
                                                6
                                            </Button>
                                            <Button variant="outline" onClick={calculateResult} className="row-span-2 bg-transparent">
                                                =
                                            </Button>

                                            <Button variant="outline" onClick={() => handleCalculatorInput("1")}>
                                                1
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalculatorInput("2")}>
                                                2
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalculatorInput("3")}>
                                                3
                                            </Button>

                                            <Button variant="outline" onClick={() => handleCalculatorInput("0")} className="col-span-2">
                                                0
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalculatorInput(".")}>
                                                .
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Générateur de mots de passe */}
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
                                                max={50}
                                                min={4}
                                                step={1}
                                                className="mt-2"
                                            />
                                        </div>
                                        <Button onClick={generatePassword} className="w-full">
                                            Générer
                                        </Button>
                                        {generatedPassword && (
                                            <div className="bg-muted p-3 rounded font-mono text-sm break-all">{generatedPassword}</div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Palette de couleurs */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Palette className="h-5 w-5" />
                                            Palette de couleurs
                                        </CardTitle>
                                        <CardDescription>Sélectionnez et générez des couleurs</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="color"
                                                value={selectedColor}
                                                onChange={(e) => setSelectedColor(e.target.value)}
                                                className="w-16 h-16 rounded border"
                                            />
                                            <div className="flex-1">
                                                <div className="font-mono text-sm">{selectedColor}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    RGB: {Number.parseInt(selectedColor.slice(1, 3), 16)},{" "}
                                                    {Number.parseInt(selectedColor.slice(3, 5), 16)},{" "}
                                                    {Number.parseInt(selectedColor.slice(5, 7), 16)}
                                                </div>
                                            </div>
                                        </div>
                                        <Button onClick={generateRandomColor} className="w-full">
                                            Couleur aléatoire
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="jeux" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            <div className="text-4xl font-mono font-bold">{formatTime(timerSeconds)}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button onClick={startTimer} disabled={timerRunning} className="flex-1">
                                                Start
                                            </Button>
                                            <Button
                                                onClick={pauseTimer}
                                                disabled={!timerRunning}
                                                variant="outline"
                                                className="flex-1 bg-transparent"
                                            >
                                                Pause
                                            </Button>
                                            <Button onClick={resetTimer} variant="destructive" className="flex-1">
                                                Reset
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Jeu de devinette */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Gamepad2 className="h-5 w-5" />
                                            Jeu de devinette
                                        </CardTitle>
                                        <CardDescription>Devinez le nombre entre 1 et 100</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8">
                                            <Badge variant="secondary">En développement</Badge>
                                            <p className="text-sm text-muted-foreground mt-2">Bientôt disponible !</p>
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
                                        <CardTitle>Simulateur de progression</CardTitle>
                                        <CardDescription>Démonstration d'une barre de progression</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8">
                                            <Badge variant="secondary">En développement</Badge>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                Animation de progression en cours de développement
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Intégration API */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Intégration API</CardTitle>
                                        <CardDescription>Démonstration d'appels API</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8">
                                            <Badge variant="secondary">En développement</Badge>
                                            <p className="text-sm text-muted-foreground mt-2">Intégration avec des APIs externes</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="creatif" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        <div className="text-center py-8">
                                            <Badge variant="secondary">En développement</Badge>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                Outil de dessin interactif en cours de développement
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Générateur Lorem */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="h-5 w-5" />
                                            Générateur Lorem
                                        </CardTitle>
                                        <CardDescription>Générez du texte placeholder</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8">
                                            <Badge variant="secondary">En développement</Badge>
                                            <p className="text-sm text-muted-foreground mt-2">Générateur de texte Lorem Ipsum</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    )
}
