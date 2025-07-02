"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Download, Trash2, Brush } from "lucide-react"

export function DrawingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [brushSize, setBrushSize] = useState([5])
    const [brushColor, setBrushColor] = useState("#000000")
    const [tool, setTool] = useState<"brush" | "eraser">("brush")

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Initialiser le canvas avec un fond blanc
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }, [])

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true)
        draw(e)
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        ctx.lineWidth = brushSize[0]
        ctx.lineCap = "round"

        if (tool === "brush") {
            ctx.globalCompositeOperation = "source-over"
            ctx.strokeStyle = brushColor
        } else {
            ctx.globalCompositeOperation = "destination-out"
        }

        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
    }

    const stopDrawing = () => {
        if (!isDrawing) return
        setIsDrawing(false)

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.beginPath()
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const downloadCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const link = document.createElement("a")
        link.download = "drawing.png"
        link.href = canvas.toDataURL()
        link.click()
    }

    const predefinedColors = [
        "#000000",
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF",
        "#FFA500",
        "#800080",
        "#FFC0CB",
    ]

    return (
        <div className="space-y-4">
            {/* Outils */}
            <div className="flex flex-wrap gap-4 items-center">
                <div className="flex gap-2">
                    <Button variant={tool === "brush" ? "default" : "outline"} size="sm" onClick={() => setTool("brush")}>
                        <Brush className="h-4 w-4 mr-1" />
                        Pinceau
                    </Button>
                    <Button variant={tool === "eraser" ? "default" : "outline"} size="sm" onClick={() => setTool("eraser")}>
                        Gomme
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Label className="text-sm">Taille: {brushSize[0]}px</Label>
                    <Slider value={brushSize} onValueChange={setBrushSize} max={50} min={1} step={1} className="w-20" />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={brushColor}
                        onChange={(e) => setBrushColor(e.target.value)}
                        className="w-8 h-8 rounded border cursor-pointer"
                    />
                    <Label className="text-sm">Couleur</Label>
                </div>
            </div>

            {/* Palette de couleurs prédéfinies */}
            <div className="flex gap-1 flex-wrap">
                {predefinedColors.map((color) => (
                    <button
                        key={color}
                        className={`w-6 h-6 rounded border-2 ${brushColor === color ? "border-gray-800" : "border-gray-300"}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setBrushColor(color)}
                    />
                ))}
            </div>

            {/* Canvas */}
            <div className="border rounded-lg overflow-hidden bg-white">
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={300}
                    className="cursor-crosshair block mx-auto"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <Button onClick={clearCanvas} variant="outline" className="flex-1 bg-transparent">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Effacer tout
                </Button>
                <Button onClick={downloadCanvas} variant="outline" className="flex-1 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                </Button>
            </div>

            <div className="text-xs text-muted-foreground text-center">
                Cliquez et glissez pour dessiner • Utilisez la gomme pour effacer
            </div>
        </div>
    )
}
