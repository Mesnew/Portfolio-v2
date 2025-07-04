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
    const diceRef = useRef<THREE.Group>()
    const animationRef = useRef<number>()
    const [currentValue, setCurrentValue] = useState(1)
    const [showResult, setShowResult] = useState(true)
    const [internalIsRolling, setInternalIsRolling] = useState(false)

    const isRolling = externalIsRolling ?? internalIsRolling

    // Fonction pour créer une géométrie de cube avec bords arrondis
    const createRoundedBoxGeometry = (
        width: number,
        height: number,
        depth: number,
        radius: number,
        smoothness: number,
    ) => {
        const shape = new THREE.Shape()
        const eps = 0.00001
        const radiusAdjusted = radius - eps

        shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true)
        shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true)
        shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true)
        shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true)

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: depth - radius * 2,
            bevelEnabled: true,
            bevelSegments: smoothness * 2,
            steps: 1,
            bevelSize: radiusAdjusted,
            bevelThickness: radius,
            curveSegments: smoothness,
        })

        geometry.center()
        return geometry
    }

    // Fonction pour créer les matériaux des faces du dé
    const createDiceFaceMaterial = (num: number) => {
        const texSize = 256
        const circSize = 18
        const canvas = document.createElement("canvas")
        canvas.width = texSize
        canvas.height = texSize

        const ctx = canvas.getContext("2d")!

        // Fond blanc avec bordure subtile
        ctx.fillStyle = "#f8f8f6"
        ctx.fillRect(0, 0, texSize, texSize)

        // Bordure légère
        ctx.strokeStyle = "#e0e0e0"
        ctx.lineWidth = 2
        ctx.strokeRect(0, 0, texSize, texSize)

        // Dessiner les points selon le numéro
        ctx.fillStyle = "#2d2d2d"

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

            // Ombre pour donner du relief
            ctx.fillStyle = "#1a1a1a"
            ctx.beginPath()
            ctx.arc(x * texSize + 1, y * texSize + 1, circSize * 0.8, 0, 2 * Math.PI)
            ctx.fill()

            // Remettre la couleur principale
            ctx.fillStyle = "#2d2d2d"
            ctx.beginPath()
            ctx.arc(x * texSize, y * texSize, circSize, 0, 2 * Math.PI)
            ctx.fill()
        })

        const texture = new THREE.CanvasTexture(canvas)
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        return new THREE.MeshLambertMaterial({ map: texture })
    }

    // Initialiser la scène Three.js
    useEffect(() => {
        if (!mountRef.current) return

        // Scène
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0xf0f0f0)
        sceneRef.current = scene

        // Caméra
        const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000)
        camera.position.set(0, 0, 80)
        cameraRef.current = camera

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(400, 300)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        rendererRef.current = renderer

        // Éclairage
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(-40, 40, 100)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.width = 2048
        directionalLight.shadow.mapSize.height = 2048
        scene.add(directionalLight)

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
        directionalLight2.position.set(40, -40, -100)
        scene.add(directionalLight2)

        // Créer le dé
        const diceGroup = new THREE.Group()
        diceRef.current = diceGroup

        // Géométrie principale du dé (arrondie)
        const diceGeometry = createRoundedBoxGeometry(20, 20, 20, 3, 8)
        const diceMaterial = new THREE.MeshPhongMaterial({
            color: 0xf8f8f6,
            specular: 0x111111,
            shininess: 100,
        })
        const diceMesh = new THREE.Mesh(diceGeometry, diceMaterial)
        diceMesh.castShadow = true
        diceGroup.add(diceMesh)

        // Créer un cube standard pour les textures des faces
        const cubeGeometry = new THREE.BoxGeometry(20.1, 20.1, 20.1)
        const cubeMaterials = [
            createDiceFaceMaterial(6), // face droite (X+) - face 4
            createDiceFaceMaterial(1), // face gauche (X-) - face 1
            createDiceFaceMaterial(2), // face haut (Y+) - face 2
            createDiceFaceMaterial(5), // face bas (Y-) - face 5
            createDiceFaceMaterial(3), // face avant (Z+) - face 3
            createDiceFaceMaterial(4), // face arrière (Z-) - face 6
        ]

        const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterials)
        diceGroup.add(cubeMesh)

        scene.add(diceGroup)

        // Sol pour les ombres
        const floorGeometry = new THREE.PlaneGeometry(200, 200)
        const floorMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.3,
        })
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.rotation.x = -Math.PI / 2
        floor.position.y = -30
        floor.receiveShadow = true
        scene.add(floor)

        mountRef.current.appendChild(renderer.domElement)

        // Position initiale du dé (face 1 visible)
        diceGroup.rotation.set(0, 0, 0)

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

        // Rotations finales pour afficher la bonne face (face visible depuis la caméra)
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
            x: targetRotation.x + Math.PI * 2 * (4 + Math.random() * 4),
            y: targetRotation.y + Math.PI * 2 * (4 + Math.random() * 4),
            z: targetRotation.z + Math.PI * 2 * (4 + Math.random() * 4),
        }

        // Animation avec easing
        const duration = 3000
        const startTime = Date.now()

        const animateRoll = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Easing function (ease-out-quart)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)

            if (diceRef.current) {
                diceRef.current.rotation.x = startRotation.x + (extraRotations.x - startRotation.x) * easeOutQuart
                diceRef.current.rotation.y = startRotation.y + (extraRotations.y - startRotation.y) * easeOutQuart
                diceRef.current.rotation.z = startRotation.z + (extraRotations.z - startRotation.z) * easeOutQuart

                // Effet de rebond sur l'axe Y
                const bounceHeight = Math.sin(progress * Math.PI * 3) * (1 - progress) * 20
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
                className="border-2 border-gray-200 rounded-lg shadow-lg bg-gradient-to-br from-gray-50 to-gray-100"
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
                <p className="text-xs mt-1">Cliquez pour lancer • Animation 3 secondes</p>
            </div>
        </div>
    )
}