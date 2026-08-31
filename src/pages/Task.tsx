/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import AccountDetailsModal from "@/components/modal/AccountDetailsModal";
import PackageSelectionModal from "@/components/modal/PackageSelectionModal";
import MysteryBoxModal from "@/components/modal/MysteryBoxModal";
import MysteryBoxRewardModal from "@/components/modal/MysteryBoxRewardModal";
import {
  useGetSingleUserQuery,
  useUpdateSelectedPackageMutation,
  useRemoveMysteryRewardMutation,
  useMarkMysteryBoxAsSeenMutation,
} from "@/store/api/user/userApi";
import { toast } from "sonner";
import MiningOrderModal from "@/components/modal/MiningOrderModal";
import ErrorModal from "@/components/modal/ErrorModal";
import ErrorModalBlack from "@/components/modal/ErrorModalBlack";

interface TaskItem {
  id: number;
  image: string;
  title: string;
  reviews: string;
  category?: string;
}

const Task: React.FC = () => {
  const navigate = useNavigate();

  const tasks: TaskItem[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=400&q=80",
      title: "Presidential Ocean Suite",
      reviews: "6,507 Reviews",
      category: "Ultra Luxury Suite",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80",
      title: "Royal Penthouse Suite",
      reviews: "16,772 Reviews",
      category: "VIP Penthouse",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
      title: "Executive Sky Villa",
      reviews: "14,803 Reviews",
      category: "Private Villa",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
      title: "Grand Deluxe Ocean View",
      reviews: "5,458 Reviews",
      category: "Deluxe Suite",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80",
      title: "Imperial Horizon Suite",
      reviews: "10,237 Reviews",
      category: "Horizon Suite",
    },
  ];

  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [openPackageModal, setOpenPackageModal] = useState(false);
  const [openMysteryBoxModal, setOpenMysteryBoxModal] = useState(false);
  const [openMysteryRewardModal, setOpenMysteryRewardModal] = useState(false);
  const [activeMysteryReward, setActiveMysteryReward] = useState<number | null>(
    null,
  );
  const [mysteryBoxData, setMysteryBoxData] = useState<any>(null);
  const [openMiningModal, setOpenMiningModal] = useState(false);

  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage] = useState("");
  const [errorMessageBlack, setErrorMessageBlack] = useState("");
  const [openErrorModalBlack, setOpenErrorModalBlack] = useState(false);
  const [, setShouldCheckOrder] = useState(false);

  // Fetch user data
  const id = localStorage.getItem("userId");
  const userId = id ? parseInt(id) : 0;

  const {
    data: userData,
    isLoading,
    isFetching,
    refetch,
  } = useGetSingleUserQuery(userId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [updatePackage, { isLoading: isUpdating }] =
    useUpdateSelectedPackageMutation();
  const [removeMysteryReward] = useRemoveMysteryRewardMutation();
  const [markMysteryBoxAsSeen] = useMarkMysteryBoxAsSeenMutation();

  const user = userData?.data;

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  // Check for mystery reward on component mount
  useEffect(() => {
    if (user && user.mysteryReward && user.mysteryReward > 0) {
      setActiveMysteryReward(user.mysteryReward);
      setOpenMysteryRewardModal(true);
    }
  }, [user]);

  const accountDetailsData = {
    name: user?.name || "sajjadhosenmahim",
    userId: user?.userId || 7872843,
    quantityOfOrders: user?.quantityOfOrders || 25,
    userBalance: user?.userBalance || 0,
    memberTotalRecharge: user?.memberTotalRecharge || 0,
    userType: user?.userType || "Normal",
    dailyProfit: user?.dailyProfit || 0,
    outOfBalance: user?.outOfBalance || 0,
    completedOrdersCount: user?.completedOrdersCount || 0,
    trialRoundBalance: user?.trialRoundBalance || 0,
  };

  const handleStartClick = () => {
    if (
      user?.adminAssaignProductsOrRewards &&
      user.adminAssaignProductsOrRewards.length > 0
    ) {
      const productWithMysteryBox = user.adminAssaignProductsOrRewards.find(
        (product: any) =>
          product.mysterybox &&
          product.mysterybox.method &&
          product.mysterybox.amount &&
          product.mysterybox.seenTheReward === false,
      );
      const mysteryBoxOrderNumber = productWithMysteryBox?.orderNumber;

      if (mysteryBoxOrderNumber === user?.completedOrdersCount + 1) {
        setMysteryBoxData({
          ...productWithMysteryBox.mysterybox,
          productId: productWithMysteryBox.productId,
        });
        setOpenMysteryBoxModal(true);
        return;
      }
    }

    refetch();

    if (
      user?.orderRound?.round === "trial" &&
      user?.completedOrdersCount === 25 &&
      user?.trialRoundBalance === 0
    ) {
      setErrorMessageBlack(
        "Your trial round has been completed. Now, to start the next round, please contact your senior consultant.",
      );
      setOpenErrorModalBlack(true);
      return;
    }
    if (
      user?.orderRound?.round === "round_one" &&
      user?.completedOrdersCount === 25
    ) {
      setErrorMessageBlack(
        "Your round one has been completed. Now, to start the next round, please contact your customer services.",
      );
      setOpenErrorModalBlack(true);
      return;
    }

    if (!user?.userSelectedPackage || user.userSelectedPackage === 0) {
      setOpenPackageModal(true);
    } else {
      setOpenMiningModal(true);
      setShouldCheckOrder(true);
    }
  };

  const handlePackageSelection = async (amount: number) => {
    try {
      await updatePackage({ userId, amount }).unwrap();
      setOpenPackageModal(false);
      toast.success("Reservation package selected successfully");

      setOpenMiningModal(true);
      setShouldCheckOrder(true);
    } catch (error) {
      console.error("Failed to update package:", error);
      toast.error((error as any)?.data?.message);
    }
  };

  const handleMysteryRewardContinue = async () => {
    try {
      await removeMysteryReward(userId).unwrap();
      setOpenMysteryRewardModal(false);
      toast.success("Mystery reward claimed successfully!");
    } catch (error) {
      console.error("Failed to remove mystery reward:", error);
      toast.error((error as any)?.data?.message);
    }
  };

  if (isLoading && !userData) {
    return (
      <div className="max-w-125 mx-auto bg-brand-bg h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b58a4b] mx-auto"></div>
          <p className="mt-4 text-[#b58a4b] font-serif font-medium">
            Loading Hotel Reservations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-125 mx-auto bg-brand-bg min-h-screen relative pb-28">
      {/* Loading Overlay */}
      {isFetching && userData && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#b58a4b] text-white text-center py-1 text-xs max-w-125 mx-auto font-medium">
          Syncing reservation data...
        </div>
      )}

      {/* Hotel Reservation Header */}
      <div className="bg-white border-b border-amber-100 px-4 py-4 shadow-2xs">
        {/*<div className="flex items-center text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-[#b58a4b]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-400" />
          <span className="text-slate-900 font-medium">Hotel Reservation</span>
        </div>*/}
        {/* <div className="flex items-center space-x-2">
          <Building2 className="w-6 h-6 text-[#b58a4b]" />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1a2332]">
            NH Hotel Reservation
          </h1>
        </div> */}
        <p className="text-xs text-slate-500 font-light mt-1">
          Exclusive Luxury Suites & Resort Reservation Service
        </p>
      </div>

      {/* Tab Headers */}
      <div className="grid grid-cols-2 border-b border-amber-200/60 bg-amber-50/50">
        <div className="text-center py-3 font-serif font-semibold text-[#b58a4b] border-b-2 border-[#b58a4b] text-sm">
          Luxury Collection
        </div>
        <div className="text-center py-3 font-serif font-medium text-slate-500 text-sm">
          Reservation Policy
        </div>
      </div>

      {/* Hotel Room List - Luxury Cards Layout */}
      <div className="p-3.5 sm:p-4 space-y-3 bg-brand-bg">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-md border border-amber-200/70 p-3 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer flex items-center gap-3"
          >
            {/* Room Image Container with Badges */}
            <div className="relative w-28 h-24 rounded-xl overflow-hidden shrink-0 shadow-2xs">
              <img
                src={task.image}
                alt={task.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Room Number Badge */}
              <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-serif font-bold flex items-center justify-center border border-white/30">
                {task.id}
              </div>
              {/* Rating Badge Overlay */}
              <div className="absolute bottom-1.5 left-1.5 bg-white/90 backdrop-blur-xs text-text-dark text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                <span>5.0</span>
              </div>
            </div>

            {/* Room Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div>
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-[9px] uppercase font-extrabold tracking-wider text-[#b58a4b] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/50">
                    {task.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-light truncate">
                    {task.reviews}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xs sm:text-sm text-text-dark group-hover:text-[#b58a4b] transition-colors leading-tight truncate">
                  {task.title}
                </h3>
              </div>

              {/* Luxury Amenities Tags */}
              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-500 font-light overflow-x-auto no-scrollbar">
                <span className="bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100 shrink-0">
                  ✦ King Bed
                </span>
                <span className="bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100 shrink-0">
                  ✦ Ocean View
                </span>
                <span className="bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100 shrink-0">
                  ✦ VIP
                </span>
              </div>
            </div>

            {/* Right Action Circle Button */}
            <div className="flex items-center justify-center pr-1 shrink-0">
              <div className="w-7 h-7 rounded-full bg-amber-50 group-hover:bg-[#b58a4b] text-[#b58a4b] group-hover:text-white flex items-center justify-center transition-all duration-200">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Area */}
      <div className="max-w-125 px-5 mx-auto bg-brand-bg border-t border-amber-200/60 pt-6 pb-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => setOpenAccountModal(true)}
            className="py-3 cursor-pointer rounded-xl text-white bg-[#547792] hover:bg-[#46657d] font-medium text-xs sm:text-sm transition-colors shadow-xs"
          >
            Account Details
          </button>

          <Link
            to="/order-record"
            className="py-3 cursor-pointer rounded-xl text-white text-center bg-[#547792] hover:bg-[#46657d] font-medium text-xs sm:text-sm transition-colors shadow-xs"
          >
            Reservation Record
          </Link>
        </div>

        {/* Start Reservation Button */}
        <button
          onClick={handleStartClick}
          className="w-full py-3.5 text-white cursor-pointer bg-[#b58a4b] hover:bg-primary-hover rounded-xl font-serif font-bold text-base sm:text-lg transition-all shadow-md active:scale-99 flex items-center justify-center gap-2"
        >
          <span>Start Reservation</span>
          <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold">
            {userData?.data?.completedOrdersCount} / 25
          </span>
        </button>
      </div>

      {/* Modals */}
      <AccountDetailsModal
        open={openAccountModal}
        onClose={() => {
          refetch();
          setOpenAccountModal(false);
        }}
        data={accountDetailsData}
      />

      <PackageSelectionModal
        open={openPackageModal}
        onClose={() => setOpenPackageModal(false)}
        availableSlots={user?.userOrderAmountSlot || []}
        onSelectPackage={handlePackageSelection}
        isLoading={isUpdating}
      />

      {/* Mystery Box Modal */}
      {mysteryBoxData && (
        <MysteryBoxModal
          open={openMysteryBoxModal}
          onClose={async () => {
            if (mysteryBoxData.productId) {
              try {
                await markMysteryBoxAsSeen({
                  userId,
                  productId: mysteryBoxData.productId,
                }).unwrap();
              } catch (error) {
                console.error("Failed to mark mystery box as seen:", error);
              }
            }
            setOpenMysteryBoxModal(false);
            setMysteryBoxData(null);
            navigate("/product");
          }}
          mysteryBoxData={mysteryBoxData}
        />
      )}

      {/* Mystery Reward Modal */}
      {activeMysteryReward && (
        <MysteryBoxRewardModal
          open={openMysteryRewardModal}
          onClose={async () => {
            try {
              await removeMysteryReward(userId).unwrap();
            } catch (error) {
              console.error("Failed to remove mystery reward:", error);
            }
            setOpenMysteryRewardModal(false);
            setActiveMysteryReward(null);
          }}
          mysteryReward={activeMysteryReward}
          onContinue={handleMysteryRewardContinue}
        />
      )}

      {/* Mining Order Modal */}
      <MiningOrderModal open={openMiningModal} setOpen={setOpenMiningModal} />

      {/* Error Modals */}
      <ErrorModal
        isOpen={openErrorModal}
        message={errorMessage}
        onClose={() => setOpenErrorModal(false)}
      />
      <ErrorModalBlack
        isOpen={openErrorModalBlack}
        message={errorMessageBlack}
        onClose={() => setOpenErrorModalBlack(false)}
      />
    </div>
  );
};

export default Task;
