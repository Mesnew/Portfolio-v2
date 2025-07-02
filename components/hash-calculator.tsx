"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Hash, RefreshCw } from "lucide-react"

export function HashCalculator() {
    const [inputText, setInputText] = useState("")
    const [sha256Hash, setSha256Hash] = useState("")
    const [sha1Hash, setSha1Hash] = useState("")
    const [simpleHash, setSimpleHash] = useState("")
    const [isCalculating, setIsCalculating] = useState(false)

    // Fonction pour calculer SHA-256
    const calculateSHA256 = async (text: string) => {
        const encoder = new TextEncoder()
        const data = encoder.encode(text)
        const hashBuffer = await crypto.subtle.digest("SHA-256", data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    }

    // Fonction pour calculer SHA-1
    const calculateSHA1 = async (text: string) => {
        const encoder = new TextEncoder()
        const data = encoder.encode(text)
        const hashBuffer = await crypto.subtle.digest("SHA-1", data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    }

    // Fonction pour calculer un hash simple (pour démonstration)
    const calculateSimpleHash = (text: string) => {
        let hash = 0
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i)
            hash = (hash << 5) - hash + char
            hash = hash & hash // Convertir en 32bit integer
        }
        return Math.abs(hash).toString(16)
    }

    const calculateHashes = async () => {
        if (!inputText.trim()) {
            setSha256Hash("")
            setSha1Hash("")
            setSimpleHash("")
            return
        }

        setIsCalculating(true)

        try {
            const [sha256, sha1] = await Promise.all([calculateSHA256(inputText), calculateSHA1(inputText)])

            setSha256Hash(sha256)
            setSha1Hash(sha1)
            setSimpleHash(calculateSimpleHash(inputText))
        } catch (error) {
            console.error("Erreur lors du calcul des hash:", error)
        } finally {
            setIsCalculating(false)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    const clearAll = () => {
        setInputText("")
        setSha256Hash("")
        setSha1Hash("")
        setSimpleHash("")
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Texte à hasher</Label>
                <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Entrez votre texte ici..."
                    rows={3}
                />
            </div>

            <div className="flex gap-2">
                <Button onClick={calculateHashes} disabled={isCalculating} className="flex-1">
                    <Hash className="h-4 w-4 mr-2" />
                    {isCalculating ? "Calcul..." : "Calculer"}
                </Button>
                <Button variant="outline" onClick={clearAll} className="bg-transparent">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Effacer
                </Button>
            </div>

            {/* Résultats */}
            {(sha256Hash || sha1Hash || simpleHash) && (
                <div className="space-y-4">
                    {/* SHA-256 */}
                    {sha256Hash && (
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">SHA-256</Label>
                            <div className="flex gap-2">
                                <Input value={sha256Hash} readOnly className="font-mono text-xs" />
                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(sha256Hash)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* SHA-1 */}
                    {sha1Hash && (
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">SHA-1</Label>
                            <div className="flex gap-2">
                                <Input value={sha1Hash} readOnly className="font-mono text-xs" />
                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(sha1Hash)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Hash simple */}
                    {simpleHash && (
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Hash Simple</Label>
                            <div className="flex gap-2">
                                <Input value={simpleHash} readOnly className="font-mono text-xs" />
                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(simpleHash)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="text-xs text-muted-foreground">
                <p>• SHA-256 : Hash cryptographique sécurisé (256 bits)</p>
                <p>• SHA-1 : Hash cryptographique (160 bits, moins sécurisé)</p>
                <p>• Hash Simple : Algorithme basique pour démonstration</p>
            </div>
        </div>
    )
}
