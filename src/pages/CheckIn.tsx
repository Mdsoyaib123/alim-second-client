/* eslint-disable @typescript-eslint/no-explicit-any */
import moneyBag from "@/assets/money-bag.png";
import { useGetSingleUserQuery, useClaimCheckInRewardMutation } from "@/store/api/user/userApi";
import { BsFileLock } from "react-icons/bs";
import { toast } from "sonner";
import { ArrowLeft, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

const rewards = [
  { day: "1 Day", amount: "৳300", numericAmount: 300, dayNum: 1 },
  { day: "2 Day", amount: "৳500", numericAmount: 500, dayNum: 2 },
  { day: "3 Day", amount: "৳700", numericAmount: 700, dayNum: 3 },
  { day: "4 Day", amount: "৳900", numericAmount: 900, dayNum: 4 },
  { day: "5 Day", amount: "৳1100", numericAmount: 1100, dayNum: 5 },
  { day: "6 Day", amount: "৳1300", numericAmount: 1300, dayNum: 6 },
  { day: "7 Day", amount: "৳2000", numericAmount: 2000, dayNum: 7 },
];

export default function CheckIn() {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const userId = id ? parseInt(id) : 0;

  const { data: userData, isLoading } = useGetSingleUserQuery(userId, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const [claimReward, { isLoading: isClaiming }] = useClaimCheckInRewardMutation();

  const orderCount = userData?.data?.orderCountForCheckIn ?? 0;
  const totalCheckIns = userData?.data?.dailyCheckInReward?.totalCheckIns ?? 0;
  const hasCompletedRequiredOrders = orderCount >= 41;

  const handleClaim = async (dayNum: number, amount: number) => {
    if (isClaiming) return;

    try {
      const response = await claimReward({
        userId,
        checkInAmount: amount,
      }).unwrap();

      toast.success(response?.message || "Check In reward added successfully");
    } catch (err: any) {
      console.error("Claim failed:", err);
      const errorMessage = err?.data?.message || "Failed to claim reward";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[500px] mx-auto bg-brand-bg min-h-screen flex items-center justify-center">
        <div className="text-center font-serif text-primary">Loading Check-In Rewards...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg max-w-[500px] mx-auto pb-24 text-text-dark">
      {/* Top Header with Back Button */}
      <div className="bg-white border-b border-amber-100 px-4 py-3.5 sticky top-0 z-20 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/account")}
            className="text-slate-600 hover:text-slate-900 transition-colors p-1"
            aria-label="Go back to Account"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-serif font-bold text-text-dark leading-tight">
              Daily Check In
            </h1>
            <p className="text-[11px] text-slate-400 font-light">
              NH Hotel Daily Reward Concierge
            </p>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="p-4">
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-44 sm:h-52 shadow-sm flex items-center justify-center text-center">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
            alt="Check In Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          <div className="relative z-10 px-6 py-4">
            <span className="font-serif italic text-amber-200 text-sm">Guest Rewards</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mt-0.5">
              Daily Check In Rewards
            </h2>
          </div>
        </div>
      </div>

      {/* Main Rewards Grid Container */}
      <div className="px-4">
        <div className="bg-white rounded-2xl p-5 border border-amber-100/80 shadow-2xs">
          <div className="flex items-center justify-between mb-5 border-b border-amber-100 pb-3">
            <h3 className="font-serif font-bold text-base text-text-dark flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              Claim Daily Bonus
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {rewards.map((item) => {
              const isClaimed = item.dayNum <= totalCheckIns;
              const isUnlocked = hasCompletedRequiredOrders && item.dayNum === totalCheckIns + 1;
              const isLocked = item.dayNum > totalCheckIns + 1;

              return (
                <RewardItem
                  key={item.dayNum}
                  {...item}
                  isClaimed={isClaimed}
                  isUnlocked={isUnlocked}
                  isLocked={isLocked}
                  hasCompletedRequiredOrders={hasCompletedRequiredOrders}
                  onClaim={() => handleClaim(item.dayNum, item.numericAmount)}
                  isClaiming={isClaiming}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface RewardItemProps {
  day: string;
  amount: string;
  numericAmount: number;
  dayNum: number;
  isClaimed?: boolean;
  isUnlocked?: boolean;
  isLocked?: boolean;
  hasCompletedRequiredOrders?: boolean;
  isClaiming?: boolean;
  onClaim: () => void;
}

function RewardItem({
  day,
  amount,
  isClaimed = false,
  isUnlocked = false,
  isLocked = false,
  hasCompletedRequiredOrders = false,
  isClaiming = false,
  onClaim,
}: RewardItemProps) {
  const handleClick = () => {
    if (isClaimed || isClaiming) return;

    if (!isUnlocked) {
      if (!hasCompletedRequiredOrders) {
        toast.info("Complete 41 orders to unlock check-in rewards");
      } else if (isLocked) {
        toast.info("Complete previous days first");
      }
      return;
    }

    onClaim();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        disabled={isClaimed || isClaiming || !isUnlocked}
        className={`
          w-full relative flex flex-col items-center justify-between p-3 rounded-2xl transition-all duration-200 min-h-[120px]
          ${isClaimed
            ? "bg-emerald-50 border border-emerald-200 text-emerald-800 cursor-not-allowed"
            : isUnlocked
              ? "bg-[#faf5ed] hover:bg-amber-100/60 border border-amber-300 active:scale-95 cursor-pointer shadow-xs"
              : "bg-slate-50 border border-slate-200 text-slate-400 cursor-not-allowed opacity-80"}
        `}
      >
        {/* LOCK OVERLAY */}
        {(isLocked || !hasCompletedRequiredOrders) && !isClaimed && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/35 backdrop-blur-2xs">
            <BsFileLock className="text-white text-2xl" />
          </div>
        )}

        <div
          className={`
            flex h-12 w-12 items-center justify-center rounded-full shadow-2xs mb-1
            ${isClaimed ? "bg-emerald-100" : isUnlocked ? "bg-amber-100" : "bg-slate-200"}
          `}
        >
          {isClaimed ? (
            <span className="text-emerald-600 text-lg font-bold">✓</span>
          ) : (
            <img src={moneyBag} alt="money bag" className="h-6 w-6 object-contain" />
          )}
        </div>

        <span className="text-xs font-serif font-semibold text-text-dark">{day}</span>
        <span
          className={`text-xs font-bold ${
            isClaimed
              ? "text-emerald-600"
              : isUnlocked
                ? "text-primary"
                : "text-slate-400"
          }`}
        >
          {isClaimed ? "Claimed" : amount}
        </span>
      </button>
    </div>
  );
}