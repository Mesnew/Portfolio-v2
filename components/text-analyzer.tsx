"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, FileText, Clock, Hash } from "lucide-react"

export function TextAnalyzer() {
    const [text, setText] = useState("")

    const analysis = useMemo(() => {
        if (!text.trim()) {
            return {
                characters: 0,
                charactersNoSpaces: 0,
                words: 0,
                sentences: 0,
                paragraphs: 0,
                averageWordsPerSentence: 0,
                averageCharsPerWord: 0,
                readingTime: 0,
                mostFrequentWords: [],
            }
        }

        const characters = text.length
        const charactersNoSpaces = text.replace(/\s/g, "").length

        // Compter les mots (séparer par espaces, tabs, retours à la ligne)
        const words = text
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0)
        const wordCount = words.length

        // Compter les phrases (séparer par . ! ?)
        const sentences = text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0)
        const sentenceCount = sentences.length

        // Compter les paragraphes (séparer par double retour à la ligne)
        const paragraphs = text.split(/\n\s*\n/).filter((para) => para.trim().length > 0)
        const paragraphCount = paragraphs.length

        // Moyennes
        const averageWordsPerSentence = sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0
        const averageCharsPerWord = wordCount > 0 ? Math.round((charactersNoSpaces / wordCount) * 10) / 10 : 0

        // Temps de lecture (environ 200 mots par minute)
        const readingTime = Math.ceil(wordCount / 200)

        // Mots les plus fréquents
        const wordFrequency: { [key: string]: number } = {}
        words.forEach((word) => {
            const cleanWord = word.toLowerCase().replace(/[^\w]/g, "")
            if (cleanWord.length > 2) {
                // Ignorer les mots de moins de 3 caractères
                wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1
            }
        })

        const mostFrequentWords = Object.entries(wordFrequency)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([word, count]) => ({ word, count }))

        return {
            characters,
            charactersNoSpaces,
            words: wordCount,
            sentences: sentenceCount,
            paragraphs: paragraphCount,
            averageWordsPerSentence,
            averageCharsPerWord,
            readingTime,
            mostFrequentWords,
        }
    }, [text])

    const loadExample = () => {
        setText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`)
    }

    const clearText = () => {
        setText("")
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Texte à analyser</Label>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Collez ou tapez votre texte ici pour l'analyser..."
                    rows={6}
                    className="resize-none"
                />
            </div>

            <div className="flex gap-2">
                <Button onClick={loadExample} variant="outline" className="flex-1 bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Exemple
                </Button>
                <Button onClick={clearText} variant="outline" className="flex-1 bg-transparent">
                    Effacer
                </Button>
            </div>

            {text.trim() && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Statistiques de base */}
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2 font-medium">
                                <BarChart3 className="h-4 w-4" />
                                Statistiques de base
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Caractères :</span>
                                    <Badge variant="secondary">{analysis.characters}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Caractères (sans espaces) :</span>
                                    <Badge variant="secondary">{analysis.charactersNoSpaces}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Mots :</span>
                                    <Badge variant="secondary">{analysis.words}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phrases :</span>
                                    <Badge variant="secondary">{analysis.sentences}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Paragraphes :</span>
                                    <Badge variant="secondary">{analysis.paragraphs}</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Analyse avancée */}
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2 font-medium">
                                <Hash className="h-4 w-4" />
                                Analyse avancée
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Mots/phrase :</span>
                                    <Badge variant="outline">{analysis.averageWordsPerSentence}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Caractères/mot :</span>
                                    <Badge variant="outline">{analysis.averageCharsPerWord}</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Temps de lecture :
                  </span>
                                    <Badge variant="outline">{analysis.readingTime} min</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Mots fréquents */}
                    {analysis.mostFrequentWords.length > 0 && (
                        <Card className="md:col-span-2">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center gap-2 font-medium">
                                    <FileText className="h-4 w-4" />
                                    Mots les plus fréquents
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.mostFrequentWords.map(({ word, count }, index) => (
                                        <Badge key={word} variant="secondary" className="text-xs">
                                            {word} ({count})
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            <div className="text-xs text-muted-foreground">
                <p>• Temps de lecture basé sur 200 mots/minute</p>
                <p>• Seuls les mots de 3+ caractères sont comptés dans la fréquence</p>
            </div>
        </div>
    )
}
