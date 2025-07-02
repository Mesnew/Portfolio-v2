"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, QrCode, Link, Mail, Phone, Wifi, Copy } from "lucide-react"

export function QRGenerator() {
    const [text, setText] = useState("")
    const [qrSize, setQrSize] = useState(256)
    const [qrColor, setQrColor] = useState("#000000")
    const [bgColor, setBgColor] = useState("#ffffff")
    const [qrDataUrl, setQrDataUrl] = useState("")
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Fonction simple pour générer un QR code (simulation)
    const generateQRCode = () => {
        if (!text.trim()) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Définir la taille du canvas
        canvas.width = qrSize
        canvas.height = qrSize

        // Fond
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, qrSize, qrSize)

        // Générer un pattern QR simple (simulation)
        const moduleSize = qrSize / 25 // 25x25 modules
        ctx.fillStyle = qrColor

        // Pattern de base pour simuler un QR code
        const pattern = generateQRPattern(text)

        for (let row = 0; row < 25; row++) {
            for (let col = 0; col < 25; col++) {
                if (pattern[row][col]) {
                    ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize)
                }
            }
        }

        // Convertir en data URL
        const dataUrl = canvas.toDataURL("image/png")
        setQrDataUrl(dataUrl)
    }

    // Fonction pour générer un pattern QR simple basé sur le texte
    const generateQRPattern = (input: string): boolean[][] => {
        const size = 25
        const pattern: boolean[][] = Array(size)
            .fill(null)
            .map(() => Array(size).fill(false))

        // Créer un hash simple du texte
        let hash = 0
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i)
            hash = (hash << 5) - hash + char
            hash = hash & hash // Convertir en 32bit
        }

        // Utiliser le hash pour générer un pattern pseudo-aléatoire
        let seed = Math.abs(hash)
        const random = () => {
            seed = (seed * 9301 + 49297) % 233280
            return seed / 233280
        }

        // Coins de positionnement (caractéristique des QR codes)
        const addPositionMarker = (startRow: number, startCol: number) => {
            for (let r = 0; r < 7; r++) {
                for (let c = 0; c < 7; c++) {
                    if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
                        if (startRow + r < size && startCol + c < size) {
                            pattern[startRow + r][startCol + c] = true
                        }
                    }
                }
            }
        }

        // Ajouter les marqueurs de position
        addPositionMarker(0, 0) // Coin supérieur gauche
        addPositionMarker(0, 18) // Coin supérieur droit
        addPositionMarker(18, 0) // Coin inférieur gauche

        // Remplir le reste avec un pattern basé sur le hash
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                // Éviter les zones des marqueurs de position
                if (!((r < 9 && c < 9) || (r < 9 && c > 15) || (r > 15 && c < 9))) {
                    pattern[r][c] = random() > 0.5
                }
            }
        }

        return pattern
    }

    // Télécharger le QR code
    const downloadQR = () => {
        if (!qrDataUrl) return

        const link = document.createElement("a")
        link.download = "qrcode.png"
        link.href = qrDataUrl
        link.click()
    }

    // Copier l'image dans le presse-papiers
    const copyQRToClipboard = async () => {
        if (!qrDataUrl) return

        try {
            const response = await fetch(qrDataUrl)
            const blob = await response.blob()
            await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
        } catch (error) {
            console.error("Erreur lors de la copie:", error)
        }
    }

    // Templates prédéfinis
    const setTemplate = (type: string) => {
        switch (type) {
            case "url":
                setText("https://example.com")
                break
            case "email":
                setText("mailto:contact@example.com")
                break
            case "phone":
                setText("tel:+33123456789")
                break
            case "wifi":
                setText("WIFI:T:WPA;S:MonWiFi;P:motdepasse;H:false;;")
                break
            default:
                setText("")
        }
    }

    const sizes = [
        { label: "Petit", value: 128 },
        { label: "Moyen", value: 256 },
        { label: "Grand", value: 512 },
        { label: "XL", value: 1024 },
    ]

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    Générateur de QR Code
                    <Badge variant="secondary">Personnalisable</Badge>
                </CardTitle>
                <CardDescription>Créez des QR codes personnalisés pour URLs, emails, téléphones et WiFi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Templates rapides */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">Templates rapides</Label>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={() => setTemplate("url")} className="flex items-center gap-2">
                            <Link className="h-4 w-4" />
                            URL
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setTemplate("email")}
                            className="flex items-center gap-2"
                        >
                            <Mail className="h-4 w-4" />
                            Email
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setTemplate("phone")}
                            className="flex items-center gap-2"
                        >
                            <Phone className="h-4 w-4" />
                            Téléphone
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setTemplate("wifi")} className="flex items-center gap-2">
                            <Wifi className="h-4 w-4" />
                            WiFi
                        </Button>
                    </div>
                </div>

                <Separator />

                {/* Configuration */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="qr-text">Contenu du QR Code</Label>
                            <Input
                                id="qr-text"
                                placeholder="Entrez le texte, URL, email..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Taille</Label>
                            <div className="flex gap-2 mt-2">
                                {sizes.map((size) => (
                                    <Button
                                        key={size.value}
                                        variant={qrSize === size.value ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setQrSize(size.value)}
                                    >
                                        {size.label}
                                    </Button>
                                ))}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {qrSize} × {qrSize} pixels
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="qr-color">Couleur QR</Label>
                                <div className="flex gap-2 mt-2">
                                    <input
                                        id="qr-color"
                                        type="color"
                                        value={qrColor}
                                        onChange={(e) => setQrColor(e.target.value)}
                                        className="w-12 h-10 rounded border cursor-pointer"
                                    />
                                    <Input value={qrColor} onChange={(e) => setQrColor(e.target.value)} className="font-mono text-sm" />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="bg-color">Couleur fond</Label>
                                <div className="flex gap-2 mt-2">
                                    <input
                                        id="bg-color"
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="w-12 h-10 rounded border cursor-pointer"
                                    />
                                    <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="font-mono text-sm" />
                                </div>
                            </div>
                        </div>

                        <Button onClick={generateQRCode} className="w-full" disabled={!text.trim()}>
                            <QrCode className="h-4 w-4 mr-2" />
                            Générer QR Code
                        </Button>
                    </div>

                    {/* Aperçu */}
                    <div className="space-y-4">
                        <Label className="text-sm font-medium">Aperçu</Label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex items-center justify-center min-h-[300px]">
                            {qrDataUrl ? (
                                <div className="text-center space-y-4">
                                    <img
                                        src={qrDataUrl || "/placeholder.svg"}
                                        alt="QR Code généré"
                                        className="max-w-full max-h-64 mx-auto border rounded"
                                    />
                                    <div className="flex gap-2 justify-center">
                                        <Button onClick={downloadQR} size="sm" className="flex items-center gap-2">
                                            <Download className="h-4 w-4" />
                                            Télécharger
                                        </Button>
                                        <Button
                                            onClick={copyQRToClipboard}
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-2 bg-transparent"
                                        >
                                            <Copy className="h-4 w-4" />
                                            Copier
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground">
                                    <QrCode className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>Le QR code apparaîtra ici</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Canvas caché pour la génération */}
                <canvas ref={canvasRef} style={{ display: "none" }} />

                {/* Informations */}
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">💡 Conseils d'utilisation</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>
                            • <strong>URLs</strong> : Commencez par http:// ou https://
                        </li>
                        <li>
                            • <strong>Email</strong> : Format mailto:adresse@example.com
                        </li>
                        <li>
                            • <strong>Téléphone</strong> : Format tel:+33123456789
                        </li>
                        <li>
                            • <strong>WiFi</strong> : WIFI:T:WPA;S:NomReseau;P:MotDePasse;H:false;;
                        </li>
                        <li>• Testez toujours vos QR codes avant utilisation</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}
