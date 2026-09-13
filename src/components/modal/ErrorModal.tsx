import { X } from "lucide-react";

interface ErrorModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}

const ErrorModal = ({ isOpen, message, onClose }: ErrorModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />
            <div className="relative bg-card-bg rounded-lg shadow-xl max-w-md w-full mx-4 p-6 border border-card-border">
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-4 right-4 text-text-muted hover:text-primary transition-colors"
                >
                    <X size={24} />
                </button>
                <div className="pr-8">
                    <p className="text-lg font-semibold text-red-500">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;