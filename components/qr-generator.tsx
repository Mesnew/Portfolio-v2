"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, QrCode } from "lucide-react"

export function QRGenerator() {
    const [text, setText] = useState("")
    const [size, setSize] = useState("200")
    const [qrUrl, setQrUrl] = useState("")

    const generateQR = () => {
        if (!text.trim()) return

        const encodedText = encodeURIComponent(text)
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`
        setQrUrl(url)
    }

    const downloadQR = () => {
        if (!qrUrl) return

        const link = document.createElement("a")
        link.href = qrUrl
        link.download = "qrcode.png"
        link.click()
    }

    const copyUrl = () => {
        navigator.clipboard.writeText(qrUrl)
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Texte ou URL à encoder</Label>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Entrez votre texte, URL, ou toute information..."
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
                <QrCode className="h-4 w-4 mr-2" />
                Générer QR Code
            </Button>

            {qrUrl && (
                <div className="space-y-4">
                    <div className="text-center">
                        <img src={qrUrl || "/placeholder.svg"} alt="QR Code" className="mx-auto border rounded" />
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" onClick={copyUrl} className="flex-1 bg-transparent">
                            <Copy className="h-4 w-4 mr-2" />
                            Copier URL
                        </Button>
                        <Button variant="outline" onClick={downloadQR} className="flex-1 bg-transparent">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
