"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlanetBackground3D } from "@/components/PlanetBackground3D"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Calculator, Palette, Code, Zap, Brain, Gamepad2, Hash, Timer, Shuffle, Target } from "lucide-react"

export default function LaboratoirePage() {
    // États pour les différentes démonstrations
    const [calculatorResult, setCalculatorResult] = useState("")
    const [colorValue, setColorValue] = useState("#3b82f6")
    const [passwordLength, setPasswordLength] = useState([12])
    const [generatedPassword, setGeneratedPassword] = useState("")
    const [timerSeconds, setTimerSeconds] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [progress, setProgress] = useState(0)

    // Calculatrice simple
    const handleCalculator = (operation: string) => {
        try {
            if (operation === "clear") {
                setCalculatorResult("")
            } else if (operation === "=") {
                const result = eval(calculatorResult)
                setCalculatorResult(result.toString())
            } else {
                setCalculatorResult((prev) => prev + operation)
            }
        } catch {
            setCalculatorResult("Erreur")
        }
    }

    // Générateur de mot de passe
    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
        let password = ""
        for (let i = 0; i < passwordLength[0]; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setGeneratedPassword(password)
    }

    // Simulateur de progression
    const simulateProgress = () => {
        setProgress(0)
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + Math.random() * 10
            })
        }, 200)
    }

    // Générateur de couleurs aléatoires
    const generateRandomColor = () => {
        const randomColor =
            "#" +
            Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")
        setColorValue(randomColor)
    }

    return (
        <main className="min-h-screen flex flex-col relative overflow-hidden">
            <PlanetBackground3D planetType="jupiter" />
            <div className="relative z-10 flex flex-col flex-grow">
                <Header />

                <div className="container mx-auto px-4 flex-grow">
                    <section className="py-12">
                        <h1 className="text-4xl font-bold mb-8 text-center">Laboratoire</h1>
                        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
                            Explorez mes expérimentations techniques et mes créations interactives. Un espace de démonstration de mes
                            compétences en développement.
                        </p>

                        {/* Onglets principaux */}
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
                                <TabsTrigger value="creative" className="flex items-center gap-2">
                                    <Brain className="w-4 h-4" />
                                    Créatif
                                </TabsTrigger>
                            </TabsList>

                            {/* Onglet Outils */}
                            <TabsContent value="outils" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Calculatrice */}
                                    <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Calculator className="w-5 h-5" />
                                                Calculatrice
                                            </CardTitle>
                                            <CardDescription>Calculatrice simple avec JavaScript</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <Input
                                                value={calculatorResult}
                                                readOnly
                                                className="text-right text-lg font-mono"
                                                placeholder="0"
                                            />
                                            <div className="grid grid-cols-4 gap-2">
                                                {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "+", "="].map((btn) => (
                                                    <Button
                                                        key={btn}
                                                        variant={btn === "=" ? "default" : "outline"}
                                                        onClick={() => handleCalculator(btn)}
                                                        className="h-10"
                                                    >
                                                        {btn}
                                                    </Button>
                                                ))}
                                            </div>
                                            <Button variant="destructive" onClick={() => handleCalculator("clear")} className="w-full">
                                                Effacer
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    {/* Générateur de mot de passe */}
                                    <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Hash className="w-5 h-5" />
                                                Générateur de Mot de Passe
                                            </CardTitle>
                                            <CardDescription>Créez des mots de passe sécurisés</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Longueur: {passwordLength[0]} caractères</Label>
                                                <Slider
                                                    value={passwordLength}
                                                    onValueChange={setPasswordLength}
                                                    max={50}
                                                    min={4}
                                                    step={1}
                                                    className="w-full"
                                                />
                                            </div>
                                            <Button onClick={generatePassword} className="w-full">
                                                Générer
                                            </Button>
                                            {generatedPassword && (
                                                <div className="p-3 bg-muted rounded-md">
                                                    <code className="text-sm break-all">{generatedPassword}</code>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* Sélecteur de couleurs */}
                                    <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Palette className="w-5 h-5" />
                                                Palette de Couleurs
                                            </CardTitle>
                                            <CardDescription>Explorez et générez des couleurs</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div
                                                className="w-full h-20 rounded-md border-2 border-primary/20"
                                                style={{ backgroundColor: colorValue }}
                                            />
                                            <Input
                                                type="color"
                                                value={colorValue}
                                                onChange={(e) => setColorValue(e.target.value)}
                                                className="w-full h-12"
                                            />
                                            <div className="text-center">
                                                <Badge variant="secondary" className="font-mono">
                                                    {colorValue.toUpperCase()}
                                                </Badge>
                                            </div>
                                            <Button onClick={generateRandomColor} variant="outline" className="w-full bg-transparent">
                                                <Shuffle className="w-4 h-4 mr-2" />
                                                Couleur Aléatoire
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            {/* Onglet Mini-Jeux */}
                            <TabsContent value="jeux" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Timer/Chronomètre */}
                                    <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Timer className="w-5 h-5" />
                                                Chronomètre
                                            </CardTitle>
                                            <CardDescription>Minuteur simple et efficace</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="text-center">
                                                <div className="text-4xl font-mono font-bold">
                                                    {Math.floor(timerSeconds / 60)
                                                        .toString()
                                                        .padStart(2, "0")}
                                                    :{(timerSeconds % 60).toString().padStart(2, "0")}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => {
                                                        if (isTimerRunning) {
                                                            setIsTimerRunning(false)
                                                        } else {
                                                            setIsTimerRunning(true)
                                                            const interval = setInterval(() => {
                                                                setTimerSeconds((prev) => {
                                                                    if (!isTimerRunning) {
                                                                        clearInterval(interval)
                                                                        return prev
                                                                    }
                                                                    return prev + 1
                                                                })
                                                            }, 1000)
                                                        }
                                                    }}
                                                    className="flex-1"
                                                >
                                                    {isTimerRunning ? "Pause" : "Start"}
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        setTimerSeconds(0)
                                                        setIsTimerRunning(false)
                                                    }}
                                                    variant="outline"
                                                    className="flex-1"
                                                >
                                                    Reset
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Jeu de devinette */}
                                    <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Target className="w-5 h-5" />
                                                Devine le Nombre
                                            </CardTitle>
                                            <CardDescription>Jeu de logique simple</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="text-center p-4 bg-muted rounded-md">
                                                <p className="text-sm text-muted-foreground">Fonctionnalité en développement...</p>
                                                <Badge variant="outline" className="mt-2">
                                                    Bientôt disponible
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            {/* Onglet Démos Tech */}
                            <TabsContent value="demos" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Simulateur de progression */}
                                    <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Zap className="w-5 h-5" />
                                                Simulateur de Progression
                                            </CardTitle>
                                            <CardDescription>Démonstration d'une barre de progression animée</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Progression</span>
                                                    <span>{Math.round(progress)}%</span>
                                                </div>
                                                <Progress value={progress} className="w-full" />
                                            </div>
                                            <Button onClick={simulateProgress} className="w-full">
                                                Démarrer la simulation
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    {/* API Demo */}
                                    <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Code className="w-5 h-5" />
                                                Intégration API
                                            </CardTitle>
                                            <CardDescription>Démonstration d'appels API</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="text-center p-4 bg-muted rounded-md">
                                                <p className="text-sm text-muted-foreground">Intégration avec des APIs externes...</p>
                                                <Badge variant="outline" className="mt-2">
                                                    En développement
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            {/* Onglet Créatif */}
                            <TabsContent value="creative" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Canvas créatif */}
                                    <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Brain className="w-5 h-5" />
                                                Canvas Créatif
                                            </CardTitle>
                                            <CardDescription>Espace de dessin interactif</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="text-center p-8 bg-muted rounded-md border-2 border-dashed">
                                                <p className="text-sm text-muted-foreground">Canvas HTML5 à venir...</p>
                                                <Badge variant="outline" className="mt-2">
                                                    Prochainement
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Générateur de texte */}
                                    <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Shuffle className="w-5 h-5" />
                                                Générateur Lorem
                                            </CardTitle>
                                            <CardDescription>Générateur de texte placeholder</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="text-center p-4 bg-muted rounded-md">
                                                <p className="text-sm text-muted-foreground">Générateur de Lorem Ipsum...</p>
                                                <Badge variant="outline" className="mt-2">
                                                    À implémenter
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Section Technologies utilisées */}
                        <div className="mt-16 text-center">
                            <h2 className="text-2xl font-bold mb-6">Technologies Utilisées</h2>
                            <div className="flex flex-wrap justify-center gap-2">
                                {["React", "TypeScript", "Next.js", "Tailwind CSS", "Shadcn/ui", "JavaScript", "HTML5", "CSS3"].map(
                                    (tech) => (
                                        <Badge key={tech} variant="secondary" className="text-sm">
                                            {tech}
                                        </Badge>
                                    ),
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>
        </main>
    )
}
