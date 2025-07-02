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
        }, 2000) // 2 secondes d'animation
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
            <div className="dice-container" style={{ perspective: "1000px" }}>
                <div
                    className={`dice ${isRolling ? "rolling" : ""}`}
                    style={{
                        transform: !isRolling ? getFaceRotation(currentValue) : undefined,
                        transition: !isRolling ? "transform 0.5s ease" : undefined,
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
                <div className="text-2xl font-bold mb-2">{showResult ? `Résultat: ${currentValue}` : "Lancement..."}</div>
                <Button onClick={rollDice} disabled={isRolling} className="w-full">
                    {isRolling ? "🎲 En cours..." : "🎲 Lancer le dé"}
                </Button>
            </div>

            <style jsx>{`
                .dice-container {
                    cursor: pointer;
                    margin: 20px 0;
                }

                .dice {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    transform-style: preserve-3d;
                    margin: 0 auto;
                }

                .dice.rolling {
                    animation: rollAnimation 2s ease-in-out;
                }

                @keyframes rollAnimation {
                    0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
                    25% { transform: rotateX(180deg) rotateY(180deg) rotateZ(90deg); }
                    50% { transform: rotateX(360deg) rotateY(360deg) rotateZ(180deg); }
                    75% { transform: rotateX(540deg) rotateY(540deg) rotateZ(270deg); }
                    100% { transform: rotateX(720deg) rotateY(720deg) rotateZ(360deg); }
                }

                .dice-face {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, #ffffff, #f8f9fa);
                    border: 3px solid #333;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
                }

                .dice-face-1 { transform: rotateY(0deg) translateZ(50px); }
                .dice-face-2 { transform: rotateY(90deg) translateZ(50px); }
                .dice-face-3 { transform: rotateY(180deg) translateZ(50px); }
                .dice-face-4 { transform: rotateY(-90deg) translateZ(50px); }
                .dice-face-5 { transform: rotateX(90deg) translateZ(50px); }
                .dice-face-6 { transform: rotateX(-90deg) translateZ(50px); }

                .dots {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    gap: 6px;
                    width: 70px;
                    height: 70px;
                }

                .dot {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: transparent;
                }

                .dot.active {
                    background: #333;
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
                }
            `}</style>
        </div>
    )
}
