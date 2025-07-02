"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Copy, Hash, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function HashCalculator() {
    const [input, setInput] = useState("")
    const [hashes, setHashes] = useState<{
        sha256: string
        sha1: string
        simple: string
        base64: string
    }>({
        sha256: "",
        sha1: "",
        simple: "",
        base64: "",
    })
    const [isCalculating, setIsCalculating] = useState(false)
    const [copiedHash, setCopiedHash] = useState<string | null>(null)
    const { toast } = useToast()

    // Simple hash function for demonstration
    const simpleHash = (str: string): string => {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i)
            hash = (hash << 5) - hash + char
            hash = hash & hash // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16)
    }

    const calculateHashes = async () => {
        if (!input.trim()) {
            toast({
                title: "Erreur",
                description: "Veuillez saisir du texte à hasher",
                variant: "destructive",
            })
            return
        }

        setIsCalculating(true)

        try {
            const encoder = new TextEncoder()
            const data = encoder.encode(input)

            // SHA-256
            const sha256Buffer = await crypto.subtle.digest("SHA-256", data)
            const sha256Array = Array.from(new Uint8Array(sha256Buffer))
            const sha256Hash = sha256Array.map((b) => b.toString(16).padStart(2, "0")).join("")

            // SHA-1
            const sha1Buffer = await crypto.subtle.digest("SHA-1", data)
            const sha1Array = Array.from(new Uint8Array(sha1Buffer))
            const sha1Hash = sha1Array.map((b) => b.toString(16).padStart(2, "0")).join("")

            // Simple hash
            const simpleHashResult = simpleHash(input)

            // Base64
            const base64 = btoa(input)

            setHashes({
                sha256: sha256Hash,
                sha1: sha1Hash,
                simple: simpleHashResult,
                base64: base64,
            })

            toast({
                title: "Succès",
                description: "Tous les hash ont été calculés avec succès",
            })
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Erreur lors du calcul des hash",
                variant: "destructive",
            })
        } finally {
            setIsCalculating(false)
        }
    }

    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedHash(type)
            setTimeout(() => setCopiedHash(null), 2000)
            toast({
                title: "Copié !",
                description: `Hash ${type} copié dans le presse-papiers`,
            })
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Impossible de copier dans le presse-papiers",
                variant: "destructive",
            })
        }
    }

    const loadExample = () => {
        setInput("Bonjour, ceci est un exemple de texte pour tester le calculateur de hash cryptographique !")
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Calculateur de Hash
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Texte à hasher</label>
                        <Button variant="outline" size="sm" onClick={loadExample}>
                            Exemple
                        </Button>
                    </div>
                    <Textarea
                        placeholder="Saisissez votre texte ici..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={4}
                        className="resize-none"
                    />
                </div>

                <Button onClick={calculateHashes} disabled={isCalculating || !input.trim()} className="w-full">
                    {isCalculating ? "Calcul en cours..." : "Calculer les Hash"}
                </Button>

                {(hashes.sha256 || hashes.sha1 || hashes.simple || hashes.base64) && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Résultats</h3>

                        {/* SHA-256 */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary">SHA-256</Badge>
                                <span className="text-sm text-muted-foreground">Algorithme cryptographique sécurisé</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm break-all">{hashes.sha256}</div>
                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(hashes.sha256, "SHA-256")}>
                                    {copiedHash === "SHA-256" ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* SHA-1 */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary">SHA-1</Badge>
                                <span className="text-sm text-muted-foreground">Algorithme cryptographique (obsolète)</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm break-all">{hashes.sha1}</div>
                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(hashes.sha1, "SHA-1")}>
                                    {copiedHash === "SHA-1" ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Simple Hash */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">Hash Simple</Badge>
                                <span className="text-sm text-muted-foreground">Algorithme basique pour démonstration</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm break-all">{hashes.simple}</div>
                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(hashes.simple, "Simple")}>
                                    {copiedHash === "Simple" ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Base64 */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">Base64</Badge>
                                <span className="text-sm text-muted-foreground">Encodage (pas un hash)</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm break-all">{hashes.base64}</div>
                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(hashes.base64, "Base64")}>
                                    {copiedHash === "Base64" ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                        <strong>SHA-256:</strong> Algorithme de hachage cryptographique sécurisé, utilisé dans Bitcoin
                    </p>
                    <p>
                        <strong>SHA-1:</strong> Ancien algorithme, maintenant considéré comme obsolète
                    </p>
                    <p>
                        <strong>Hash Simple:</strong> Algorithme basique pour démonstration uniquement
                    </p>
                    <p>
                        <strong>Base64:</strong> Encodage réversible, pas un vrai hash
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
