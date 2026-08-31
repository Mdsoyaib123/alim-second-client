import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface MiningOrderModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const MiningOrderModal: React.FC<MiningOrderModalProps> = ({ open, setOpen }) => {
    if (!open) return null;

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/product");
            setOpen(false);
        }, 3000);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-card-bg rounded-xl shadow-md max-w-sm w-full mx-4 text-center border border-card-border">
                {/* Mining Icon/Image */}
                <div className="mb-6 flex justify-center">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center animate-pulse">
                            <svg
                                className="w-16 h-16"
                                viewBox="0 0 120 120"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="white" stopOpacity="1" />
                                        <stop offset="100%" stopColor="white" stopOpacity="0.2" />
                                    </radialGradient>
                                </defs>
                                <circle cx="60" cy="60" r="16" fill="url(#glow)" className="animate-pulse" />
                                <circle cx="60" cy="60" r="36" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeDasharray="6 10" className="animate-spin origin-center" style={{ animationDuration: "3s" }} />
                                <path d="M60 24 A36 36 0 0 1 96 60" stroke="white" strokeWidth="4" strokeLinecap="round" className="animate-spin origin-center" style={{ animationDuration: "1s" }} />
                            </svg>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-serif font-bold text-text-dark mb-2">
                    Snatching Order...
                </h2>

                <div className="flex justify-center gap-1 mt-4">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
};

export default MiningOrderModal;