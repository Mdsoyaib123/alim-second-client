import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  CreditCard,
  LogIn,
  HelpCircle,
  Info,
  Settings,
} from "lucide-react";
import { MdHistory } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import { useGetSingleUserQuery } from "@/store/api/user/userApi";
import AccountDetailsModal from "@/components/modal/AccountDetailsModal";

const Account: React.FC = () => {
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.token);
  const isAuthenticated = !!token || !!localStorage.getItem("accessToken");

  const id = localStorage.getItem("userId");
  const userId = id ? parseInt(id) : 0;

  const { data: userData } = useGetSingleUserQuery(userId, {
    skip: !isAuthenticated || !userId,
    refetchOnMountOrArgChange: true,
  });

  const user = userData?.data;

  const accountDetailsData = {
    name: user?.name || "de",
    userId: user?.userId || 6450110,
    quantityOfOrders: user?.quantityOfOrders || 25,
    userBalance: user?.userBalance || 0,
    memberTotalRecharge: user?.memberTotalRecharge || 0,
    userType: user?.userType || "Normal",
    dailyProfit: user?.dailyProfit || 0,
    outOfBalance: user?.outOfBalance || 0,
    completedOrdersCount: user?.completedOrdersCount || 0,
    trialRoundBalance: user?.trialRoundBalance || 0,
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white max-w-[500px] mx-auto pb-24 shadow-sm border-x border-gray-100">
      {/* Container Card */}
      <div className="flex flex-col h-full bg-white">
        
        {/* User Profile Info Header */}
        <div className="flex flex-col items-center pt-8 pb-6 px-6 relative">
          <button 
            onClick={() => navigate("/")} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-light focus:outline-none"
            aria-label="Close"
          >
            ✕
          </button>

          {/* User Icon Circle */}
          <div className="w-20 h-20 rounded-full bg-slate-200/80 flex items-center justify-center mb-3 text-slate-600 shadow-inner">
            <User className="w-10 h-10 text-slate-600" />
          </div>

          <div className="text-xl font-bold text-slate-900 tracking-tight">
            {user?.name || "de"}
          </div>
          <div className="text-xs text-slate-500 font-medium tracking-wide mt-0.5">
            UID:{localStorage.getItem("userId") || user?.userId || "6450110"}
          </div>

          {/* Cash In Button */}
          <button className="mt-5 w-full bg-[#0c1e4a] hover:bg-[#081533] cursor-pointer text-white py-3 rounded-lg font-semibold text-sm transition-colors shadow-sm active:scale-99">
            Cash In
          </button>
        </div>

        {/* Quick Actions Bar */}
        <div className="grid grid-cols-3 gap-2 px-6 py-4 border-y border-gray-100 bg-slate-50/50">
          <Link to="/cash-out" className="flex flex-col items-center justify-center gap-1.5 py-2 group">
            <div className="w-10 h-10 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
              <TbCurrencyTaka className="w-7 h-7" />
            </div>
            <span className="text-xs font-medium text-slate-800 text-center">Cash Out</span>
          </Link>

          <Link to="/contact" className="flex flex-col items-center justify-center gap-1.5 py-2 group border-x border-gray-200/60">
            <div className="w-10 h-10 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-800 text-center">Contact us</span>
          </Link>

          <button
            onClick={() => setOpenAccountModal(true)}
            className="flex flex-col items-center justify-center gap-1.5 py-2 cursor-pointer group"
          >
            <div className="w-10 h-10 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-800 text-center">Account details</span>
          </button>
        </div>

        {/* Menu Items Stack */}
        <div className="divide-y divide-gray-100 flex-1">
          <Link to="/bind-account" className="block">
            <MenuItem icon={<CreditCard className="w-5 h-5" />} text="Bind Account" />
          </Link>
          <Link to="/check-in" className="block">
            <MenuItem icon={<LogIn className="w-5 h-5" />} text="Check In" />
          </Link>
          <Link to="/history" className="block">
            <MenuItem icon={<MdHistory className="w-5 h-5" />} text="History" />
          </Link>
          <Link to="/forgot-password" className="block">
            <MenuItem icon={<Settings className="w-5 h-5" />} text="Change Password" />
          </Link>
          <Link to="/help" className="block">
            <MenuItem icon={<HelpCircle className="w-5 h-5" />} text="Help" />
          </Link>
          <Link to="/about" className="block">
            <MenuItem icon={<Info className="w-5 h-5" />} text="About Us" />
          </Link>
        </div>

        {/* Sign Out Section */}
        <div className="p-6 mt-6">
          <button
            className="w-full cursor-pointer py-3 border-2 border-red-500 text-red-500 rounded-lg font-bold text-sm hover:bg-red-50 transition-colors shadow-2xs active:scale-99"
            onClick={handleLogOut}
          >
            Sign Out
          </button>
        </div>

      </div>

      {/* Account Details Modal */}
      <AccountDetailsModal
        open={openAccountModal}
        onClose={() => setOpenAccountModal(false)}
        data={accountDetailsData}
      />
    </div>
  );
};

// Reusable Menu Item Component
const MenuItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/80 cursor-pointer transition-colors">
      <div className="flex items-center gap-4">
        <div className="text-slate-700">{icon}</div>
        <span className="text-slate-900 text-sm sm:text-base font-medium">{text}</span>
      </div>
      <span className="text-gray-400 font-light text-xl">+</span>
    </div>
  );
};

export default Account;
