"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Dice3DProps {
    onRoll?: (value: number) => void
    isRolling?: boolean
}

export function Dice3D({ onRoll, isRolling = false }: Dice3DProps) {
    const [currentValue, setCurrentValue] = useState(1)
    const [showResult, setShowResult] = useState(true)
    const [animationPhase, setAnimationPhase] = useState<"idle" | "throwing" | "bouncing" | "settling">("idle")
    const [internalRolling, setInternalRolling] = useState(false)

    const actuallyRolling = isRolling || internalRolling

    const rollDice = () => {
        if (actuallyRolling) return

        setInternalRolling(true)
        setShowResult(false)
        setAnimationPhase("throwing")
        const newValue = Math.floor(Math.random() * 6) + 1

        // Vibration tactile
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 200])
        }

        // Son de lancer (simulation) avec vérification
        try {
            if (typeof window !== "undefined" && (window.AudioContext || (window as any).webkitAudioContext)) {
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
                const oscillator = audioContext.createOscillator()
                const gainNode = audioContext.createGain()

                oscillator.connect(gainNode)
                gainNode.connect(audioContext.destination)

                oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
                oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1)
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

                oscillator.start(audioContext.currentTime)
                oscillator.stop(audioContext.currentTime + 0.1)
            }
        } catch (error) {
            // Ignore audio errors
        }

        // Appeler onRoll seulement si elle existe
        if (onRoll && typeof onRoll === "function") {
            onRoll(newValue)
        }

        // Séquence d'animation
        setTimeout(() => setAnimationPhase("bouncing"), 1000)
        setTimeout(() => setAnimationPhase("settling"), 3000)
        setTimeout(() => {
            setCurrentValue(newValue)
            setShowResult(true)
            setAnimationPhase("idle")
            setInternalRolling(false)
        }, 4500)
    }

    const getDotPattern = (value: number) => {
        const patterns = {
            1: [4], // center
            2: [0, 8], // diagonal
            3: [0, 4, 8], // diagonal + center
            4: [0, 2, 6, 8], // corners
            5: [0, 2, 4, 6, 8], // corners + center
            6: [0, 2, 3, 5, 6, 8], // two columns
        }
        return patterns[value as keyof typeof patterns] || [4]
    }

    const getFaceRotation = (value: number) => {
        const rotations = {
            1: "rotateX(0deg) rotateY(0deg)",
            2: "rotateX(0deg) rotateY(-90deg)",
            3: "rotateX(0deg) rotateY(-180deg)",
            4: "rotateX(0deg) rotateY(90deg)",
            5: "rotateX(-90deg) rotateY(0deg)",
            6: "rotateX(90deg) rotateY(0deg)",
        }
        return rotations[value as keyof typeof rotations] || rotations[1]
    }

    return (
        <div className="flex flex-col items-center space-y-8">
            <div className="dice-arena">
                <div className={`dice-container ${animationPhase}`}>
                    <div
                        className={`dice ${actuallyRolling ? "active" : ""}`}
                        style={{
                            transform: !actuallyRolling ? getFaceRotation(currentValue) : undefined,
                        }}
                        onClick={rollDice}
                    >
                        {/* Face 1 - Front */}
                        <div className="face face-1">
                            <div className="face-inner">
                                <div className="dots-grid">
                                    {Array.from({ length: 9 }, (_, i) => (
                                        <div key={i} className={`dot ${getDotPattern(1).includes(i) ? "visible" : ""}`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Face 2 - Right */}
                        <div className="face face-2">
                            <div className="face-inner">
                                <div className="dots-grid">
                                    {Array.from({ length: 9 }, (_, i) => (
                                        <div key={i} className={`dot ${getDotPattern(2).includes(i) ? "visible" : ""}`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Face 3 - Back */}
                        <div className="face face-3">
                            <div className="face-inner">
                                <div className="dots-grid">
                                    {Array.from({ length: 9 }, (_, i) => (
                                        <div key={i} className={`dot ${getDotPattern(3).includes(i) ? "visible" : ""}`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Face 4 - Left */}
                        <div className="face face-4">
                            <div className="face-inner">
                                <div className="dots-grid">
                                    {Array.from({ length: 9 }, (_, i) => (
                                        <div key={i} className={`dot ${getDotPattern(4).includes(i) ? "visible" : ""}`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Face 5 - Top */}
                        <div className="face face-5">
                            <div className="face-inner">
                                <div className="dots-grid">
                                    {Array.from({ length: 9 }, (_, i) => (
                                        <div key={i} className={`dot ${getDotPattern(5).includes(i) ? "visible" : ""}`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Face 6 - Bottom */}
                        <div className="face face-6">
                            <div className="face-inner">
                                <div className="dots-grid">
                                    {Array.from({ length: 9 }, (_, i) => (
                                        <div key={i} className={`dot ${getDotPattern(6).includes(i) ? "visible" : ""}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ombre dynamique */}
                <div className={`dice-shadow ${animationPhase}`}></div>
            </div>

            <div className="controls">
                <div className="result-display">
                    {showResult ? (
                        <span className="result-text">🎲 {currentValue}</span>
                    ) : (
                        <span className="rolling-text">
              {animationPhase === "throwing" && "🚀 Lancement..."}
                            {animationPhase === "bouncing" && "⚡ Rebonds..."}
                            {animationPhase === "settling" && "🎯 Stabilisation..."}
            </span>
                    )}
                </div>

                <Button onClick={rollDice} disabled={actuallyRolling} className="roll-button">
                    {actuallyRolling ? "🎲 En cours..." : "🎲 Lancer le dé"}
                </Button>
            </div>

            <style jsx>{`
                .dice-arena {
                    position: relative;
                    width: 300px;
                    height: 300px;
                    perspective: 2000px;
                    perspective-origin: center center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .dice-container {
                    position: relative;
                    width: 140px;
                    height: 140px;
                    transform-style: preserve-3d;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .dice-container:hover {
                    transform: scale(1.05);
                }

                /* Animations de lancer réalistes */
                .dice-container.throwing {
                    animation: realisticThrow 4.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }

                @keyframes realisticThrow {
                    /* Phase 1: Lancer initial avec force */
                    0% {
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                    5% {
                        transform: translate3d(-20px, -120px, 50px) scale(0.8) rotateX(45deg) rotateY(30deg);
                    }
                    12% {
                        transform: translate3d(15px, -100px, 80px) scale(0.9) rotateX(180deg) rotateY(270deg);
                    }

                    /* Phase 2: Apogée et chute */
                    20% {
                        transform: translate3d(-10px, -80px, 60px) scale(0.85) rotateX(360deg) rotateY(540deg);
                    }
                    30% {
                        transform: translate3d(25px, 40px, 20px) scale(1.1) rotateX(540deg) rotateY(720deg);
                    }

                    /* Phase 3: Premier rebond violent */
                    35% {
                        transform: translate3d(-15px, -60px, 30px) scale(0.9) rotateX(720deg) rotateY(900deg);
                    }
                    42% {
                        transform: translate3d(10px, 25px, 15px) scale(1.05) rotateX(900deg) rotateY(1080deg);
                    }

                    /* Phase 4: Deuxième rebond */
                    50% {
                        transform: translate3d(-8px, -35px, 20px) scale(0.95) rotateX(1080deg) rotateY(1260deg);
                    }
                    58% {
                        transform: translate3d(5px, 15px, 10px) scale(1.02) rotateX(1260deg) rotateY(1440deg);
                    }

                    /* Phase 5: Troisième rebond léger */
                    66% {
                        transform: translate3d(-3px, -20px, 12px) scale(0.98) rotateX(1440deg) rotateY(1620deg);
                    }
                    74% {
                        transform: translate3d(2px, 8px, 5px) scale(1.01) rotateX(1620deg) rotateY(1800deg);
                    }

                    /* Phase 6: Micro-rebonds et stabilisation */
                    82% {
                        transform: translate3d(-1px, -10px, 6px) scale(0.99) rotateX(1800deg) rotateY(1980deg);
                    }
                    90% {
                        transform: translate3d(1px, 3px, 2px) scale(1.005) rotateX(1980deg) rotateY(2160deg);
                    }
                    96% {
                        transform: translate3d(0px, -2px, 1px) scale(0.998) rotateX(2160deg) rotateY(2340deg);
                    }
                    100% {
                        transform: translate3d(0, 0, 0) scale(1) rotateX(2160deg) rotateY(2340deg);
                    }
                }

                .dice {
                    width: 140px;
                    height: 140px;
                    position: relative;
                    transform-style: preserve-3d;
                    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));
                    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .dice.active {
                    animation: chaosRotation 4.5s ease-out forwards;
                }

                @keyframes chaosRotation {
                    0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
                    10% { transform: rotateX(450deg) rotateY(360deg) rotateZ(270deg); }
                    25% { transform: rotateX(900deg) rotateY(720deg) rotateZ(540deg); }
                    40% { transform: rotateX(1350deg) rotateY(1080deg) rotateZ(810deg); }
                    55% { transform: rotateX(1800deg) rotateY(1440deg) rotateZ(1080deg); }
                    70% { transform: rotateX(2160deg) rotateY(1710deg) rotateZ(1260deg); }
                    85% { transform: rotateX(2430deg) rotateY(1890deg) rotateZ(1395deg); }
                    95% { transform: rotateX(2610deg) rotateY(2025deg) rotateZ(1485deg); }
                    100% { transform: rotateX(2700deg) rotateY(2100deg) rotateZ(1530deg); }
                }

                .face {
                    position: absolute;
                    width: 140px;
                    height: 140px;
                    border: 5px solid #2c3e50;
                    border-radius: 20px;
                    background: linear-gradient(135deg,
                    #ffffff 0%,
                    #f8f9fa 25%,
                    #e9ecef 50%,
                    #dee2e6 75%,
                    #ced4da 100%);
                    box-shadow:
                            inset 0 0 50px rgba(255,255,255,0.4),
                            inset 0 0 25px rgba(0,0,0,0.1),
                            0 10px 30px rgba(0,0,0,0.2);
                }

                .face::before {
                    content: '';
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    right: 10px;
                    height: 30px;
                    background: linear-gradient(180deg,
                    rgba(255,255,255,0.8) 0%,
                    rgba(255,255,255,0.3) 50%,
                    transparent 100%);
                    border-radius: 15px 15px 0 0;
                    pointer-events: none;
                }

                .face-1 { transform: rotateY(0deg) translateZ(70px); }
                .face-2 { transform: rotateY(90deg) translateZ(70px); }
                .face-3 { transform: rotateY(180deg) translateZ(70px); }
                .face-4 { transform: rotateY(-90deg) translateZ(70px); }
                .face-5 { transform: rotateX(90deg) translateZ(70px); }
                .face-6 { transform: rotateX(-90deg) translateZ(70px); }

                .face-inner {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 2;
                }

                .dots-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    gap: 12px;
                    width: 100px;
                    height: 100px;
                }

                .dot {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: transparent;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: scale(0);
                }

                .dot.visible {
                    background: radial-gradient(circle at 35% 35%, #34495e, #2c3e50, #1a252f);
                    box-shadow:
                            inset 0 4px 8px rgba(0,0,0,0.5),
                            inset 0 -2px 4px rgba(255,255,255,0.2),
                            0 3px 6px rgba(0,0,0,0.3);
                    transform: scale(1);
                }

                .dice:hover .dot.visible {
                    transform: scale(1.15);
                    box-shadow:
                            inset 0 5px 10px rgba(0,0,0,0.6),
                            inset 0 -3px 6px rgba(255,255,255,0.3),
                            0 4px 8px rgba(0,0,0,0.4);
                }

                /* Ombre dynamique */
                .dice-shadow {
                    position: absolute;
                    bottom: -150px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 120px;
                    height: 60px;
                    background: radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }

                .dice-shadow.throwing {
                    animation: shadowDance 4.5s ease-out forwards;
                }

                @keyframes shadowDance {
                    0% {
                        transform: translateX(-50%) scale(1);
                        opacity: 0.3;
                    }
                    20% {
                        transform: translateX(-30%) scale(0.6);
                        opacity: 0.1;
                    }
                    35% {
                        transform: translateX(-60%) scale(1.4);
                        opacity: 0.5;
                    }
                    50% {
                        transform: translateX(-40%) scale(1.1);
                        opacity: 0.4;
                    }
                    70% {
                        transform: translateX(-55%) scale(1.2);
                        opacity: 0.35;
                    }
                    90% {
                        transform: translateX(-48%) scale(1.05);
                        opacity: 0.32;
                    }
                    100% {
                        transform: translateX(-50%) scale(1);
                        opacity: 0.3;
                    }
                }

                .controls {
                    text-align: center;
                    space-y: 4;
                }

                .result-display {
                    min-height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 16px;
                }

                .result-text {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #2c3e50;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    animation: resultPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }

                @keyframes resultPop {
                    0% { transform: scale(0) rotate(-180deg); opacity: 0; }
                    50% { transform: scale(1.2) rotate(-90deg); opacity: 0.8; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }

                .rolling-text {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #e74c3c;
                    animation: pulse 1s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.05); }
                }

                .roll-button {
                    min-width: 180px;
                    height: 50px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .roll-button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                }

                .roll-button:active:not(:disabled) {
                    transform: translateY(0);
                }

                /* Effets de particules */
                .dice::after {
                    content: '';
                    position: absolute;
                    top: -10px;
                    left: -10px;
                    right: -10px;
                    bottom: -10px;
                    background: conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1), transparent);
                    border-radius: 25px;
                    opacity: 0;
                    animation: shimmer 2s linear infinite;
                    pointer-events: none;
                }

                .dice.active::after {
                    opacity: 1;
                }

                @keyframes shimmer {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}
