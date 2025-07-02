"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, BarChart3, Clock, Hash } from "lucide-react"

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
                averageCharactersPerWord: 0,
                readingTime: 0,
                mostFrequentWords: [],
            }
        }

        const characters = text.length
        const charactersNoSpaces = text.replace(/\s/g, "").length
        const words = text
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0).length
        const sentences = text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0).length
        const paragraphs = text.split(/\n\s*\n/).filter((paragraph) => paragraph.trim().length > 0).length

        const averageWordsPerSentence = sentences > 0 ? Math.round((words / sentences) * 10) / 10 : 0
        const averageCharactersPerWord = words > 0 ? Math.round((charactersNoSpaces / words) * 10) / 10 : 0
        const readingTime = Math.ceil(words / 200) // 200 mots par minute

        // Analyse des mots les plus fréquents
        const wordFrequency: { [key: string]: number } = {}
        const cleanWords = text
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .split(/\s+/)
            .filter((word) => word.length > 2) // Ignorer les mots de moins de 3 caractères

        cleanWords.forEach((word) => {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1
        })

        const mostFrequentWords = Object.entries(wordFrequency)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([word, count]) => ({ word, count }))

        return {
            characters,
            charactersNoSpaces,
            words,
            sentences,
            paragraphs,
            averageWordsPerSentence,
            averageCharactersPerWord,
            readingTime,
            mostFrequentWords,
        }
    }, [text])

    const loadExample = () => {
        setText(`L'analyse de texte est une technique fondamentale en traitement du langage naturel. Elle permet d'extraire des informations significatives à partir de données textuelles.

Cette méthode trouve des applications dans de nombreux domaines : la recherche d'information, l'analyse de sentiment, la classification automatique de documents, et bien d'autres.

Les outils d'analyse textuelle modernes utilisent des algorithmes sophistiqués pour comprendre le contexte, identifier les entités nommées, et extraire les relations sémantiques entre les concepts.

L'intelligence artificielle a révolutionné ce domaine en permettant des analyses plus précises et plus nuancées qu'auparavant.`)
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Analyseur de Texte
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Texte à analyser</label>
                        <Button variant="outline" size="sm" onClick={loadExample}>
                            Exemple
                        </Button>
                    </div>
                    <Textarea
                        placeholder="Collez ou saisissez votre texte ici pour l'analyser..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={8}
                        className="resize-none"
                    />
                </div>

                {text.trim() && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Statistiques
                        </h3>

                        {/* Statistiques de base */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <Card>
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{analysis.characters}</div>
                                    <div className="text-sm text-muted-foreground">Caractères</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-green-600">{analysis.charactersNoSpaces}</div>
                                    <div className="text-sm text-muted-foreground">Sans espaces</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-purple-600">{analysis.words}</div>
                                    <div className="text-sm text-muted-foreground">Mots</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-orange-600">{analysis.sentences}</div>
                                    <div className="text-sm text-muted-foreground">Phrases</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-red-600">{analysis.paragraphs}</div>
                                    <div className="text-sm text-muted-foreground">Paragraphes</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-teal-600 flex items-center justify-center gap-1">
                                        <Clock className="h-5 w-5" />
                                        {analysis.readingTime}min
                                    </div>
                                    <div className="text-sm text-muted-foreground">Temps de lecture</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Statistiques avancées */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-sm font-medium mb-2">Mots par phrase (moyenne)</div>
                                    <div className="text-xl font-bold">{analysis.averageWordsPerSentence}</div>
                                    <Progress value={Math.min((analysis.averageWordsPerSentence / 20) * 100, 100)} className="mt-2" />
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {analysis.averageWordsPerSentence < 10
                                            ? "Phrases courtes"
                                            : analysis.averageWordsPerSentence < 15
                                                ? "Phrases moyennes"
                                                : "Phrases longues"}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-sm font-medium mb-2">Caractères par mot (moyenne)</div>
                                    <div className="text-xl font-bold">{analysis.averageCharactersPerWord}</div>
                                    <Progress value={Math.min((analysis.averageCharactersPerWord / 10) * 100, 100)} className="mt-2" />
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {analysis.averageCharactersPerWord < 4
                                            ? "Mots courts"
                                            : analysis.averageCharactersPerWord < 6
                                                ? "Mots moyens"
                                                : "Mots longs"}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Mots les plus fréquents */}
                        {analysis.mostFrequentWords.length > 0 && (
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-sm font-medium mb-3 flex items-center gap-2">
                                        <Hash className="h-4 w-4" />
                                        Mots les plus fréquents
                                    </div>
                                    <div className="space-y-2">
                                        {analysis.mostFrequentWords.map(({ word, count }, index) => (
                                            <div key={word} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline">#{index + 1}</Badge>
                                                    <span className="font-medium">{word}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={(count / analysis.mostFrequentWords[0].count) * 100} className="w-20" />
                                                    <Badge variant="secondary">{count}</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Conseils de lisibilité */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-sm font-medium mb-2">Conseils de lisibilité</div>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    {analysis.averageWordsPerSentence > 20 && (
                                        <p>• Vos phrases sont longues. Essayez de les raccourcir pour améliorer la lisibilité.</p>
                                    )}
                                    {analysis.averageCharactersPerWord > 7 && (
                                        <p>• Vos mots sont complexes. Utilisez des termes plus simples si possible.</p>
                                    )}
                                    {analysis.paragraphs === 1 && analysis.sentences > 5 && (
                                        <p>• Divisez votre texte en plusieurs paragraphes pour une meilleure structure.</p>
                                    )}
                                    {analysis.readingTime > 10 && (
                                        <p>• Votre texte est long ({analysis.readingTime} min de lecture). Considérez le diviser.</p>
                                    )}
                                    {analysis.averageWordsPerSentence <= 15 && analysis.averageCharactersPerWord <= 6 && (
                                        <p>• ✅ Votre texte a une bonne lisibilité !</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
