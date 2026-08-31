import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import treasureOpen from "@/assets/treasure/opened-treasure-new.png"
import treasureClosed from "@/assets/treasure/closed-treasure.png"

interface MysteryBoxData {
    method: string;
    amount: string;
}

interface MysteryBoxModalProps {
    open: boolean;
    onClose: () => void;
    mysteryBoxData: MysteryBoxData;
}

interface BoxReveal {
    boxIndex: number;
    amount: string;
    isWinning: boolean;
}

const MysteryBoxModal: React.FC<MysteryBoxModalProps> = ({
    open,
    onClose,
    mysteryBoxData,
}) => {
    const [selectedBox, setSelectedBox] = useState<number | null>(null);
    const [revealedBoxes, setRevealedBoxes] = useState<BoxReveal[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (open) {
            setSelectedBox(null);
            setRevealedBoxes([]);
            setIsAnimating(false);
        }
    }, [open]);

    if (!open) return null;

    const generateRandomMultiplier = (method: string): string => {
        if (method === "12x") {
            const multiplier = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
            return `${multiplier}x`;
        }
        if (method === "cash") {
            const cash = Math.floor(Math.random() * (50000 - 500 + 1)) + 500;
            return `${cash}`;
        }
        return "";
    };

    const generateUniqueMultipliers = (method: string, count: number): string[] => {
        const multipliers = new Set<string>();
        while (multipliers.size < count) {
            multipliers.add(generateRandomMultiplier(method));
        }
        return Array.from(multipliers);
    };

    const handleBoxClick = (boxIndex: number) => {
        if (selectedBox !== null || isAnimating) return;
        setIsAnimating(true);
        setSelectedBox(boxIndex);

        setTimeout(() => {
            setRevealedBoxes((prev) => [
                ...prev,
                {
                    boxIndex,
                    amount: mysteryBoxData.amount,
                    isWinning: true,
                },
            ]);
        }, 500);

        setTimeout(() => {
            const otherBoxes = [0, 1, 2].filter((i) => i !== boxIndex);
            const uniqueMultipliers = generateUniqueMultipliers(mysteryBoxData.method, 2);
            const reveals: BoxReveal[] = otherBoxes.map((idx, i) => ({
                boxIndex: idx,
                amount: uniqueMultipliers[i],
                isWinning: false,
            }));
            setRevealedBoxes((prev) => [...prev, ...reveals]);
            setIsAnimating(false);
        }, 1500);
    };

    const getRevealedAmount = (boxIndex: number): BoxReveal | undefined => {
        return revealedBoxes.find((box) => box.boxIndex === boxIndex);
    };

    const isBoxRevealed = (boxIndex: number): boolean => {
        return revealedBoxes.some((box) => box.boxIndex === boxIndex);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card-bg rounded-xl shadow-lg w-full max-w-lg border border-card-border">
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-text-muted hover:text-primary transition-colors z-10"
                    disabled={isAnimating}
                >
                    <X className="w-8 h-8" />
                </button>

                <div className="relative">
                    <div className="text-center mb-8 pt-8">
                        <h2 className="text-4xl font-serif font-bold text-text-dark mb-2">
                            Smart Flip Box!
                        </h2>
                        <p className="text-slate-600 text-lg">
                            {selectedBox === null
                                ? "Choose Your Smart Flip Box"
                                : "Congratulations!"}
                        </p>
                    </div>

                    <div className="flex justify-center gap-8 mb-8 px-4">
                        {[0, 1, 2].map((boxIndex) => {
                            const revealed = getRevealedAmount(boxIndex);
                            const isRevealed = isBoxRevealed(boxIndex);
                            const isSelected = selectedBox === boxIndex;

                            return (
                                <button
                                    key={boxIndex}
                                    onClick={() => handleBoxClick(boxIndex)}
                                    disabled={selectedBox !== null || isAnimating}
                                    className={`
                                        relative w-32 h-32 transition-all duration-300 transform
                                        ${!isRevealed ? "hover:scale-110 cursor-pointer" : "cursor-default"}
                                        ${isSelected && !isRevealed ? "scale-110 animate-bounce" : ""}
                                        ${selectedBox !== null && !isRevealed ? "opacity-50" : ""}
                                        ${isRevealed && revealed?.isWinning ? "scale-110" : ""}
                                    `}
                                >
                                    {!isRevealed ? (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <img
                                                src={treasureClosed}
                                                alt="Closed Treasure"
                                                className={`w-full h-full object-contain ${isSelected ? "animate-pulse" : ""}`}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center relative">
                                            <img
                                                src={treasureOpen}
                                                alt="Opened Treasure"
                                                className="w-full h-full object-contain"
                                            />
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <div className="text-xs text-primary mb-1">₹</div>
                                                <div
                                                    className={`text-xl font-bold ${revealed?.isWinning
                                                        ? "text-primary animate-pulse"
                                                        : "text-text-dark"
                                                        }`}
                                                >
                                                    {mysteryBoxData.method === "cash" ? "৳" : ""}{revealed?.amount}
                                                </div>
                                                {revealed?.isWinning && (
                                                    <div className="text-xs text-primary mt-1 font-semibold">
                                                        YOU WIN!
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {revealedBoxes.length === 3 && (
                        <div className="text-center animate-fadeIn">
                            <div className="bg-card-beige rounded-lg p-6 mb-6 border border-card-border">
                                <p className="text-text-dark text-xl font-semibold mb-2">
                                    Your Prize
                                </p>
                                <p className="text-primary text-4xl font-bold">
                                    {mysteryBoxData.method === "cash" ? "৳" : ""}{mysteryBoxData.amount}
                                </p>
                                <p className="text-primary text-4xl font-bold">{mysteryBoxData?.method === "12x" ? "Smart Flip Box" : ""}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full max-w-xs mx-auto py-4 bg-primary hover:bg-primary-hover text-white font-bold text-lg rounded-lg transition-all transform hover:scale-105 shadow-lg"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {selectedBox === null && (
                        <div className="text-center text-slate-600 text-base">
                            <p className="font-medium">Pick a box to reveal your reward!</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default MysteryBoxModal;