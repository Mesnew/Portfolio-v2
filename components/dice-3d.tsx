"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import * as THREE from "three"

interface Dice3DProps {
    onRoll?: (value: number) => void
    isRolling?: boolean
}

export function Dice3D({ onRoll, isRolling: externalIsRolling }: Dice3DProps) {
    const mountRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<THREE.Scene>()
    const rendererRef = useRef<THREE.WebGLRenderer>()
    const cameraRef = useRef<THREE.PerspectiveCamera>()
    const diceRef = useRef<THREE.Mesh>()
    const animationRef = useRef<number>()
    const [currentValue, setCurrentValue] = useState(1)
    const [showResult, setShowResult] = useState(true)
    const [internalIsRolling, setInternalIsRolling] = useState(false)

    const isRolling = externalIsRolling ?? internalIsRolling

    // Fonction pour créer les matériaux des faces du dé
    const createDiceFaceMaterial = (num: number) => {
        const texSize = 512
        const circSize = 35
        const canvas = document.createElement("canvas")
        canvas.width = texSize
        canvas.height = texSize

        const ctx = canvas.getContext("2d")!

        // Fond blanc propre
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, texSize, texSize)

        // Bordure noire fine
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 4
        ctx.strokeRect(0, 0, texSize, texSize)

        // Dessiner les points selon le numéro
        ctx.fillStyle = "#000000"

        const positions = {
            1: [[0.5, 0.5]], // centre
            2: [
                [0.25, 0.25],
                [0.75, 0.75],
            ], // diagonale
            3: [
                [0.25, 0.25],
                [0.5, 0.5],
                [0.75, 0.75],
            ], // diagonale + centre
            4: [
                [0.25, 0.25],
                [0.75, 0.25],
                [0.25, 0.75],
                [0.75, 0.75],
            ], // coins
            5: [
                [0.25, 0.25],
                [0.75, 0.25],
                [0.5, 0.5],
                [0.25, 0.75],
                [0.75, 0.75],
            ], // coins + centre
            6: [
                [0.25, 0.2],
                [0.75, 0.2],
                [0.25, 0.5],
                [0.75, 0.5],
                [0.25, 0.8],
                [0.75, 0.8],
            ], // deux colonnes
        }

        const dots = positions[num as keyof typeof positions]
        dots.forEach(([x, y]) => {
            ctx.beginPath()
            ctx.arc(x * texSize, y * texSize, circSize, 0, 2 * Math.PI)
            ctx.fill()
        })

        const texture = new THREE.CanvasTexture(canvas)
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.flipY = false

        return new THREE.MeshLambertMaterial({
            map: texture,
            transparent: false,
        })
    }

    // Initialiser la scène Three.js
    useEffect(() => {
        if (!mountRef.current) return

        // Scène
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0xf5f5f5)
        sceneRef.current = scene

        // Caméra
        const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000)
        camera.position.set(25, 25, 50)
        camera.lookAt(0, 0, 0)
        cameraRef.current = camera

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(400, 300)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        rendererRef.current = renderer

        // Éclairage
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
        directionalLight.position.set(50, 50, 50)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.width = 2048
        directionalLight.shadow.mapSize.height = 2048
        scene.add(directionalLight)

        // Créer le dé avec géométrie simple
        const diceGeometry = new THREE.BoxGeometry(20, 20, 20)

        // Créer les matériaux pour chaque face
        const diceMaterials = [
            createDiceFaceMaterial(4), // face droite (X+)
            createDiceFaceMaterial(1), // face gauche (X-)
            createDiceFaceMaterial(2), // face haut (Y+)
            createDiceFaceMaterial(5), // face bas (Y-)
            createDiceFaceMaterial(3), // face avant (Z+)
            createDiceFaceMaterial(6), // face arrière (Z-)
        ]

        const diceMesh = new THREE.Mesh(diceGeometry, diceMaterials)
        diceMesh.castShadow = true
        diceMesh.receiveShadow = true
        diceRef.current = diceMesh

        scene.add(diceMesh)

        // Sol pour les ombres
        const floorGeometry = new THREE.PlaneGeometry(100, 100)
        const floorMaterial = new THREE.MeshLambertMaterial({
            color: 0xcccccc,
            transparent: true,
            opacity: 0.5,
        })
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.rotation.x = -Math.PI / 2
        floor.position.y = -15
        floor.receiveShadow = true
        scene.add(floor)

        mountRef.current.appendChild(renderer.domElement)

        // Position initiale du dé (face 1 visible)
        diceMesh.rotation.set(0, Math.PI / 2, 0)

        // Animation loop
        const animate = () => {
            animationRef.current = requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement)
            }
            renderer.dispose()
        }
    }, [])

    // Fonction pour lancer le dé
    const rollDice = () => {
        if (isRolling || !diceRef.current) return

        setShowResult(false)
        setInternalIsRolling(true)
        const newValue = Math.floor(Math.random() * 6) + 1

        // Vibration si supportée
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100])
        }

        // Appeler onRoll seulement si c'est une fonction
        if (typeof onRoll === "function") {
            onRoll(newValue)
        }

        // Animation de lancer
        const startRotation = {
            x: diceRef.current.rotation.x,
            y: diceRef.current.rotation.y,
            z: diceRef.current.rotation.z,
        }

        // Rotations finales pour afficher la bonne face
        const finalRotations = {
            1: { x: 0, y: Math.PI / 2, z: 0 }, // face 1 visible
            2: { x: Math.PI / 2, y: 0, z: 0 }, // face 2 visible
            3: { x: 0, y: 0, z: 0 }, // face 3 visible
            4: { x: 0, y: Math.PI, z: 0 }, // face 4 visible
            5: { x: -Math.PI / 2, y: 0, z: 0 }, // face 5 visible
            6: { x: 0, y: -Math.PI / 2, z: 0 }, // face 6 visible
        }

        const targetRotation = finalRotations[newValue as keyof typeof finalRotations]

        // Ajouter plusieurs tours complets pour l'effet de roulement
        const extraRotations = {
            x: targetRotation.x + Math.PI * 2 * (3 + Math.random() * 3),
            y: targetRotation.y + Math.PI * 2 * (3 + Math.random() * 3),
            z: targetRotation.z + Math.PI * 2 * (3 + Math.random() * 3),
        }

        // Animation avec easing
        const duration = 2500
        const startTime = Date.now()

        const animateRoll = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Easing function (ease-out-cubic)
            const easeOutCubic = 1 - Math.pow(1 - progress, 3)

            if (diceRef.current) {
                diceRef.current.rotation.x = startRotation.x + (extraRotations.x - startRotation.x) * easeOutCubic
                diceRef.current.rotation.y = startRotation.y + (extraRotations.y - startRotation.y) * easeOutCubic
                diceRef.current.rotation.z = startRotation.z + (extraRotations.z - startRotation.z) * easeOutCubic

                // Effet de rebond sur l'axe Y
                const bounceHeight = Math.sin(progress * Math.PI * 2) * (1 - progress) * 15
                diceRef.current.position.y = bounceHeight
            }

            if (progress < 1) {
                requestAnimationFrame(animateRoll)
            } else {
                // Animation terminée - position finale exacte
                if (diceRef.current) {
                    diceRef.current.rotation.set(targetRotation.x, targetRotation.y, targetRotation.z)
                    diceRef.current.position.y = 0
                }
                setCurrentValue(newValue)
                setShowResult(true)
                setInternalIsRolling(false)
            }
        }

        animateRoll()
    }

    return (
        <div className="flex flex-col items-center space-y-6">
            <div
                ref={mountRef}
                className="border-2 border-gray-300 rounded-lg shadow-lg bg-gradient-to-br from-gray-100 to-gray-200"
                style={{ width: 400, height: 300 }}
            />

            <div className="text-center">
                <div className="text-2xl font-bold mb-4 min-h-[32px] flex items-center justify-center">
                    {showResult ? `🎲 Résultat: ${currentValue}` : "🎲 Lancement..."}
                </div>
                <Button onClick={rollDice} disabled={isRolling} className="w-full min-w-[200px] h-12 text-lg font-semibold">
                    {isRolling ? "🎲 En cours..." : "🎲 Lancer le dé"}
                </Button>
            </div>

            <div className="text-sm text-gray-600 text-center max-w-md">
                <p>Dé 3D interactif avec physique réaliste</p>
                <p className="text-xs mt-1">Cliquez pour lancer • Animation 2.5 secondes</p>
            </div>
        </div>
    )
}
