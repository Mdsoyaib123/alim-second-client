import { X } from "lucide-react";

interface ErrorModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}

const ErrorModalBlack = ({ isOpen, message, onClose }: ErrorModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />
            <div className="relative bg-card-bg rounded-lg shadow-xl max-w-md w-full mx-4 py-2 pb-12 px-4 border border-card-border">
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-4 right-4 text-text-muted hover:text-primary transition-colors"
                >
                    <X size={24} />
                </button>
                <h1 className="text-lg text-center font-semibold mb-4 border-b border-card-border py-3 text-text-dark">Notice</h1>
                <div className="px-6">
                    <div>
                        <p className="text-lg text-center text-text-dark font-base">{message}</p>
                    </div>
                    <div className="mt-5 flex justify-center">
                        <button onClick={onClose} className="bg-primary hover:bg-primary-hover cursor-pointer text-white px-4 py-2 w-full rounded-lg font-medium transition-colors">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorModalBlack;