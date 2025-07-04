"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Paintbrush, Eraser, Square, Circle, Minus, Download, RotateCcw, Redo, Palette } from "lucide-react"

export function DrawingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [tool, setTool] = useState<"brush" | "eraser" | "rectangle" | "circle" | "line">("brush")
    const [color, setColor] = useState("#000000")
    const [brushSize, setBrushSize] = useState(5)
    const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 })
    const [history, setHistory] = useState<ImageData[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [startPos, setStartPos] = useState({ x: 0, y: 0 })

    const colors = [
        "#000000",
        "#ffffff",
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
        "#ffa500",
        "#800080",
        "#ffc0cb",
        "#a52a2a",
        "#808080",
        "#008000",
        "#000080",
    ]

    const canvasSizes = [
        { label: "Petit", width: 400, height: 300 },
        { label: "Moyen", width: 600, height: 450 },
        { label: "Grand", width: 800, height: 600 },
        { label: "Large", width: 1000, height: 600 },
        { label: "XL", width: 1000, height: 700 },
    ]

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Initialiser le canvas avec un fond blanc
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Sauvegarder l'état initial
        saveToHistory()
    }, [canvasSize])

    const saveToHistory = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(imageData)
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)
    }

    const undo = () => {
        if (historyIndex > 0) {
            const canvas = canvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext("2d")
            if (!ctx) return

            const newIndex = historyIndex - 1
            ctx.putImageData(history[newIndex], 0, 0)
            setHistoryIndex(newIndex)
        }
    }

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const canvas = canvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext("2d")
            if (!ctx) return

            const newIndex = historyIndex + 1
            ctx.putImageData(history[newIndex], 0, 0)
            setHistoryIndex(newIndex)
        }
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        saveToHistory()
    }

    const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return { x: 0, y: 0 }

        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height

        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY,
        }
    }

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const pos = getMousePos(e)
        setStartPos(pos)
        setIsDrawing(true)

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.lineWidth = brushSize

        if (tool === "brush") {
            ctx.globalCompositeOperation = "source-over"
            ctx.strokeStyle = color
            ctx.beginPath()
            ctx.moveTo(pos.x, pos.y)
        } else if (tool === "eraser") {
            ctx.globalCompositeOperation = "destination-out"
            ctx.beginPath()
            ctx.moveTo(pos.x, pos.y)
        }
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const pos = getMousePos(e)

        if (tool === "brush" || tool === "eraser") {
            ctx.lineTo(pos.x, pos.y)
            ctx.stroke()
        }
    }

    const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const pos = getMousePos(e)

        if (tool === "rectangle") {
            ctx.globalCompositeOperation = "source-over"
            ctx.strokeStyle = color
            ctx.lineWidth = brushSize
            ctx.strokeRect(
                Math.min(startPos.x, pos.x),
                Math.min(startPos.y, pos.y),
                Math.abs(pos.x - startPos.x),
                Math.abs(pos.y - startPos.y),
            )
        } else if (tool === "circle") {
            ctx.globalCompositeOperation = "source-over"
            ctx.strokeStyle = color
            ctx.lineWidth = brushSize
            const radius = Math.sqrt(Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2))
            ctx.beginPath()
            ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI)
            ctx.stroke()
        } else if (tool === "line") {
            ctx.globalCompositeOperation = "source-over"
            ctx.strokeStyle = color
            ctx.lineWidth = brushSize
            ctx.beginPath()
            ctx.moveTo(startPos.x, startPos.y)
            ctx.lineTo(pos.x, pos.y)
            ctx.stroke()
        }

        setIsDrawing(false)
        saveToHistory()
    }

    const downloadCanvas = (format: "png" | "jpg") => {
        const canvas = canvasRef.current
        if (!canvas) return

        const link = document.createElement("a")
        link.download = `drawing.${format}`
        link.href = canvas.toDataURL(`image/${format}`)
        link.click()
    }

    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Paintbrush className="h-5 w-5" />
                    Canvas de Dessin Avancé
                    <Badge variant="secondary">HTML5</Badge>
                </CardTitle>
                <CardDescription>Outil de dessin complet avec formes géométriques, historique et export</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Barre d'outils */}
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Outils */}
                    <div className="flex gap-2">
                        <Button variant={tool === "brush" ? "default" : "outline"} size="sm" onClick={() => setTool("brush")}>
                            <Paintbrush className="h-4 w-4" />
                        </Button>
                        <Button variant={tool === "eraser" ? "default" : "outline"} size="sm" onClick={() => setTool("eraser")}>
                            <Eraser className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={tool === "rectangle" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTool("rectangle")}
                        >
                            <Square className="h-4 w-4" />
                        </Button>
                        <Button variant={tool === "circle" ? "default" : "outline"} size="sm" onClick={() => setTool("circle")}>
                            <Circle className="h-4 w-4" />
                        </Button>
                        <Button variant={tool === "line" ? "default" : "outline"} size="sm" onClick={() => setTool("line")}>
                            <Minus className="h-4 w-4" />
                        </Button>
                    </div>

                    <Separator orientation="vertical" className="h-8" />

                    {/* Taille du pinceau */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Taille:</span>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={brushSize}
                            onChange={(e) => setBrushSize(Number(e.target.value))}
                            className="w-20"
                        />
                        <span className="text-sm w-8">{brushSize}</span>
                    </div>

                    <Separator orientation="vertical" className="h-8" />

                    {/* Actions */}
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0}>
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}>
                            <Redo className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={clearCanvas}>
                            Effacer
                        </Button>
                    </div>
                </div>

                {/* Palette de couleurs */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        <span className="text-sm font-medium">Couleurs:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {colors.map((c) => (
                            <button
                                key={c}
                                className={`w-8 h-8 rounded border-2 transition-all ${
                                    color === c ? "border-gray-800 scale-110" : "border-gray-300"
                                }`}
                                style={{ backgroundColor: c }}
                                onClick={() => setColor(c)}
                            />
                        ))}
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-8 h-8 rounded border-2 border-gray-300 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Taille du canvas */}
                <div className="space-y-2">
                    <span className="text-sm font-medium">Taille du canvas:</span>
                    <div className="flex gap-2">
                        {canvasSizes.map((size) => (
                            <Button
                                key={size.label}
                                variant={canvasSize.width === size.width && canvasSize.height === size.height ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCanvasSize({ width: size.width, height: size.height })}
                            >
                                {size.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Canvas */}
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                    <canvas
                        ref={canvasRef}
                        width={canvasSize.width}
                        height={canvasSize.height}
                        className="max-w-full h-auto cursor-crosshair"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                    />
                </div>

                {/* Export */}
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => downloadCanvas("png")} className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        PNG
                    </Button>
                    <Button variant="outline" onClick={() => downloadCanvas("jpg")} className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        JPG
                    </Button>
                </div>

                {/* Informations */}
                <div className="text-sm text-muted-foreground">
                    <p>
                        Canvas: {canvasSize.width} × {canvasSize.height}px
                    </p>
                    <p>
                        Outil actuel: {tool} • Taille: {brushSize}px • Couleur: {color}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
