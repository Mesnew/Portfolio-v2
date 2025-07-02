"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Download, Copy } from "lucide-react"

export function QRGenerator() {
    const [text, setText] = useState("")
    const [qrCode, setQrCode] = useState("")
    const [size, setSize] = useState("200")

    const generateQR = () => {
        if (!text.trim()) return

        // Utilisation de l'API QR Server (gratuite)
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`
        setQrCode(qrUrl)
    }

    const downloadQR = () => {
        if (!qrCode) return

        const link = document.createElement("a")
        link.href = qrCode
        link.download = "qrcode.png"
        link.click()
    }

    const copyQRUrl = () => {
        if (qrCode) {
            navigator.clipboard.writeText(qrCode)
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Texte ou URL à encoder</Label>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Entrez votre texte, URL, email, etc."
                    rows={3}
                />
            </div>

            <div className="space-y-2">
                <Label>Taille (pixels)</Label>
                <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full p-2 border rounded">
                    <option value="150">150x150</option>
                    <option value="200">200x200</option>
                    <option value="300">300x300</option>
                    <option value="400">400x400</option>
                </select>
            </div>

            <Button onClick={generateQR} className="w-full" disabled={!text.trim()}>
                Générer QR Code
            </Button>

            {qrCode && (
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <img src={qrCode || "/placeholder.svg"} alt="QR Code généré" className="border rounded shadow-lg" />
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={downloadQR} variant="outline" className="flex-1 bg-transparent">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                        </Button>
                        <Button onClick={copyQRUrl} variant="outline" className="flex-1 bg-transparent">
                            <Copy className="h-4 w-4 mr-2" />
                            Copier URL
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
