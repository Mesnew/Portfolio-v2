"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Paintbrush, Eraser, Download, RotateCcw } from "lucide-react"

export function DrawingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [tool, setTool] = useState<"brush" | "eraser">("brush")
    const [brushSize, setBrushSize] = useState([5])
    const [currentColor, setCurrentColor] = useState("#000000")

    const colors = [
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
            ctx.strokeStyle = currentColor
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
        link.download = "dessin.png"
        link.href = canvas.toDataURL()
        link.click()
    }

    return (
        <div className="space-y-4">
            {/* Outils */}
            <div className="flex gap-2">
                <Button variant={tool === "brush" ? "default" : "outline"} onClick={() => setTool("brush")} size="sm">
                    <Paintbrush className="h-4 w-4 mr-2" />
                    Pinceau
                </Button>
                <Button variant={tool === "eraser" ? "default" : "outline"} onClick={() => setTool("eraser")} size="sm">
                    <Eraser className="h-4 w-4 mr-2" />
                    Gomme
                </Button>
            </div>

            {/* Taille du pinceau */}
            <div className="space-y-2">
                <Label>Taille: {brushSize[0]}px</Label>
                <Slider value={brushSize} onValueChange={setBrushSize} max={50} min={1} step={1} />
            </div>

            {/* Palette de couleurs */}
            <div className="space-y-2">
                <Label>Couleurs</Label>
                <div className="flex gap-2 flex-wrap">
                    {colors.map((color) => (
                        <button
                            key={color}
                            className={`w-8 h-8 rounded border-2 ${currentColor === color ? "border-gray-800" : "border-gray-300"}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setCurrentColor(color)}
                        />
                    ))}
                    <input
                        type="color"
                        value={currentColor}
                        onChange={(e) => setCurrentColor(e.target.value)}
                        className="w-8 h-8 rounded border cursor-pointer"
                    />
                </div>
            </div>

            {/* Canvas */}
            <div className="border rounded overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={300}
                    className="cursor-crosshair bg-white"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <Button variant="outline" onClick={clearCanvas} className="flex-1 bg-transparent">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Effacer
                </Button>
                <Button variant="outline" onClick={downloadCanvas} className="flex-1 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                </Button>
            </div>
        </div>
    )
}
