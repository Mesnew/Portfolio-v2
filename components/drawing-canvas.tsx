"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Brush, Eraser, Square, Circle, Minus, Download, Trash2, Undo, Redo, Palette } from "lucide-react"

type Tool = "brush" | "eraser" | "rectangle" | "circle" | "line"
type CanvasSize = "small" | "medium" | "large" | "xlarge" | "custom"

interface Point {
    x: number
    y: number
}

interface DrawAction {
    tool: Tool
    color: string
    size: number
    points: Point[]
    startPoint?: Point
    endPoint?: Point
}

export function DrawingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [tool, setTool] = useState<Tool>("brush")
    const [color, setColor] = useState("#000000")
    const [brushSize, setBrushSize] = useState(5)
    const [canvasSize, setCanvasSize] = useState<CanvasSize>("medium")
    const [history, setHistory] = useState<ImageData[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [startPoint, setStartPoint] = useState<Point | null>(null)
    const [customColor, setCustomColor] = useState("#ff0000")

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
        "#000080",
        "#008000",
    ]

    const canvasSizes = {
        small: { width: 400, height: 300, label: "400×300" },
        medium: { width: 600, height: 400, label: "600×400" },
        large: { width: 800, height: 600, label: "800×600" },
        xlarge: { width: 1000, height: 700, label: "1000×700" },
        custom: { width: 500, height: 500, label: "500×500" },
    }

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
            const ctx = canvas?.getContext("2d")
            if (!canvas || !ctx) return

            setHistoryIndex(historyIndex - 1)
            ctx.putImageData(history[historyIndex - 1], 0, 0)
        }
    }

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const canvas = canvasRef.current
            const ctx = canvas?.getContext("2d")
            if (!canvas || !ctx) return

            setHistoryIndex(historyIndex + 1)
            ctx.putImageData(history[historyIndex + 1], 0, 0)
        }
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        saveToHistory()
    }

    const downloadCanvas = (format: "png" | "jpg" = "png") => {
        const canvas = canvasRef.current
        if (!canvas) return

        const link = document.createElement("a")
        link.download = `drawing-${Date.now()}.${format}`
        link.href = canvas.toDataURL(`image/${format}`)
        link.click()
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
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const pos = getMousePos(e)
        setIsDrawing(true)
        setStartPoint(pos)

        if (tool === "brush" || tool === "eraser") {
            ctx.beginPath()
            ctx.moveTo(pos.x, pos.y)
        }
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return

        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const pos = getMousePos(e)

        if (tool === "brush") {
            ctx.globalCompositeOperation = "source-over"
            ctx.strokeStyle = color
            ctx.lineWidth = brushSize
            ctx.lineCap = "round"
            ctx.lineJoin = "round"
            ctx.lineTo(pos.x, pos.y)
            ctx.stroke()
        } else if (tool === "eraser") {
            ctx.globalCompositeOperation = "destination-out"
            ctx.lineWidth = brushSize
            ctx.lineCap = "round"
            ctx.lineJoin = "round"
            ctx.lineTo(pos.x, pos.y)
            ctx.stroke()
        }
    }

    const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !startPoint) return

        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const pos = getMousePos(e)
        setIsDrawing(false)

        ctx.globalCompositeOperation = "source-over"
        ctx.strokeStyle = color
        ctx.lineWidth = brushSize

        if (tool === "rectangle") {
            const width = pos.x - startPoint.x
            const height = pos.y - startPoint.y
            ctx.strokeRect(startPoint.x, startPoint.y, width, height)
        } else if (tool === "circle") {
            const radius = Math.sqrt(Math.pow(pos.x - startPoint.x, 2) + Math.pow(pos.y - startPoint.y, 2))
            ctx.beginPath()
            ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI)
            ctx.stroke()
        } else if (tool === "line") {
            ctx.beginPath()
            ctx.moveTo(startPoint.x, startPoint.y)
            ctx.lineTo(pos.x, pos.y)
            ctx.stroke()
        }

        saveToHistory()
        setStartPoint(null)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        // Initialize white background
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        saveToHistory()
    }, [canvasSize])

    const currentSize = canvasSizes[canvasSize]

    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Canvas Créatif
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Toolbar */}
                <div className="flex flex-wrap gap-4 items-center p-4 bg-muted rounded-lg">
                    {/* Tools */}
                    <div className="flex gap-2">
                        <Button variant={tool === "brush" ? "default" : "outline"} size="sm" onClick={() => setTool("brush")}>
                            <Brush className="h-4 w-4" />
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

                    {/* Colors */}
                    <div className="flex gap-2 flex-wrap">
                        {colors.map((c) => (
                            <button
                                key={c}
                                className={`w-8 h-8 rounded-full border-2 ${color === c ? "border-primary" : "border-gray-300"}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setColor(c)}
                            />
                        ))}
                        <input
                            type="color"
                            value={customColor}
                            onChange={(e) => {
                                setCustomColor(e.target.value)
                                setColor(e.target.value)
                            }}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
                        />
                    </div>

                    <Separator orientation="vertical" className="h-8" />

                    {/* Brush Size */}
                    <div className="flex items-center gap-2 min-w-[120px]">
                        <span className="text-sm">Taille:</span>
                        <Slider
                            value={[brushSize]}
                            onValueChange={(value) => setBrushSize(value[0])}
                            max={50}
                            min={1}
                            step={1}
                            className="flex-1"
                        />
                        <Badge variant="outline">{brushSize}px</Badge>
                    </div>
                </div>

                {/* Canvas Size & Actions */}
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Taille du canvas:</span>
                        <Select value={canvasSize} onValueChange={(value: CanvasSize) => setCanvasSize(value)}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(canvasSizes).map(([key, size]) => (
                                    <SelectItem key={key} value={key}>
                                        {size.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0}>
                            <Undo className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}>
                            <Redo className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={clearCanvas}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => downloadCanvas("png")}>
                            <Download className="h-4 w-4" />
                            PNG
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => downloadCanvas("jpg")}>
                            <Download className="h-4 w-4" />
                            JPG
                        </Button>
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex justify-center">
                    <div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg">
                        <canvas
                            ref={canvasRef}
                            width={currentSize.width}
                            height={currentSize.height}
                            className="cursor-crosshair max-w-full h-auto"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                        />
                    </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Outil actuel: <Badge variant="secondary">{tool}</Badge> | Couleur:{" "}
                    <span className="inline-block w-4 h-4 rounded-full border ml-1" style={{ backgroundColor: color }} /> |
                    Taille: {brushSize}px
                </div>
            </CardContent>
        </Card>
    )
}
