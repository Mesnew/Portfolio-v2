"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Dice3DProps {
    onRoll: (value: number) => void
    isRolling: boolean
}

export function Dice3D({ onRoll, isRolling }: Dice3DProps) {
    const [currentValue, setCurrentValue] = useState(1)
    const [showResult, setShowResult] = useState(true)

    const rollDice = () => {
        if (isRolling) return

        setShowResult(false)
        const newValue = Math.floor(Math.random() * 6) + 1

        // Démarrer l'animation
        onRoll(newValue)

        // Attendre la fin de l'animation pour afficher le résultat
        setTimeout(() => {
            setCurrentValue(newValue)
            setShowResult(true)
        }, 3000) // 3 secondes d'animation
    }

    const getDotPattern = (value: number) => {
        const patterns = {
            1: [4], // center
            2: [0, 8], // top-left, bottom-right
            3: [0, 4, 8], // top-left, center, bottom-right
            4: [0, 2, 6, 8], // corners
            5: [0, 2, 4, 6, 8], // corners + center
            6: [0, 2, 3, 5, 6, 8], // two columns
        }
        return patterns[value as keyof typeof patterns] || [4]
    }

    // Calculer la rotation pour afficher la bonne face
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
        <div className="flex flex-col items-center space-y-6">
            <div className="dice-container" style={{ perspective: "1200px" }}>
                <div
                    className={`dice ${isRolling ? "rolling" : ""}`}
                    style={{
                        transform: !isRolling ? getFaceRotation(currentValue) : undefined,
                        transition: !isRolling ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)" : undefined,
                    }}
                    onClick={rollDice}
                >
                    {/* Face 1 */}
                    <div className="dice-face dice-face-1">
                        <div className="dots">
                            {Array.from({ length: 9 }, (_, i) => (
                                <div key={i} className={`dot ${getDotPattern(1).includes(i) ? "active" : ""}`} />
                            ))}
                        </div>
                    </div>

                    {/* Face 2 */}
                    <div className="dice-face dice-face-2">
                        <div className="dots">
                            {Array.from({ length: 9 }, (_, i) => (
                                <div key={i} className={`dot ${getDotPattern(2).includes(i) ? "active" : ""}`} />
                            ))}
                        </div>
                    </div>

                    {/* Face 3 */}
                    <div className="dice-face dice-face-3">
                        <div className="dots">
                            {Array.from({ length: 9 }, (_, i) => (
                                <div key={i} className={`dot ${getDotPattern(3).includes(i) ? "active" : ""}`} />
                            ))}
                        </div>
                    </div>

                    {/* Face 4 */}
                    <div className="dice-face dice-face-4">
                        <div className="dots">
                            {Array.from({ length: 9 }, (_, i) => (
                                <div key={i} className={`dot ${getDotPattern(4).includes(i) ? "active" : ""}`} />
                            ))}
                        </div>
                    </div>

                    {/* Face 5 */}
                    <div className="dice-face dice-face-5">
                        <div className="dots">
                            {Array.from({ length: 9 }, (_, i) => (
                                <div key={i} className={`dot ${getDotPattern(5).includes(i) ? "active" : ""}`} />
                            ))}
                        </div>
                    </div>

                    {/* Face 6 */}
                    <div className="dice-face dice-face-6">
                        <div className="dots">
                            {Array.from({ length: 9 }, (_, i) => (
                                <div key={i} className={`dot ${getDotPattern(6).includes(i) ? "active" : ""}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <div className="text-2xl font-bold mb-2 min-h-[32px] flex items-center justify-center">
                    {showResult ? `🎲 Résultat: ${currentValue}` : "🎲 Lancement..."}
                </div>
                <Button onClick={rollDice} disabled={isRolling} className="w-full min-w-[150px]">
                    {isRolling ? "🎲 En cours..." : "🎲 Lancer le dé"}
                </Button>
            </div>

            <style jsx>{`
                .dice-container {
                    cursor: pointer;
                    margin: 30px 0;
                    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
                }

                .dice {
                    position: relative;
                    width: 120px;
                    height: 120px;
                    transform-style: preserve-3d;
                    margin: 0 auto;
                }

                .dice.rolling {
                    animation: enhancedRollAnimation 3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                @keyframes enhancedRollAnimation {
                    0% {
                        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1);
                    }
                    15% {
                        transform: rotateX(180deg) rotateY(270deg) rotateZ(90deg) scale(1.1);
                    }
                    30% {
                        transform: rotateX(360deg) rotateY(540deg) rotateZ(180deg) scale(0.9);
                    }
                    45% {
                        transform: rotateX(540deg) rotateY(810deg) rotateZ(270deg) scale(1.05);
                    }
                    60% {
                        transform: rotateX(720deg) rotateY(1080deg) rotateZ(360deg) scale(0.95);
                    }
                    75% {
                        transform: rotateX(900deg) rotateY(1350deg) rotateZ(450deg) scale(1.02);
                    }
                    90% {
                        transform: rotateX(1080deg) rotateY(1620deg) rotateZ(540deg) scale(0.98);
                    }
                    95% {
                        transform: rotateX(1170deg) rotateY(1755deg) rotateZ(585deg) scale(1.01);
                    }
                    100% {
                        transform: rotateX(1260deg) rotateY(1890deg) rotateZ(630deg) scale(1);
                    }
                }

                .dice-face {
                    position: absolute;
                    width: 120px;
                    height: 120px;
                    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%);
                    border: 4px solid #333;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow:
                            inset 0 0 30px rgba(0,0,0,0.1),
                            0 5px 15px rgba(0,0,0,0.2);
                    transition: all 0.3s ease;
                }

                .dice-face:hover {
                    box-shadow:
                            inset 0 0 30px rgba(0,0,0,0.15),
                            0 8px 25px rgba(0,0,0,0.3);
                }

                .dice-face-1 { transform: rotateY(0deg) translateZ(60px); }
                .dice-face-2 { transform: rotateY(90deg) translateZ(60px); }
                .dice-face-3 { transform: rotateY(180deg) translateZ(60px); }
                .dice-face-4 { transform: rotateY(-90deg) translateZ(60px); }
                .dice-face-5 { transform: rotateX(90deg) translateZ(60px); }
                .dice-face-6 { transform: rotateX(-90deg) translateZ(60px); }

                .dots {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    gap: 8px;
                    width: 80px;
                    height: 80px;
                }

                .dot {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: transparent;
                    transition: all 0.2s ease;
                }

                .dot.active {
                    background: #333;
                    box-shadow:
                            inset 0 2px 4px rgba(0,0,0,0.3),
                            0 2px 4px rgba(0,0,0,0.2);
                    transform: scale(1);
                }

                .dice:hover .dot.active {
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    )
}
