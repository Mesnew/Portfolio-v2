"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export function TextAnalyzer() {
    const [text, setText] = useState("")

    const analysis = useMemo(() => {
        if (!text.trim()) return null

        const words = text
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0)
        const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
        const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0)

        // Compter les caractères (avec et sans espaces)
        const charactersWithSpaces = text.length
        const charactersWithoutSpaces = text.replace(/\s/g, "").length

        // Mots les plus fréquents
        const wordFreq: { [key: string]: number } = {}
        words.forEach((word) => {
            const cleanWord = word.toLowerCase().replace(/[^\w]/g, "")
            if (cleanWord.length > 2) {
                // Ignorer les mots trop courts
                wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1
            }
        })

        const topWords = Object.entries(wordFreq)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)

        // Longueur moyenne des mots
        const avgWordLength =
            words.length > 0 ? (words.reduce((sum, word) => sum + word.length, 0) / words.length).toFixed(1) : 0

        // Temps de lecture estimé (250 mots par minute)
        const readingTime = Math.ceil(words.length / 250)

        return {
            characters: charactersWithSpaces,
            charactersNoSpaces: charactersWithoutSpaces,
            words: words.length,
            sentences: sentences.length,
            paragraphs: paragraphs.length,
            avgWordLength: Number(avgWordLength),
            readingTime,
            topWords,
        }
    }, [text])

    const generateSample = () => {
        const sampleText = `La technologie évolue rapidement dans notre monde moderne. Les innovations technologiques transforment notre façon de vivre, de travailler et de communiquer.

L'intelligence artificielle et l'apprentissage automatique révolutionnent de nombreux secteurs. Ces technologies permettent d'automatiser des tâches complexes et d'améliorer l'efficacité.

Le développement durable devient une priorité mondiale. Les entreprises adoptent des pratiques écologiques pour réduire leur impact environnemental et créer un avenir plus vert.`

        setText(sampleText)
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label>Texte à analyser</Label>
                    <Button variant="outline" size="sm" onClick={generateSample}>
                        Exemple
                    </Button>
                </div>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Collez ou tapez votre texte ici pour l'analyser..."
                    rows={6}
                />
            </div>

            {analysis && (
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Caractères:</span>
                                    <span className="font-mono">{analysis.characters}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Sans espaces:</span>
                                    <span className="font-mono">{analysis.charactersNoSpaces}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Mots:</span>
                                    <span className="font-mono">{analysis.words}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Phrases:</span>
                                    <span className="font-mono">{analysis.sentences}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Paragraphes:</span>
                                    <span className="font-mono">{analysis.paragraphs}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Longueur moy. mot:</span>
                                    <span className="font-mono">{analysis.avgWordLength}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Temps lecture:</span>
                                    <span className="font-mono">{analysis.readingTime} min</span>
                                </div>
                                <div className="mt-3">
                                    <div className="text-sm text-muted-foreground mb-2">Mots fréquents:</div>
                                    {analysis.topWords.map(([word, count]) => (
                                        <div key={word} className="flex justify-between text-xs">
                                            <span>{word}</span>
                                            <span>{count}x</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
