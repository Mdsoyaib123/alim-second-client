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
  Building2,
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
    <div className="min-h-screen bg-brand-bg max-w-[500px] mx-auto pb-28 text-text-dark">
      <div className="flex flex-col h-full bg-brand-bg">
        
        {/* Hotel Guest Profile Header */}
        <div className="flex flex-col items-center pt-8 pb-6 px-6 relative bg-card-beige border-b border-amber-200/70 shadow-2xs">
          <button 
            onClick={() => navigate("/")} 
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-lg font-light focus:outline-none p-1"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Hotel Emblem Badge */}
          <div className="flex items-center space-x-1.5 mb-4">
            <div className="w-5 h-5 rounded-xs border border-primary flex items-center justify-center bg-white/60">
              <span className="font-serif font-bold text-xs text-primary leading-none">H</span>
            </div>
            <span className="font-serif tracking-widest text-primary font-semibold text-xs uppercase">
              NH Hotel Concierge
            </span>
          </div>

          {/* User Avatar Circle */}
          <div className="w-20 h-20 rounded-full border-2 border-primary bg-white shadow-md flex items-center justify-center mb-3 text-primary">
            <User className="w-9 h-9 text-primary" />
          </div>

          {/* User Name */}
          <div className="font-serif font-bold text-xl sm:text-2xl text-text-dark tracking-tight">
            {user?.name || "de"}
          </div>

          {/* UID & Member Status */}
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs text-slate-500 font-medium tracking-wide">
              UID: {localStorage.getItem("userId") || user?.userId || "6450110"}
            </span>
            <span className="bg-amber-100/90 text-primary border border-amber-200 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              VIP Member
            </span>
          </div>

          {/* Cash In Button */}
          <button className="mt-5 w-full bg-secondary hover:bg-secondary-hover cursor-pointer text-white py-3 rounded-xl font-serif font-bold text-sm transition-all shadow-md active:scale-99 flex items-center justify-center gap-2">
            <Building2 className="w-4 h-4 text-amber-200" />
            <span>Cash In</span>
          </button>
        </div>

        {/* Quick Actions Bar */}
        <div className="grid grid-cols-3 gap-2 px-6 py-4 border-y border-amber-200/50 bg-white shadow-2xs my-3">
          <Link to="/cash-out" className="flex flex-col items-center justify-center gap-1.5 py-1.5 group">
            <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-primary group-hover:text-white text-slate-800 flex items-center justify-center transition-all duration-200 border border-amber-100/80">
              <TbCurrencyTaka className="w-6 h-6" />
            </div>
            <span className="text-xs font-serif font-medium text-slate-800 text-center">Cash Out</span>
          </Link>

          <Link to="/contact" className="flex flex-col items-center justify-center gap-1.5 py-1.5 group border-x border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-primary group-hover:text-white text-slate-800 flex items-center justify-center transition-all duration-200 border border-amber-100/80">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-serif font-medium text-slate-800 text-center">Contact us</span>
          </Link>

          <button
            onClick={() => setOpenAccountModal(true)}
            className="flex flex-col items-center justify-center gap-1.5 py-1.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-primary group-hover:text-white text-slate-800 flex items-center justify-center transition-all duration-200 border border-amber-100/80">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-xs font-serif font-medium text-slate-800 text-center">Account details</span>
          </button>
        </div>

        {/* Menu Items Stack */}
        <div className="bg-white border-y border-amber-200/50 divide-y divide-amber-100/70">
          <Link to="/bind-account" className="block">
            <MenuItem icon={<CreditCard className="w-5 h-5 text-primary" />} text="Bind Account" />
          </Link>
          <Link to="/check-in" className="block">
            <MenuItem icon={<LogIn className="w-5 h-5 text-primary" />} text="Check In" />
          </Link>
          <Link to="/history" className="block">
            <MenuItem icon={<MdHistory className="w-5 h-5 text-primary" />} text="History" />
          </Link>
          <Link to="/forgot-password" className="block">
            <MenuItem icon={<Settings className="w-5 h-5 text-primary" />} text="Change Password" />
          </Link>
          <Link to="/help" className="block">
            <MenuItem icon={<HelpCircle className="w-5 h-5 text-primary" />} text="Help" />
          </Link>
          <Link to="/about" className="block">
            <MenuItem icon={<Info className="w-5 h-5 text-primary" />} text="About Us" />
          </Link>
        </div>

        {/* Sign Out Section */}
        <div className="p-6 mt-4">
          <button
            className="w-full cursor-pointer py-3.5 border-2 border-red-500/80 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 transition-all shadow-2xs active:scale-99"
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
    <div className="flex items-center justify-between px-6 py-4 hover:bg-amber-50/50 cursor-pointer transition-colors">
      <div className="flex items-center gap-3.5">
        <div className="p-1.5 rounded-lg bg-amber-50/80">{icon}</div>
        <span className="text-slate-900 text-sm sm:text-base font-serif font-medium">{text}</span>
      </div>
      <span className="text-primary font-light text-xl">+</span>
    </div>
  );
};

export default Account;
