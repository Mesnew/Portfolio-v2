"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QrCode, Download, RefreshCw } from "lucide-react"

export function QRGenerator() {
    const [text, setText] = useState("")
    const [size, setSize] = useState("200")
    const [qrCodeUrl, setQrCodeUrl] = useState("")

    const sizes = [
        { value: "150", label: "150×150 (Petit)" },
        { value: "200", label: "200×200 (Moyen)" },
        { value: "300", label: "300×300 (Grand)" },
        { value: "400", label: "400×400 (Très grand)" },
    ]

    const generateQR = () => {
        if (!text.trim()) {
            setQrCodeUrl("")
            return
        }

        // Utiliser l'API QR Server (gratuite)
        const encodedText = encodeURIComponent(text)
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`
        setQrCodeUrl(url)
    }

    const downloadQR = () => {
        if (!qrCodeUrl) return

        const link = document.createElement("a")
        link.href = qrCodeUrl
        link.download = `qrcode-${size}x${size}.png`
        link.click()
    }

    const clearAll = () => {
        setText("")
        setQrCodeUrl("")
    }

    const loadExample = () => {
        setText("https://portfolio.mesnew.fr")
        setTimeout(generateQR, 100)
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Texte ou URL</Label>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Entrez le texte, URL ou données à encoder..."
                    rows={3}
                />
            </div>

            <div className="space-y-2">
                <Label>Taille</Label>
                <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {sizes.map((sizeOption) => (
                            <SelectItem key={sizeOption.value} value={sizeOption.value}>
                                {sizeOption.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex gap-2">
                <Button onClick={generateQR} disabled={!text.trim()} className="flex-1">
                    <QrCode className="h-4 w-4 mr-2" />
                    Générer QR Code
                </Button>
                <Button variant="outline" onClick={loadExample} className="bg-transparent">
                    Exemple
                </Button>
                <Button variant="outline" onClick={clearAll} className="bg-transparent">
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>

            {qrCodeUrl && (
                <div className="space-y-4">
                    <div className="flex justify-center p-4 bg-white rounded-lg border">
                        <img
                            src={qrCodeUrl || "/placeholder.svg"}
                            alt="QR Code généré"
                            className="max-w-full h-auto"
                            style={{ imageRendering: "pixelated" }}
                        />
                    </div>

                    <Button onClick={downloadQR} variant="outline" className="w-full bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger PNG
                    </Button>
                </div>
            )}

            <div className="text-xs text-muted-foreground">
                <p>• Supporte texte, URLs, emails, numéros de téléphone</p>
                <p>• Format PNG haute qualité</p>
                <p>• Limite recommandée : 2000 caractères</p>
            </div>
        </div>
    )
}
