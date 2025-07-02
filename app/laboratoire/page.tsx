"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlanetBackground3D } from "@/components/PlanetBackground3D"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
    Calculator,
    Key,
    Palette,
    Timer,
    Play,
    Pause,
    RotateCcw,
    Gamepad2,
    Code,
    Paintbrush,
    FileText,
    Zap,
} from "lucide-react"

export default function LaboratoirePage() {
    // États pour la calculatrice
    const [calcDisplay, setCalcDisplay] = useState("0")
    const [calcPrevious, setCalcPrevious] = useState("")
    const [calcOperation, setCalcOperation] = useState("")

    // États pour le générateur de mot de passe
    const [passwordLength, setPasswordLength] = useState([12])
    const [generatedPassword, setGeneratedPassword] = useState("")

    // États pour la palette de couleurs
    const [selectedColor, setSelectedColor] = useState("#3b82f6")
    const [randomColor, setRandomColor] = useState("#ff6b6b")

    // États pour le chronomètre
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    // Fonctions calculatrice
    const handleCalcNumber = (num: string) => {
        setCalcDisplay(calcDisplay === "0" ? num : calcDisplay + num)
    }

    const handleCalcOperation = (op: string) => {
        setCalcPrevious(calcDisplay)
        setCalcOperation(op)
        setCalcDisplay("0")
    }

    const handleCalcEquals = () => {
        const prev = Number.parseFloat(calcPrevious)
        const current = Number.parseFloat(calcDisplay)
        let result = 0

        switch (calcOperation) {
            case "+":
                result = prev + current
                break
            case "-":
                result = prev - current
                break
            case "*":
                result = prev * current
                break
            case "/":
                result = prev / current
                break
            default:
                return
        }

        setCalcDisplay(result.toString())
        setCalcPrevious("")
        setCalcOperation("")
    }

    const handleCalcClear = () => {
        setCalcDisplay("0")
        setCalcPrevious("")
        setCalcOperation("")
    }

    // Fonction générateur de mot de passe
    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
        let password = ""
        for (let i = 0; i < passwordLength[0]; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setGeneratedPassword(password)
    }

    // Fonction générateur de couleur aléatoire
    const generateRandomColor = () => {
        const color =
            "#" +
            Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")
        setRandomColor(color)
    }

    // Fonctions chronomètre
    const startTimer = () => {
        setIsRunning(true)
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1)
        }, 1000)

        if (!isRunning) {
            // Store interval ID for cleanup
            ;(window as any).timerInterval = interval
        }
    }

    const pauseTimer = () => {
        setIsRunning(false)
        clearInterval((window as any).timerInterval)
    }

    const resetTimer = () => {
        setTime(0)
        setIsRunning(false)
        clearInterval((window as any).timerInterval)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return (
        <>
            <PlanetBackground3D planetType="jupiter" />
            <Header />
            <main className="min-h-screen pt-20">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                            Laboratoire
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Espace d'expérimentation et de démonstration de mes compétences techniques
                        </p>
                    </div>

                    <Tabs defaultValue="outils" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-8">
                            <TabsTrigger value="outils" className="flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Outils
                            </TabsTrigger>
                            <TabsTrigger value="jeux" className="flex items-center gap-2">
                                <Gamepad2 className="w-4 h-4" />
                                Mini-Jeux
                            </TabsTrigger>
                            <TabsTrigger value="demos" className="flex items-center gap-2">
                                <Code className="w-4 h-4" />
                                Démos Tech
                            </TabsTrigger>
                            <TabsTrigger value="creatif" className="flex items-center gap-2">
                                <Paintbrush className="w-4 h-4" />
                                Créatif
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="outils" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Calculatrice */}
                                <Card className="backdrop-blur-sm bg-background/80">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Calculator className="w-5 h-5" />
                                            Calculatrice
                                        </CardTitle>
                                        <CardDescription>Calculatrice fonctionnelle en JavaScript</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="bg-muted p-4 rounded text-right text-2xl font-mono">{calcDisplay}</div>
                                        <div className="grid grid-cols-4 gap-2">
                                            <Button variant="outline" onClick={handleCalcClear}>
                                                C
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalcOperation("/")}>
                                                /
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalcOperation("*")}>
                                                ×
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalcOperation("-")}>
                                                -
                                            </Button>

                                            <Button variant="outline" onClick={() => handleCalcNumber("7")}>
                                                7
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalcNumber("8")}>
                                                8
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalcNumber("9")}>
                                                9
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalcOperation("+")} className="row-span-2">
                                                +
                                            </Button>

                                            <Button variant="outline" onClick={() => handleCalcNumber("4")}>
                                                4
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalcNumber("5")}>
                                                5
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalcNumber("6")}>
                                                6
                                            </Button>

                                            <Button variant="outline" onClick={() => handleCalcNumber("1")}>
                                                1
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalcNumber("2")}>
                                                2
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalcNumber("3")}>
                                                3
                                            </Button>
                                            <Button variant="outline" onClick={handleCalcEquals} className="row-span-2 bg-transparent">
                                                =
                                            </Button>

                                            <Button variant="outline" onClick={() => handleCalcNumber("0")} className="col-span-2">
                                                0
                                            </Button>
                                            <Button variant="outline" onClick={() => handleCalcNumber(".")}>
                                                .
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Générateur de mot de passe */}
                                <Card className="backdrop-blur-sm bg-background/80">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Key className="w-5 h-5" />
                                            Générateur de mots de passe
                                        </CardTitle>
                                        <CardDescription>Créez des mots de passe sécurisés</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium">Longueur: {passwordLength[0]}</label>
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
                                <Card className="backdrop-blur-sm bg-background/80">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Palette className="w-5 h-5" />
                                            Palette de couleurs
                                        </CardTitle>
                                        <CardDescription>Sélecteur et générateur de couleurs</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium">Couleur sélectionnée</label>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Input
                                                    type="color"
                                                    value={selectedColor}
                                                    onChange={(e) => setSelectedColor(e.target.value)}
                                                    className="w-16 h-10"
                                                />
                                                <Input value={selectedColor} readOnly className="font-mono" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Couleur aléatoire</label>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="w-16 h-10 rounded border" style={{ backgroundColor: randomColor }} />
                                                <Input value={randomColor} readOnly className="font-mono" />
                                            </div>
                                            <Button onClick={generateRandomColor} className="w-full mt-2">
                                                Générer couleur aléatoire
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="jeux" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Chronomètre */}
                                <Card className="backdrop-blur-sm bg-background/80">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Timer className="w-5 h-5" />
                                            Chronomètre
                                        </CardTitle>
                                        <CardDescription>Timer fonctionnel avec contrôles</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-center">
                                            <div className="text-4xl font-mono font-bold">{formatTime(time)}</div>
                                        </div>
                                        <div className="flex justify-center gap-2">
                                            <Button
                                                onClick={isRunning ? pauseTimer : startTimer}
                                                variant={isRunning ? "secondary" : "default"}
                                            >
                                                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                            </Button>
                                            <Button onClick={resetTimer} variant="outline">
                                                <RotateCcw className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Jeu de devinette */}
                                <Card className="backdrop-blur-sm bg-background/80">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Gamepad2 className="w-5 h-5" />
                                            Jeu de devinette
                                        </CardTitle>
                                        <CardDescription>Devinez le nombre entre 1 et 100</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-center">
                                            <Badge variant="secondary">En développement</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground text-center">
                                            Jeu interactif de devinette de nombres à venir
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="demos" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Simulateur de progression */}
                                <Card className="backdrop-blur-sm bg-background/80">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Code className="w-5 h-5" />
                                            Simulateur de progression
                                        </CardTitle>
                                        <CardDescription>Démonstration d'animations CSS/JS</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="w-full bg-muted rounded-full h-4">
                                            <div
                                                className="bg-primary h-4 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${(time * 2) % 100}%` }}
                                            />
                                        </div>
                                        <p className="text-sm text-muted-foreground text-center">Progression: {(time * 2) % 100}%</p>
                                    </CardContent>
                                </Card>

                                {/* Intégration API */}
                                <Card className="backdrop-blur-sm bg-background/80">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Code className="w-5 h-5" />
                                            Intégration API
                                        </CardTitle>
                                        <CardDescription>Démonstrations d'appels API</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-center">
                                            <Badge variant="secondary">En développement</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground text-center">
                                            Intégrations avec APIs météo, citations, etc.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="creatif" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Canvas créatif */}
                                <Card className="backdrop-blur-sm bg-background/80">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Paintbrush className="w-5 h-5" />
                                            Canvas créatif
                                        </CardTitle>
                                        <CardDescription>Espace de dessin HTML5 Canvas</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-center">
                                            <Badge variant="secondary">En développement</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground text-center">Outil de dessin interactif à venir</p>
                                    </CardContent>
                                </Card>

                                {/* Générateur Lorem */}
                                <Card className="backdrop-blur-sm bg-background/80">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="w-5 h-5" />
                                            Générateur Lorem
                                        </CardTitle>
                                        <CardDescription>Générateur de texte placeholder</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-center">
                                            <Badge variant="secondary">En développement</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground text-center">
                                            Générateur de texte Lorem Ipsum personnalisé
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </>
    )
}
