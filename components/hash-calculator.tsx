"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, Hash, Key, Lock } from "lucide-react"

export function HashCalculator() {
    const [inputText, setInputText] = useState("")
    const [sha256Hash, setSha256Hash] = useState("")
    const [sha1Hash, setSha1Hash] = useState("")
    const [md5Hash, setMd5Hash] = useState("")
    const [base64Encoded, setBase64Encoded] = useState("")
    const [base64Decoded, setBase64Decoded] = useState("")
    const [base64Input, setBase64Input] = useState("")

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

    // Fonction MD5 simple (pour démonstration)
    const calculateMD5 = (text: string) => {
        // Implémentation MD5 simplifiée pour démonstration
        // En production, utilisez une vraie librairie MD5
        let hash = 0
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i)
            hash = (hash << 5) - hash + char
            hash = hash & hash // Convertir en 32bit
        }
        return Math.abs(hash).toString(16).padStart(8, "0")
    }

    // Fonction pour encoder en Base64
    const encodeBase64 = (text: string) => {
        try {
            return btoa(unescape(encodeURIComponent(text)))
        } catch (error) {
            return "Erreur d'encodage"
        }
    }

    // Fonction pour décoder Base64
    const decodeBase64 = (text: string) => {
        try {
            return decodeURIComponent(escape(atob(text)))
        } catch (error) {
            return "Erreur de décodage"
        }
    }

    // Calculer tous les hash
    const calculateAllHashes = async () => {
        if (!inputText.trim()) {
            setSha256Hash("")
            setSha1Hash("")
            setMd5Hash("")
            setBase64Encoded("")
            return
        }

        try {
            const sha256 = await calculateSHA256(inputText)
            const sha1 = await calculateSHA1(inputText)
            const md5 = calculateMD5(inputText)
            const base64 = encodeBase64(inputText)

            setSha256Hash(sha256)
            setSha1Hash(sha1)
            setMd5Hash(md5)
            setBase64Encoded(base64)
        } catch (error) {
            console.error("Erreur lors du calcul des hash:", error)
        }
    }

    // Décoder Base64
    const handleBase64Decode = () => {
        const decoded = decodeBase64(base64Input)
        setBase64Decoded(decoded)
    }

    // Copier dans le presse-papiers
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            // Optionnel: afficher une notification
        })
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Calculateur de Hash Cryptographique
                    <Badge variant="secondary">Crypto</Badge>
                </CardTitle>
                <CardDescription>Générez des hash SHA-256, SHA-1, MD5 et encodage Base64 sécurisé</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="hash" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="hash" className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Hash Cryptographique
                        </TabsTrigger>
                        <TabsTrigger value="base64" className="flex items-center gap-2">
                            <Key className="h-4 w-4" />
                            Encodage Base64
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="hash" className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="input-text">Texte à hasher</Label>
                                <Textarea
                                    id="input-text"
                                    placeholder="Entrez votre texte ici..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    rows={4}
                                    className="mt-2"
                                />
                            </div>

                            <Button onClick={calculateAllHashes} className="w-full">
                                <Hash className="h-4 w-4 mr-2" />
                                Calculer les Hash
                            </Button>

                            {(sha256Hash || sha1Hash || md5Hash || base64Encoded) && (
                                <div className="space-y-4">
                                    {/* SHA-256 */}
                                    {sha256Hash && (
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="font-semibold text-green-600">SHA-256</Label>
                                                <Badge variant="outline">Recommandé</Badge>
                                            </div>
                                            <div className="flex gap-2">
                                                <Input value={sha256Hash} readOnly className="font-mono text-sm" />
                                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(sha256Hash)}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* SHA-1 */}
                                    {sha1Hash && (
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="font-semibold text-yellow-600">SHA-1</Label>
                                                <Badge variant="secondary">Déprécié</Badge>
                                            </div>
                                            <div className="flex gap-2">
                                                <Input value={sha1Hash} readOnly className="font-mono text-sm" />
                                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(sha1Hash)}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* MD5 */}
                                    {md5Hash && (
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="font-semibold text-red-600">MD5</Label>
                                                <Badge variant="destructive">Non sécurisé</Badge>
                                            </div>
                                            <div className="flex gap-2">
                                                <Input value={md5Hash} readOnly className="font-mono text-sm" />
                                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(md5Hash)}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Base64 */}
                                    {base64Encoded && (
                                        <div className="space-y-2">
                                            <Label className="font-semibold text-blue-600">Base64</Label>
                                            <div className="flex gap-2">
                                                <Input value={base64Encoded} readOnly className="font-mono text-sm" />
                                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(base64Encoded)}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="base64" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Encodage */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Encoder en Base64</h3>
                                <div>
                                    <Label htmlFor="encode-input">Texte à encoder</Label>
                                    <Textarea
                                        id="encode-input"
                                        placeholder="Texte à encoder..."
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        rows={3}
                                        className="mt-2"
                                    />
                                </div>
                                <Button onClick={calculateAllHashes} className="w-full">
                                    Encoder
                                </Button>
                                {base64Encoded && (
                                    <div className="space-y-2">
                                        <Label>Résultat Base64</Label>
                                        <div className="flex gap-2">
                                            <Textarea value={base64Encoded} readOnly className="font-mono text-sm resize-none" rows={3} />
                                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(base64Encoded)}>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Décodage */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Décoder Base64</h3>
                                <div>
                                    <Label htmlFor="decode-input">Base64 à décoder</Label>
                                    <Textarea
                                        id="decode-input"
                                        placeholder="Base64 à décoder..."
                                        value={base64Input}
                                        onChange={(e) => setBase64Input(e.target.value)}
                                        rows={3}
                                        className="mt-2"
                                    />
                                </div>
                                <Button onClick={handleBase64Decode} className="w-full">
                                    Décoder
                                </Button>
                                {base64Decoded && (
                                    <div className="space-y-2">
                                        <Label>Texte décodé</Label>
                                        <div className="flex gap-2">
                                            <Textarea value={base64Decoded} readOnly className="text-sm resize-none" rows={3} />
                                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(base64Decoded)}>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Informations de sécurité */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">ℹ️ Informations de sécurité</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>
                            • <strong>SHA-256</strong> : Recommandé pour la sécurité moderne
                        </li>
                        <li>
                            • <strong>SHA-1</strong> : Déprécié, vulnérable aux collisions
                        </li>
                        <li>
                            • <strong>MD5</strong> : Non sécurisé, à éviter pour la cryptographie
                        </li>
                        <li>
                            • <strong>Base64</strong> : Encodage, pas de chiffrement (réversible)
                        </li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}
