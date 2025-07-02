"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Paintbrush,
    Eraser,
    Download,
    RotateCcw,
    Undo2,
    Redo2,
    Square,
    Circle,
    Minus,
    Save,
    Palette,
} from "lucide-react"

type Tool = "brush" | "eraser" | "rectangle" | "circle" | "line"

interface DrawingState {
    imageData: ImageData | null
}

export function DrawingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [tool, setTool] = useState<Tool>("brush")
    const [brushSize, setBrushSize] = useState([5])
    const [currentColor, setCurrentColor] = useState("#000000")
    const [canvasSize, setCanvasSize] = useState("400x300")
    const [history, setHistory] = useState<DrawingState[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [startPos, setStartPos] = useState({ x: 0, y: 0 })

    const colors = [
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF",
        "#FFA500",
        "#800080",
        "#FFC0CB",
        "#A52A2A",
        "#808080",
        "#90EE90",
        "#FFB6C1",
    ]

    const canvasSizes = [
        { value: "400x300", label: "400×300 (Standard)" },
        { value: "600x400", label: "600×400 (Large)" },
        { value: "800x600", label: "800×600 (XL)" },
        { value: "300x300", label: "300×300 (Carré)" },
        { value: "500x500", label: "500×500 (Grand carré)" },
    ]

    const [width, height] = canvasSize.split("x").map(Number)

    useEffect(() => {
        initializeCanvas()
    }, [canvasSize])

    const initializeCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Redimensionner le canvas
        canvas.width = width
        canvas.height = height

        // Initialiser avec un fond blanc
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Sauvegarder l'état initial
        saveState()
    }

    const saveState = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push({ imageData })

        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)
    }

    const undo = () => {
        if (historyIndex > 0) {
            const canvas = canvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext("2d")
            if (!ctx) return

            const prevState = history[historyIndex - 1]
            if (prevState.imageData) {
                ctx.putImageData(prevState.imageData, 0, 0)
                setHistoryIndex(historyIndex - 1)
            }
        }
    }

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const canvas = canvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext("2d")
            if (!ctx) return

            const nextState = history[historyIndex + 1]
            if (nextState.imageData) {
                ctx.putImageData(nextState.imageData, 0, 0)
                setHistoryIndex(historyIndex + 1)
            }
        }
    }

    const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return { x: 0, y: 0 }

        const rect = canvas.getBoundingClientRect()
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }
    }

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const pos = getMousePos(e)
        setStartPos(pos)
        setIsDrawing(true)

        if (tool === "brush" || tool === "eraser") {
            draw(e)
        }
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const pos = getMousePos(e)

        ctx.lineWidth = brushSize[0]
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        if (tool === "brush") {
            ctx.globalCompositeOperation = "source-over"
            ctx.strokeStyle = currentColor
            ctx.lineTo(pos.x, pos.y)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(pos.x, pos.y)
        } else if (tool === "eraser") {
            ctx.globalCompositeOperation = "destination-out"
            ctx.lineTo(pos.x, pos.y)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(pos.x, pos.y)
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
            ctx.strokeStyle = currentColor
            ctx.lineWidth = brushSize[0]
            ctx.strokeRect(
                Math.min(startPos.x, pos.x),
                Math.min(startPos.y, pos.y),
                Math.abs(pos.x - startPos.x),
                Math.abs(pos.y - startPos.y),
            )
        } else if (tool === "circle") {
            ctx.globalCompositeOperation = "source-over"
            ctx.strokeStyle = currentColor
            ctx.lineWidth = brushSize[0]
            const radius = Math.sqrt(Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2))
            ctx.beginPath()
            ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI)
            ctx.stroke()
        } else if (tool === "line") {
            ctx.globalCompositeOperation = "source-over"
            ctx.strokeStyle = currentColor
            ctx.lineWidth = brushSize[0]
            ctx.beginPath()
            ctx.moveTo(startPos.x, startPos.y)
            ctx.lineTo(pos.x, pos.y)
            ctx.stroke()
        }

        setIsDrawing(false)
        ctx.beginPath()

        // Sauvegarder l'état après chaque action
        setTimeout(saveState, 10)
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        saveState()
    }

    const downloadCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const link = document.createElement("a")
        link.download = `dessin-${canvasSize}.png`
        link.href = canvas.toDataURL()
        link.click()
    }

    const saveAsJPG = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const link = document.createElement("a")
        link.download = `dessin-${canvasSize}.jpg`
        link.href = canvas.toDataURL("image/jpeg", 0.9)
        link.click()
    }

    return (
        <div className="space-y-4">
            {/* Barre d'outils principale */}
            <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg">
                <Button variant={tool === "brush" ? "default" : "outline"} onClick={() => setTool("brush")} size="sm">
                    <Paintbrush className="h-4 w-4 mr-2" />
                    Pinceau
                </Button>
                <Button variant={tool === "eraser" ? "default" : "outline"} onClick={() => setTool("eraser")} size="sm">
                    <Eraser className="h-4 w-4 mr-2" />
                    Gomme
                </Button>
                <Button variant={tool === "rectangle" ? "default" : "outline"} onClick={() => setTool("rectangle")} size="sm">
                    <Square className="h-4 w-4 mr-2" />
                    Rectangle
                </Button>
                <Button variant={tool === "circle" ? "default" : "outline"} onClick={() => setTool("circle")} size="sm">
                    <Circle className="h-4 w-4 mr-2" />
                    Cercle
                </Button>
                <Button variant={tool === "line" ? "default" : "outline"} onClick={() => setTool("line")} size="sm">
                    <Minus className="h-4 w-4 mr-2" />
                    Ligne
                </Button>
            </div>

            {/* Contrôles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
                {/* Taille */}
                <div className="space-y-2">
                    <Label>Taille: {brushSize[0]}px</Label>
                    <Slider value={brushSize} onValueChange={setBrushSize} max={50} min={1} step={1} />
                </div>

                {/* Taille du canvas */}
                <div className="space-y-2">
                    <Label>Taille du canvas</Label>
                    <Select value={canvasSize} onValueChange={setCanvasSize}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {canvasSizes.map((size) => (
                                <SelectItem key={size.value} value={size.value}>
                                    {size.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Button variant="outline" onClick={undo} disabled={historyIndex <= 0} size="sm">
                        <Undo2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={redo} disabled={historyIndex >= history.length - 1} size="sm">
                        <Redo2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Palette de couleurs */}
            <div className="space-y-2">
                <Label className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Couleurs
                </Label>
                <div className="flex gap-2 flex-wrap p-3 bg-muted/30 rounded-lg">
                    {colors.map((color) => (
                        <button
                            key={color}
                            className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                                currentColor === color ? "border-gray-800 scale-110" : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setCurrentColor(color)}
                            title={color}
                        />
                    ))}
                    <input
                        type="color"
                        value={currentColor}
                        onChange={(e) => setCurrentColor(e.target.value)}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
                        title="Couleur personnalisée"
                    />
                </div>
            </div>

            {/* Canvas */}
            <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg overflow-hidden bg-white">
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    className="cursor-crosshair block mx-auto max-w-full h-auto"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        imageRendering: "pixelated",
                    }}
                />
            </div>

            {/* Actions de sauvegarde */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Button variant="outline" onClick={clearCanvas} className="bg-transparent">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Effacer tout
                </Button>
                <Button variant="outline" onClick={downloadCanvas} className="bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    PNG
                </Button>
                <Button variant="outline" onClick={saveAsJPG} className="bg-transparent">
                    <Save className="h-4 w-4 mr-2" />
                    JPG
                </Button>
            </div>

            <div className="text-xs text-muted-foreground text-center space-y-1">
                <p>Cliquez et glissez pour dessiner • Utilisez les outils pour créer des formes</p>
                <p>Ctrl+Z pour annuler • Ctrl+Y pour refaire</p>
            </div>
        </div>
    )
}
