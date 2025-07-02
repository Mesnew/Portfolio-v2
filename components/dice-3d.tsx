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
    const [animationKey, setAnimationKey] = useState(0)
    const [internalRolling, setInternalRolling] = useState(false)

    // Utiliser l'état interne si isRolling n'est pas fourni
    const rolling = isRolling || internalRolling

    const rollDice = () => {
        if (rolling) return

        setShowResult(false)
        setInternalRolling(true)
        const newValue = Math.floor(Math.random() * 6) + 1

        // Générer une nouvelle clé d'animation pour redémarrer l'animation
        setAnimationKey((prev) => prev + 1)

        // Vibration tactile
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100])
        }

        // Appeler onRoll seulement si fourni
        if (onRoll && typeof onRoll === "function") {
            onRoll(newValue)
        }

        // Afficher le résultat après l'animation
        setTimeout(() => {
            setCurrentValue(newValue)
            setShowResult(true)
            setInternalRolling(false)
        }, 3500)
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
        return rotations[value as keyof typeof rotations]
    }

    return (
        <div className="flex flex-col items-center space-y-8">
            <div className="dice-arena">
                <div key={animationKey} className={`dice-container ${rolling ? "throwing" : ""}`}>
                    <div
                        className={`dice ${rolling ? "rolling" : "settled"}`}
                        style={{
                            transform: !rolling ? getFaceRotation(currentValue) : undefined,
                        }}
                        onClick={rollDice}
                    >
                        {/* Face 1 */}
                        <div className="face face-1">
                            <div className="dots-grid">
                                {Array.from({ length: 9 }, (_, i) => (
                                    <div key={i} className={`dot ${getDotPattern(1).includes(i) ? "visible" : ""}`} />
                                ))}
                            </div>
                        </div>

                        {/* Face 2 */}
                        <div className="face face-2">
                            <div className="dots-grid">
                                {Array.from({ length: 9 }, (_, i) => (
                                    <div key={i} className={`dot ${getDotPattern(2).includes(i) ? "visible" : ""}`} />
                                ))}
                            </div>
                        </div>

                        {/* Face 3 */}
                        <div className="face face-3">
                            <div className="dots-grid">
                                {Array.from({ length: 9 }, (_, i) => (
                                    <div key={i} className={`dot ${getDotPattern(3).includes(i) ? "visible" : ""}`} />
                                ))}
                            </div>
                        </div>

                        {/* Face 4 */}
                        <div className="face face-4">
                            <div className="dots-grid">
                                {Array.from({ length: 9 }, (_, i) => (
                                    <div key={i} className={`dot ${getDotPattern(4).includes(i) ? "visible" : ""}`} />
                                ))}
                            </div>
                        </div>

                        {/* Face 5 */}
                        <div className="face face-5">
                            <div className="dots-grid">
                                {Array.from({ length: 9 }, (_, i) => (
                                    <div key={i} className={`dot ${getDotPattern(5).includes(i) ? "visible" : ""}`} />
                                ))}
                            </div>
                        </div>

                        {/* Face 6 */}
                        <div className="face face-6">
                            <div className="dots-grid">
                                {Array.from({ length: 9 }, (_, i) => (
                                    <div key={i} className={`dot ${getDotPattern(6).includes(i) ? "visible" : ""}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center space-y-4">
                <div className="text-3xl font-bold min-h-[40px] flex items-center justify-center">
                    {showResult ? (
                        <span className="animate-bounce">🎲 {currentValue}</span>
                    ) : (
                        <span className="animate-pulse">🎲 ...</span>
                    )}
                </div>
                <Button onClick={rollDice} disabled={rolling} size="lg" className="px-8 py-3 text-lg font-semibold">
                    {rolling ? "🎲 Lancement..." : "🎲 Lancer le dé"}
                </Button>
            </div>

            <style jsx>{`
                .dice-arena {
                    perspective: 2000px;
                    perspective-origin: center center;
                    width: 300px;
                    height: 300px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .dice-container {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    transform-style: preserve-3d;
                }

                .dice-container.throwing {
                    animation: realThrow 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }

                @keyframes realThrow {
                    /* Phase de lancer - le dé part de la main */
                    0% {
                        transform: translate3d(-50px, 100px, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.8);
                    }

                    /* Montée en arc parabolique */
                    15% {
                        transform: translate3d(20px, -120px, 50px) rotateX(180deg) rotateY(270deg) rotateZ(90deg) scale(1);
                    }

                    /* Point culminant */
                    25% {
                        transform: translate3d(40px, -140px, 80px) rotateX(360deg) rotateY(540deg) rotateZ(180deg) scale(1.1);
                    }

                    /* Descente */
                    40% {
                        transform: translate3d(10px, -60px, 40px) rotateX(720deg) rotateY(900deg) rotateZ(360deg) scale(1);
                    }

                    /* Premier impact */
                    50% {
                        transform: translate3d(-10px, 20px, 0) rotateX(900deg) rotateY(1080deg) rotateZ(450deg) scale(1.2);
                    }

                    /* Premier rebond */
                    58% {
                        transform: translate3d(5px, -40px, 20px) rotateX(1080deg) rotateY(1260deg) rotateZ(540deg) scale(0.9);
                    }

                    /* Deuxième impact */
                    68% {
                        transform: translate3d(-5px, 10px, 0) rotateX(1260deg) rotateY(1440deg) rotateZ(630deg) scale(1.1);
                    }

                    /* Deuxième rebond (plus petit) */
                    75% {
                        transform: translate3d(2px, -15px, 5px) rotateX(1350deg) rotateY(1530deg) rotateZ(675deg) scale(0.95);
                    }

                    /* Troisième impact */
                    82% {
                        transform: translate3d(-2px, 5px, 0) rotateX(1440deg) rotateY(1620deg) rotateZ(720deg) scale(1.05);
                    }

                    /* Micro rebond */
                    88% {
                        transform: translate3d(1px, -5px, 2px) rotateX(1485deg) rotateY(1665deg) rotateZ(742deg) scale(0.98);
                    }

                    /* Stabilisation */
                    94% {
                        transform: translate3d(0px, 2px, 0) rotateX(1530deg) rotateY(1710deg) rotateZ(765deg) scale(1.02);
                    }

                    /* Arrêt final */
                    100% {
                        transform: translate3d(0px, 0px, 0) rotateX(1530deg) rotateY(1710deg) rotateZ(765deg) scale(1);
                    }
                }

                .dice {
                    width: 100px;
                    height: 100px;
                    position: relative;
                    transform-style: preserve-3d;
                    cursor: pointer;
                    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));
                    transition: filter 0.3s ease;
                }

                .dice:hover {
                    filter: drop-shadow(0 25px 50px rgba(0,0,0,0.4));
                }

                .dice.rolling {
                    animation: chaosRotation 3.5s ease-out forwards;
                }

                @keyframes chaosRotation {
                    0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
                    10% { transform: rotateX(234deg) rotateY(167deg) rotateZ(89deg); }
                    20% { transform: rotateX(456deg) rotateY(389deg) rotateZ(234deg); }
                    30% { transform: rotateX(723deg) rotateY(567deg) rotateZ(445deg); }
                    40% { transform: rotateX(934deg) rotateY(789deg) rotateZ(623deg); }
                    50% { transform: rotateX(1167deg) rotateY(1023deg) rotateZ(834deg); }
                    60% { transform: rotateX(1345deg) rotateY(1234deg) rotateZ(1012deg); }
                    70% { transform: rotateX(1489deg) rotateY(1389deg) rotateZ(1156deg); }
                    80% { transform: rotateX(1578deg) rotateY(1489deg) rotateZ(1245deg); }
                    90% { transform: rotateX(1623deg) rotateY(1534deg) rotateZ(1289deg); }
                    95% { transform: rotateX(1645deg) rotateY(1556deg) rotateZ(1311deg); }
                    100% { transform: rotateX(1656deg) rotateY(1567deg) rotateZ(1322deg); }
                }

                .dice.settled {
                    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .face {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 25%, #e9ecef 75%, #dee2e6 100%);
                    border: 3px solid #343a40;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow:
                            inset 0 0 20px rgba(255,255,255,0.4),
                            inset 0 0 10px rgba(0,0,0,0.1),
                            0 5px 20px rgba(0,0,0,0.2);
                }

                .face::before {
                    content: '';
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    right: 5px;
                    height: 15px;
                    background: linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%);
                    border-radius: 8px 8px 0 0;
                    pointer-events: none;
                }

                .face-1 { transform: rotateY(0deg) translateZ(50px); }
                .face-2 { transform: rotateY(90deg) translateZ(50px); }
                .face-3 { transform: rotateY(180deg) translateZ(50px); }
                .face-4 { transform: rotateY(-90deg) translateZ(50px); }
                .face-5 { transform: rotateX(90deg) translateZ(50px); }
                .face-6 { transform: rotateX(-90deg) translateZ(50px); }

                .dots-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    gap: 6px;
                    width: 70px;
                    height: 70px;
                    z-index: 1;
                }

                .dot {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: transparent;
                    transition: all 0.2s ease;
                }

                .dot.visible {
                    background: radial-gradient(circle at 30% 30%, #212529, #495057);
                    box-shadow:
                            inset 0 2px 4px rgba(0,0,0,0.5),
                            0 1px 3px rgba(0,0,0,0.3);
                }

                .dice:hover .dot.visible {
                    transform: scale(1.1);
                    box-shadow:
                            inset 0 3px 6px rgba(0,0,0,0.6),
                            0 2px 4px rgba(0,0,0,0.4);
                }

                /* Effet de brillance sur le dé */
                .dice::after {
                    content: '';
                    position: absolute;
                    top: -5px;
                    left: -5px;
                    right: -5px;
                    bottom: -5px;
                    background: linear-gradient(45deg,
                    transparent 20%,
                    rgba(255,255,255,0.1) 40%,
                    rgba(255,255,255,0.2) 50%,
                    rgba(255,255,255,0.1) 60%,
                    transparent 80%);
                    border-radius: 15px;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .dice:hover::after {
                    opacity: 1;
                }

                /* Animation de pulsation pour le résultat */
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% {
                        transform: translate3d(0,0,0);
                    }
                    40%, 43% {
                        transform: translate3d(0,-15px,0);
                    }
                    70% {
                        transform: translate3d(0,-7px,0);
                    }
                    90% {
                        transform: translate3d(0,-2px,0);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }
            `}</style>
        </div>
    )
}
