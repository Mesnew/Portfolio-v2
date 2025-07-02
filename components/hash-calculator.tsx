"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Hash } from "lucide-react"

export function HashCalculator() {
    const [inputText, setInputText] = useState("")
    const [hashes, setHashes] = useState<{ [key: string]: string }>({})

    const calculateHashes = async () => {
        if (!inputText.trim()) return

        const encoder = new TextEncoder()
        const data = encoder.encode(inputText)

        try {
            // SHA-256
            const sha256Buffer = await crypto.subtle.digest("SHA-256", data)
            const sha256Hash = Array.from(new Uint8Array(sha256Buffer))
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("")

            // SHA-1
            const sha1Buffer = await crypto.subtle.digest("SHA-1", data)
            const sha1Hash = Array.from(new Uint8Array(sha1Buffer))
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("")

            // Simple hash (pour démonstration)
            let simpleHash = 0
            for (let i = 0; i < inputText.length; i++) {
                const char = inputText.charCodeAt(i)
                simpleHash = (simpleHash << 5) - simpleHash + char
                simpleHash = simpleHash & simpleHash // Convert to 32-bit integer
            }

            setHashes({
                "SHA-256": sha256Hash,
                "SHA-1": sha1Hash,
                "Simple Hash": Math.abs(simpleHash).toString(16),
                Length: inputText.length.toString(),
                Base64: btoa(inputText),
            })
        } catch (error) {
            console.error("Erreur lors du calcul des hash:", error)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
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

            <Button onClick={calculateHashes} className="w-full" disabled={!inputText.trim()}>
                <Hash className="h-4 w-4 mr-2" />
                Calculer les hash
            </Button>

            {Object.keys(hashes).length > 0 && (
                <div className="space-y-3">
                    {Object.entries(hashes).map(([algorithm, hash]) => (
                        <div key={algorithm} className="space-y-2">
                            <Label className="text-sm font-medium">{algorithm}</Label>
                            <div className="flex gap-2">
                                <Input value={hash} readOnly className="font-mono text-xs" />
                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(hash)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
