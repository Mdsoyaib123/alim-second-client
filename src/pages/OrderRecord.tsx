import React, { useState } from "react";
import { Loader2, Star } from "lucide-react";
import {
  useGetUserCompletedProductsQuery,
  useGetUserUncompletedProductsQuery,
} from "@/store/api/user/userApi";

interface Product {
  _id: string;
  productId: number;
  status: string;
  name: string;
  price: number;
  commission: number;
  salePrice: number;
  introduction: string;
  poster: string;
  isAdminAssigned: boolean;
  createdAt: string;
  updatedAt: string;
}

const LOBBY_BANNER =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80";

const OrderRecord: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const [activeTab, setActiveTab] = useState<"completed" | "uncompleted">(
    "completed",
  );

  const completedQuery = useGetUserCompletedProductsQuery(Number(userId), {
    skip: !userId || activeTab !== "completed",
  });

  const uncompletedQuery = useGetUserUncompletedProductsQuery(Number(userId), {
    skip: !userId || activeTab !== "uncompleted",
  });

  const { data, isLoading, error } =
    activeTab === "completed" ? completedQuery : uncompletedQuery;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "No date available";
    }
  };

  const formatPrice = (price: number) => {
    return price ? price.toFixed(2) : "0.00";
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
        <div className="text-center bg-white p-6 rounded-2xl border border-amber-100 shadow-sm max-w-sm w-full">
          <p className="text-slate-600 font-medium">
            Please login to view your booking history
          </p>
        </div>
      </div>
    );
  }

  const products = data?.data || [];

  return (
    <div className="min-h-screen bg-brand-bg pb-12 text-text-dark">
      <div className="max-w-125 mx-auto bg-brand-bg min-h-screen">
        {/* Top Header Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900 shadow-sm">
          <img
            src={LOBBY_BANNER}
            alt="Scheduled record lobby"
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20" />

          <div className="absolute bottom-4 left-5 right-5">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Scheduled record
            </h1>
            <p className="text-[#f5efe6] text-xs sm:text-sm font-light mt-0.5">
              View your booking history
            </p>
          </div>
        </div>

        {/* 2 Tabs Bar */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-5 py-1.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeTab === "completed"
                  ? "bg-primary text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900 bg-white/80 border border-amber-100/80"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab("uncompleted")}
              className={`px-5 py-1.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeTab === "uncompleted"
                  ? "bg-primary text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900 bg-white/80 border border-amber-100/80"
              }`}
            >
              Uncompleted
            </button>
          </div>
        </div>

        {/* Section Heading */}
        <div className="px-5 pt-2 pb-3">
          <h2 className="font-serif font-bold text-lg text-text-dark tracking-tight">
            All History
          </h2>
        </div>

        {/* Booking Cards Container */}
        <div className="px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-red-500 text-sm font-medium">
                Failed to load booking record
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-amber-100 p-6">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-3 text-primary text-xl">
                🛎️
              </div>
              <p className="text-slate-700 font-serif font-bold text-base">
                No {activeTab} bookings
              </p>
              <p className="text-slate-400 text-xs font-light mt-1 max-w-55">
                Your {activeTab} hotel reservations and booking records will
                appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product: Product, index: number) => (
                <div
                  key={`${product._id}-${index}`}
                  className="bg-white rounded-md p-4 border border-amber-100/80 shadow-2xs hover:shadow-xs transition-shadow"
                >
                  {/* Top Info Row */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Hotel Room Image */}
                    <div className="w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-amber-50 shrink-0 border border-amber-100">
                      <img
                        src={product.poster}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80";
                        }}
                      />
                    </div>

                    {/* Hotel Room Title & Date */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-sm sm:text-base text-text-dark leading-tight truncate">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-light mt-0.5">
                        {formatDate(product.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Middle Row: Unit Price, Commission, Total Return, Status */}
                  <div className="pt-2.5 border-t border-slate-100 space-y-2">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-400 font-light block">
                          Unit Price
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-text-dark">
                          ৳ {formatPrice(product.price)}
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-400 font-light flex items-center gap-1">
                          Commission{" "}
                          <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1 rounded font-semibold">
                            Earn
                          </span>
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-emerald-600">
                          +৳ {formatPrice(product.commission)}
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-400 font-light block">
                          Total Return
                        </span>
                        <span className="font-extrabold text-xs sm:text-sm text-primary">
                          ৳{" "}
                          {formatPrice(
                            product.salePrice ||
                              product.price + product.commission,
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Status / Complete Task Action Button */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-400 font-light">
                        REF: {product.productId || index + 1}
                      </span>
                      <div>
                        {activeTab === "completed" ? (
                          <span className="text-emerald-600 font-semibold text-xs sm:text-sm">
                            Completed
                          </span>
                        ) : (
                          <button className="bg-primary hover:bg-primary-hover text-white text-xs font-medium px-4 py-1.5 rounded-lg shadow-2xs transition-colors cursor-pointer">
                            Complete Task
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Rating Evaluation Bar */}
                  <div className="mt-3 bg-brand-bg border border-amber-200/60 rounded-xl p-2.5 px-3.5 flex items-center justify-between">
                    <span className="font-serif italic text-primary text-xs sm:text-sm font-medium">
                      Evaluation
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderRecord;
