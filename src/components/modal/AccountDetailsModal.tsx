import React from "react";
import { X } from "lucide-react";

interface AccountDetails {
    name: string;
    userId: number;
    quantityOfOrders: number;
    userBalance: number;
    memberTotalRecharge: number;
    userType: string;
    dailyProfit: number;
    outOfBalance: number;
    completedOrdersCount: number;
    trialRoundBalance: number;
}

interface AccountDetailsModalProps {
    open: boolean;
    onClose: () => void;
    data: AccountDetails;
}

const AccountDetailsModal: React.FC<AccountDetailsModalProps> = ({
    open,
    onClose,
    data,
}) => {
    if (!open) return null;

    const formatMoney = (amount: number) =>
        Number(amount || 0).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md bg-card-bg rounded-xl shadow-md border border-card-border">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 bg-card-beige rounded-t-xl border-b border-card-border">
                    <h2 className="text-lg font-serif font-bold text-text-dark">Account Details</h2>
                    <button onClick={onClose} className="text-text-muted hover:text-primary transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                            <p className="text-sm text-text-muted font-bold">Available Balance</p>
                            <p className="font-semibold text-text-dark">{formatMoney(data.userBalance)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-text-muted font-bold">Daily Profit</p>
                            <p className="font-semibold text-text-dark">{formatMoney(data?.dailyProfit)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-text-muted font-bold">Insufficient Balance</p>
                            <p className={`font-semibold ${data?.outOfBalance > 0 || data?.outOfBalance < 0 ? "text-red-500" : "text-text-dark"}`}>{data?.outOfBalance.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-text-muted font-bold">Current Snatching Order</p>
                            <p className="text-text-dark font-semibold">
                                {data?.completedOrdersCount} / 25
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-text-muted font-bold">Trial Amount</p>
                            <p className="font-semibold text-text-dark">{formatMoney(data?.trialRoundBalance)}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 bg-card-beige rounded-b-xl border-t border-card-border">
                    <button
                        onClick={onClose}
                        className="w-full py-2 bg-primary hover:bg-primary-hover cursor-pointer text-white rounded-lg font-medium transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountDetailsModal;