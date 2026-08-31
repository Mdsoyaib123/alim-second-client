interface SubmitOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    isConfirming: boolean;
}

const SubmitOrderModal: React.FC<SubmitOrderModalProps> = ({ isOpen, onClose, onSubmit, isConfirming }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-[400px] flex flex-col items-center justify-center bg-card-bg rounded-xl shadow-md border border-card-border p-6">
                <h2 className="text-2xl font-serif font-bold text-text-dark mb-4">Confirm Submitting Order</h2>
                <div className="flex flex-col gap-2 w-3/4">
                    <button onClick={onSubmit} className="bg-primary hover:bg-primary-hover cursor-pointer text-white px-4 py-2 rounded-lg font-medium transition-colors">{isConfirming ? "Confirming..." : "Confirm"}</button>
                    <button onClick={onClose} className="border border-card-border text-text-dark hover:bg-card-beige cursor-pointer px-4 py-2 rounded-lg font-medium transition-colors">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default SubmitOrderModal