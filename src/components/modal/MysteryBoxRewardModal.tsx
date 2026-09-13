import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import treasureOpen from "@/assets/treasure/opened-treasure-new.png"
import treasureClosed from "@/assets/treasure/closed-treasure.png"

interface MysteryBoxModalProps {
    open: boolean;
    onClose: () => void;
    mysteryReward: number;
    onContinue: () => void;
}

interface BoxReveal {
    boxIndex: number;
    amount: string;
    isWinning: boolean;
}

const MysteryBoxRewardModal: React.FC<MysteryBoxModalProps> = ({
    open,
    onClose,
    mysteryReward,
    onContinue,
}) => {
    const [selectedBox, setSelectedBox] = useState<number | null>(null);
    const [revealedBoxes, setRevealedBoxes] = useState<BoxReveal[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const normalizedReward = Number(mysteryReward);

    useEffect(() => {
        if (open) {
            setSelectedBox(null);
            setRevealedBoxes([]);
            setIsAnimating(false);
        }
    }, [open]);

    if (!open) return null;

    const generateLowerAmount = (): string => {
        const min = Math.floor(normalizedReward * 0.5);
        const max = normalizedReward - 1;
        const amount = Math.floor(Math.random() * (max - min + 1)) + min;
        return amount.toLocaleString();
    };

    const generateHigherAmount = (): string => {
        const min = normalizedReward + 1;
        const max = Math.floor(normalizedReward * 1.5);
        const amount = Math.floor(Math.random() * (max - min + 1)) + min;
        return amount.toLocaleString();
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
                    amount: normalizedReward.toLocaleString(),
                    isWinning: true,
                },
            ]);
        }, 500);

        setTimeout(() => {
            const otherBoxes = [0, 1, 2].filter((i) => i !== boxIndex);
            const amounts = [
                generateLowerAmount(),
                generateHigherAmount(),
            ].sort(() => Math.random() - 0.5);

            const reveals: BoxReveal[] = otherBoxes.map((idx, i) => ({
                boxIndex: idx,
                amount: amounts[i],
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

    const handleContinue = () => {
        onContinue();
        onClose();
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
                            Mystery Reward!
                        </h2>
                        <p className="text-slate-600 text-lg">
                            {selectedBox === null
                                ? "Choose Your Supreme Box"
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
                                                    ৳{revealed?.amount}
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
                                    ৳{mysteryReward.toLocaleString()}
                                </p>
                            </div>
                            <button
                                onClick={handleContinue}
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

export default MysteryBoxRewardModal;