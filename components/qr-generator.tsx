"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { QrCode, Download, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type QRSize = "150" | "200" | "300" | "400"

export function QRGenerator() {
    const [text, setText] = useState("")
    const [size, setSize] = useState<QRSize>("200")
    const [qrUrl, setQrUrl] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const { toast } = useToast()

    const generateQR = async () => {
        if (!text.trim()) {
            toast({
                title: "Erreur",
                description: "Veuillez saisir du texte ou une URL",
                variant: "destructive",
            })
            return
        }

        setIsGenerating(true)

        try {
            // Utilisation de l'API QR Server (gratuite et fiable)
            const encodedText = encodeURIComponent(text.trim())
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&format=png`

            setQrUrl(url)

            toast({
                title: "Succès",
                description: "QR Code généré avec succès",
            })
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Erreur lors de la génération du QR Code",
                variant: "destructive",
            })
        } finally {
            setIsGenerating(false)
        }
    }

    const downloadQR = async () => {
        if (!qrUrl) return

        try {
            const response = await fetch(qrUrl)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)

            const link = document.createElement("a")
            link.href = url
            link.download = `qrcode-${Date.now()}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)

            toast({
                title: "Téléchargé",
                description: "QR Code téléchargé avec succès",
            })
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Erreur lors du téléchargement",
                variant: "destructive",
            })
        }
    }

    const loadExample = () => {
        setText("https://github.com")
    }

    const sizeOptions = [
        { value: "150", label: "150×150 (Petit)" },
        { value: "200", label: "200×200 (Moyen)" },
        { value: "300", label: "300×300 (Grand)" },
        { value: "400", label: "400×400 (Très grand)" },
    ]

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    Générateur QR Code
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Texte ou URL</label>
                            <Button variant="outline" size="sm" onClick={loadExample}>
                                Exemple
                            </Button>
                        </div>
                        <Input
                            placeholder="Saisissez votre texte, URL, email, etc..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Taille</label>
                        <Select value={size} onValueChange={(value: QRSize) => setSize(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {sizeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button onClick={generateQR} disabled={isGenerating || !text.trim()} className="w-full">
                        {isGenerating ? "Génération..." : "Générer QR Code"}
                    </Button>
                </div>

                {qrUrl && (
                    <div className="space-y-4">
                        <div className="text-center">
                            <div className="inline-block p-4 bg-white rounded-lg shadow-lg border">
                                <img
                                    src={qrUrl || "/placeholder.svg"}
                                    alt="QR Code généré"
                                    className="max-w-full h-auto"
                                    style={{ imageRendering: "pixelated" }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <Button onClick={downloadQR} className="flex-1">
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger PNG
                            </Button>
                            <Button variant="outline" onClick={() => window.open(qrUrl, "_blank")} className="flex-1">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Ouvrir dans un nouvel onglet
                            </Button>
                        </div>

                        <div className="text-center space-y-2">
                            <div className="flex justify-center gap-2">
                                <Badge variant="secondary">
                                    Taille: {size}×{size}px
                                </Badge>
                                <Badge variant="outline">Format: PNG</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Contenu: {text.length > 50 ? `${text.substring(0, 50)}...` : text}
                            </p>
                        </div>
                    </div>
                )}

                <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                        <strong>Conseils d'utilisation :</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Les URLs doivent commencer par http:// ou https://</li>
                        <li>Pour un email : mailto:exemple@email.com</li>
                        <li>Pour un SMS : sms:+33123456789</li>
                        <li>Pour un WiFi : WIFI:T:WPA;S:NomReseau;P:MotDePasse;;</li>
                        <li>Plus le contenu est long, plus le QR code sera complexe</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}
