import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface MiningOrderModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MiningOrderModal: React.FC<MiningOrderModalProps> = ({
  open,
  setOpen,
}) => {
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
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center animate-pulse-slow border-2 border-primary-hover">
              {/* Hotel Bell Icon - representing service/reservation */}
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C9.243 2 7 4.243 7 7v4H4v2h2v7h12v-7h2v-2h-3V7c0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3v4H9V7c0-1.654 1.346-3 3-3zm-1 12H9v-2h2v2zm-2 0H7v-2h2v2zm6 0h-2v-2h2v2zm2 0h-2v-2h2v2zm-6-4H9v-2h2v2zm-2 0H7v-2h2v2zm6 0h-2v-2h2v2zm2 0h-2v-2h2v2zM12 5a.5.5 0 100 1 .5.5 0 000-1z" />
              </svg>
              <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-ping-slow" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-serif font-bold text-text-dark mb-2">
          Confirming Reservation...
        </h2>

        <div className="flex justify-center gap-1 mt-4">
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MiningOrderModal;
