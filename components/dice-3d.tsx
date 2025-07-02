"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Dice3DProps {
    onRoll: (value: number) => void
    isRolling: boolean
}

export function Dice3D({ onRoll, isRolling }: Dice3DProps) {
    const [currentValue, setCurrentValue] = useState(1)

    const rollDice = () => {
        if (isRolling) return

        const newValue = Math.floor(Math.random() * 6) + 1
        setCurrentValue(newValue)
        onRoll(newValue)
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

    return (
        <div className="flex flex-col items-center space-y-6">
            <div className={`dice-container ${isRolling ? "rolling" : ""}`} onClick={rollDice}>
                <div className="dice">
                    <div className="dice-face dice-face-1">
                        <div className="dots">
                            {Array.from({ length: 9 }, (_, i) => (
                                <div key={i} className={`dot ${getDotPattern(1).includes(i) ? "active" : ""}`} />
                            ))}
                        </div>
                    </div>
                    <div className="dice-face dice-face-2">
                        <div className="dots">
                            {Array.from({ length: 9 }, (_, i) => (
                                <div key={i} className={`dot ${getDotPattern(2).includes(i) ? "active" : ""}`} />
                            ))}
                        </div>
                    </div>
                    <div className="dice-face dice-face-3">
                        <div className="dots">
                            {Array.from({ length: 9 }, (_, i) => (
                                <div key={i} className={`dot ${getDotPattern(3).includes(i) ? "active" : ""}`} />
                            ))}
                        </div>
                    </div>
                    <div className="dice-face dice-face-4">
                        <div className="dots">
                            {Array.from({ length: 9 }, (_, i) => (
                                <div key={i} className={`dot ${getDotPattern(4).includes(i) ? "active" : ""}`} />
                            ))}
                        </div>
                    </div>
                    <div className="dice-face dice-face-5">
                        <div className="dots">
                            {Array.from({ length: 9 }, (_, i) => (
                                <div key={i} className={`dot ${getDotPattern(5).includes(i) ? "active" : ""}`} />
                            ))}
                        </div>
                    </div>
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
                <div className="text-2xl font-bold mb-2">Résultat: {currentValue}</div>
                <Button onClick={rollDice} disabled={isRolling} className="w-full">
                    {isRolling ? "Lancement..." : "Lancer le dé"}
                </Button>
            </div>

            <style jsx>{`
        .dice-container {
          perspective: 1000px;
          cursor: pointer;
        }

        .dice {
          position: relative;
          width: 80px;
          height: 80px;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .dice-container.rolling .dice {
          animation: rollAnimation 1s ease-in-out;
        }

        @keyframes rollAnimation {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          25% { transform: rotateX(90deg) rotateY(180deg); }
          50% { transform: rotateX(180deg) rotateY(360deg); }
          75% { transform: rotateX(270deg) rotateY(540deg); }
          100% { transform: rotateX(360deg) rotateY(720deg); }
        }

        .dice-face {
          position: absolute;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #ffffff, #f0f0f0);
          border: 2px solid #333;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dice-face-1 { transform: rotateY(0deg) translateZ(40px); }
        .dice-face-2 { transform: rotateY(90deg) translateZ(40px); }
        .dice-face-3 { transform: rotateY(180deg) translateZ(40px); }
        .dice-face-4 { transform: rotateY(-90deg) translateZ(40px); }
        .dice-face-5 { transform: rotateX(90deg) translateZ(40px); }
        .dice-face-6 { transform: rotateX(-90deg) translateZ(40px); }

        .dots {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 4px;
          width: 60px;
          height: 60px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: transparent;
        }

        .dot.active {
          background: #333;
        }
      `}</style>
        </div>
    )
}
