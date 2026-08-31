/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarCheck,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  useConfirmPurchaseOrderMutation,
  useGetPurchaseOrderQuery,
} from "@/store/api/user/userApi";
import { toast } from "sonner";
import SubmitOrderModal from "@/components/modal/SubmitOrderModal";

const Product: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Get userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const {
    data: purchaseData,
    isLoading,
    isFetching,
    error,
  } = useGetPurchaseOrderQuery(userId!, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const [confirmPurchase, { isLoading: isConfirming }] =
    useConfirmPurchaseOrderMutation();

  const product = purchaseData?.data?.product;
  const orderNumber = purchaseData?.data?.orderNumber;

  const handleBack = () => {
    navigate("/reservation");
  };

  const handleSubmit = async () => {
    handleModalOpen();
    if (!userId || !product?.productId) return;

    try {
      const response = await confirmPurchase({
        userId,
        productId: product.productId,
      }).unwrap();
      if (response?.success === true) {
        if (response?.data?.success === false) {
          toast.error(response?.data?.message || "Operation failed", {
            description: "",
            duration: 5500,
          });
          return;
        }

        toast.success(
          response?.message || "Reservation confirmed successfully",
        );
        navigate("/reservation");
      } else {
        toast.error(response?.message || "Failed to confirm reservation");
      }
    } catch (error) {
      console.error("Failed to confirm purchase:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return `৳${amount?.toLocaleString()}`;
  };

  const getOrderLabel = () => {
    if (!purchaseData?.data?.isAdminAssigned) {
      return "(Snatching Order)";
    }

    if (
      purchaseData?.data?.mysteryboxMethod === "12x" &&
      purchaseData?.data?.mysteryboxAmount === "12x"
    ) {
      return "(Smart Felcon Order)";
    }

    if (
      purchaseData?.data?.outOfBalance > 0 &&
      purchaseData?.data?.mysteryboxMethod == "3x"
    ) {
      return "(Supreme Order)";
    }

    return "";
  };

  if (isLoading || isFetching) {
    return (
      <div className="max-w-125 mx-auto bg-brand-bg h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b58a4b] mx-auto"></div>
          <p className="mt-5 text-[#b58a4b] font-serif text-sm tracking-wide">
            Loading Suite Reservation Details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-125 mx-auto bg-brand-bg h-screen flex items-center justify-center p-4">
        <div className="text-center bg-white p-6 rounded-2xl border border-amber-100 shadow-sm max-w-sm w-full">
          <p className="text-red-500 mb-4 text-sm font-medium">
            {purchaseData?.data?.message ||
              (error as any)?.data?.message ||
              "Failed to load reservation details"}
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-2.5 bg-[#b58a4b] text-white rounded-xl hover:bg-primary-hover font-medium text-sm transition-colors shadow-xs"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[500px] mx-auto bg-brand-bg min-h-screen pb-36 text-text-dark">
      {/* Top Header */}
      <div className="bg-white border-b border-amber-100 px-4 py-3.5 sticky top-0 z-20 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="text-slate-600 hover:text-slate-900 transition-colors p-1"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-serif font-bold text-text-dark leading-tight">
              Suite Booking Details
            </h1>
            <p className="text-[11px] text-slate-400 font-light">
              NH Hotel Reservation Confirmation
            </p>
          </div>
        </div>
      </div>

      {/* Order Number Badge */}
      {orderNumber && (
        <div className="px-4 py-3 bg-[#faf5ed] border-b border-amber-200/50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-[#b58a4b]" />
            <span className="font-serif font-bold text-xs sm:text-sm text-text-dark">
              Booking #{orderNumber}
            </span>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b58a4b] bg-white px-2.5 py-0.5 rounded-full border border-amber-200">
            Confirmed Slot
          </span>
        </div>
      )}

      {/* Room / Suite Main Showcase Image */}
      <div className="p-4">
        <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden bg-white border border-amber-100 shadow-sm group">
          <img
            src={product.poster}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
            <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0 Luxury Rating</span>
            </div>
            <span className="bg-white/90 backdrop-blur-xs text-text-dark text-[10px] font-bold px-2 py-1 rounded-md">
              REF: #{product.productId}
            </span>
          </div>
        </div>
      </div>

      {/* Suite Information */}
      <div className="px-4 space-y-4">
        {/* Title & Badges */}
        <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-2xs">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-text-dark mb-2 leading-tight">
            {product.name}{" "}
            <span className="text-[#b58a4b] text-base font-normal">
              {getOrderLabel()}
            </span>
          </h2>

          <div className="flex items-center flex-wrap gap-2">
            <span
              className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                product.status === "Active"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.status}
            </span>

            {(purchaseData?.data?.mysteryboxMethod === "12x" ||
              purchaseData?.data?.mysteryboxMethod === "3x") && (
              <span className="text-xs bg-amber-100 text-[#b58a4b] font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                {purchaseData?.data?.mysteryboxMethod === "12x"
                  ? "Flipbox Reward"
                  : "Smart Falcon Reward"}
              </span>
            )}
          </div>
        </div>

        {/* Pricing Summary Box */}
        <div className="bg-[#faf5ed] border border-amber-200/70 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-amber-200/60 pb-2.5">
            <span className="font-serif font-bold text-sm text-text-dark flex items-center gap-1.5">
              <CalendarCheck className="w-4 h-4 text-[#b58a4b]" />
              Reservation Summary
            </span>
            <span className="text-[11px] text-slate-500 font-light">
              Guaranteed Rate
            </span>
          </div>

          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-600 font-light">Suite Base Price:</span>
            <span className="font-bold text-text-dark">
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-600 font-light flex items-center gap-1">
              Concierge Commission:
              <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-semibold">
                Earn
              </span>
            </span>
            <span className="font-bold text-emerald-600">
              +
              {purchaseData?.data?.isAdminAssigned === true
                ? formatCurrency(purchaseData?.data?.commission)
                : formatCurrency(purchaseData?.data?.product?.commission)}
            </span>
          </div>

          <div className="border-t border-amber-200/60 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-serif font-bold text-sm sm:text-base text-text-dark">
                Total Reservation Return:
              </span>
              <span className="font-serif font-extrabold text-xl sm:text-2xl text-[#b58a4b]">
                {purchaseData?.data?.mysteryboxMethod === "12x" ||
                purchaseData?.data?.mysteryboxMethod === "3x"
                  ? formatCurrency(
                      purchaseData?.data?.commission +
                        purchaseData?.data?.product?.price,
                    )
                  : formatCurrency(purchaseData?.data?.product?.salePrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Suite Overview Description */}
        {product.introduction && (
          <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-2xs space-y-2">
            <h3 className="font-serif font-bold text-base text-text-dark flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#b58a4b]" />
              Suite Overview & Concierge Details
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
              {product.introduction}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-amber-200/60 p-3 max-w-[500px] mx-auto z-40 shadow-2xl">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleModalOpen}
            disabled={isConfirming}
            className={`
              py-3.5 px-4 rounded-xl font-serif font-bold text-sm sm:text-base cursor-pointer transition-all shadow-md active:scale-99 flex items-center justify-center gap-2
              ${
                isConfirming
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-[#b58a4b] hover:bg-[#9c7339] text-white"
              }
            `}
          >
            <span>Confirm Reservation</span>
          </button>

          {purchaseData?.data?.mysteryboxMethod ? (
            <div className="py-2.5 px-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-semibold text-xs sm:text-sm text-center flex flex-col justify-center items-center">
              <span>
                Earn Profit:{" "}
                <span className="font-serif font-extrabold text-base">
                  {purchaseData?.data?.mysteryboxMethod === "12x"
                    ? "12x"
                    : purchaseData?.data?.mysteryboxMethod === "cash"
                      ? "Cash"
                      : "3x"}
                </span>
              </span>
              <span className="font-bold text-emerald-700">
                {formatCurrency(purchaseData?.data?.commission)}
              </span>
            </div>
          ) : (
            <button
              className="py-3.5 px-3 bg-slate-100 border border-slate-200 text-slate-800 rounded-xl font-bold text-xs sm:text-sm transition-colors text-center truncate"
              disabled={isConfirming}
            >
              Earn Profit: {formatCurrency(purchaseData?.data?.commission)}
            </button>
          )}
        </div>
      </div>

      <SubmitOrderModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        isConfirming={isConfirming}
      />
    </div>
  );
};

export default Product;
