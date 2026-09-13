import React, { useState } from "react";
import { X } from "lucide-react";

interface PackageSelectionModalProps {
    open: boolean;
    onClose: () => void;
    availableSlots: number[];
    onSelectPackage: (amount: number) => void;
    isLoading?: boolean;
}

const ALL_SLOTS = [10500, 30000, 50000, 100000, 200000, 300000, 500000, 1000000];

const PackageSelectionModal: React.FC<PackageSelectionModalProps> = ({
    open,
    onClose,
    availableSlots,
    onSelectPackage,
    isLoading = false,
}) => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

    if (!open) return null;

    const handleConfirm = () => {
        if (selectedAmount !== null) {
            onSelectPackage(selectedAmount);
        }
    };

    const formatAmount = (amount: number) => {
        return amount.toLocaleString();
    };

    const isSlotAvailable = (amount: number) => {
        return availableSlots.includes(amount);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-card-bg rounded-xl shadow-lg w-full max-w-md border border-card-border">
                <div className="flex items-center justify-between p-4 border-b border-card-border">
                    <h2 className="text-xl font-serif font-bold text-text-dark">
                        Select Package
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-text-muted hover:text-primary transition-colors"
                        disabled={isLoading}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-4">
                    <p className="text-sm text-slate-600 mb-4">
                        Choose a package to start your orders
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {ALL_SLOTS.map((amount) => {
                            const isAvailable = isSlotAvailable(amount);
                            const isSelected = selectedAmount === amount;

                            return (
                                <button
                                    key={amount}
                                    onClick={() => isAvailable && setSelectedAmount(amount)}
                                    disabled={!isAvailable}
                                    className={`
                                        py-4 px-3 rounded-lg font-medium text-center transition-all border
                                        ${isSelected
                                            ? "bg-primary text-white border-primary"
                                            : isAvailable
                                                ? "bg-card-beige text-text-dark border-card-border hover:border-primary hover:text-primary cursor-pointer"
                                                : "bg-card-beige text-text-muted border-card-border cursor-not-allowed opacity-50"
                                        }
                                    `}
                                >
                                    <div className="text-lg font-bold">
                                        ৳{formatAmount(amount)}
                                    </div>
                                    {!isAvailable && (
                                        <div className="text-xs mt-1">Unavailable</div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-4 border border-card-border text-text-dark rounded-lg font-medium hover:bg-card-beige transition-colors"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={selectedAmount === null || isLoading}
                            className={`
                                flex-1 py-3 px-4 rounded-lg font-medium transition-colors text-white
                                ${selectedAmount === null || isLoading
                                    ? "bg-slate-300 cursor-not-allowed"
                                    : "bg-primary hover:bg-primary-hover"
                                }
                            `}
                        >
                            {isLoading ? "Processing..." : "Confirm"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageSelectionModal;