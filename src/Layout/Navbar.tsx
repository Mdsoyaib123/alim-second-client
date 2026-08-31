import React, { useState, useEffect } from "react";
import {
  Menu,
  User,
  Mail,
  CreditCard,
  LogIn,
  HelpCircle,
  Info,
  Settings,
  Building2,
} from "lucide-react";
import { MdHistory, MdEvent, MdEmojiEvents } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import { useGetSingleUserQuery } from "@/store/api/user/userApi";
import AccountDetailsModal from "@/components/modal/AccountDetailsModal";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get authentication state from Redux
  const token = useAppSelector((state) => state.auth.token);
  const isAuthenticated = !!token || !!localStorage.getItem("accessToken");

  // Fetch user data
  const id = localStorage.getItem("userId");
  const userId = id ? parseInt(id) : 0;
  const { data: userData } = useGetSingleUserQuery(userId, {
    skip: !isAuthenticated || !userId,
    refetchOnMountOrArgChange: true,
  });

  const user = userData?.data;

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close sheet when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogOut = () => {
    setIsOpen(false);
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  const handleAccountDetailsClick = () => {
    setIsOpen(false);
    setOpenAccountModal(true);
  };

  return (
    <>
      <nav className="bg-card-beige border-b border-amber-200/70 shadow-2xs w-full sticky top-0 z-40">
        <div className="max-w-[500px] mx-auto px-4">
          <div className="flex items-center justify-between h-15 sm:h-16">
            
            {/* Left Trigger & Brand Logo */}
            <div className="flex items-center space-x-3">
              {isAuthenticated && (
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <button
                      className="text-primary hover:text-primary-hover cursor-pointer p-1 focus:outline-none transition-transform active:scale-95"
                      aria-label="Open Concierge Menu"
                    >
                      <Menu className="h-6 w-6" />
                    </button>
                  </SheetTrigger>
                  
                  <SheetContent
                    side="left"
                    className="custom-sheet-width p-0 z-100 bg-brand-bg transition-all duration-300 w-[290px] sm:w-[350px] fixed left-0 top-0 h-full text-text-dark border-r border-amber-200/70"
                  >
                    <div className="flex flex-col h-full bg-brand-bg">
                      
                      {/* User Profile Header */}
                      <div className="flex flex-col items-center pt-7 pb-5 px-5 bg-card-beige border-b border-amber-200/70">
                        {/* Emblem Badge */}
                        <div className="flex items-center space-x-1.5 mb-3">
                          <div className="w-4 h-4 rounded-xs border border-primary flex items-center justify-center bg-white/60">
                            <span className="font-serif font-bold text-[10px] text-primary leading-none">H</span>
                          </div>
                          <span className="font-serif tracking-widest text-primary font-semibold text-[10px] uppercase">
                            NH Hotel Concierge
                          </span>
                        </div>

                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full border-2 border-primary bg-white shadow-sm flex items-center justify-center mb-2 text-primary">
                          <User className="w-8 h-8 text-primary" />
                        </div>

                        <div className="text-base font-serif font-bold text-text-dark">
                          {user?.name || "160****052"}
                        </div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5">
                          UID: {localStorage.getItem("userId") || user?.userId || "138334"}
                        </div>

                        {/* Cash In Button */}
                        <button className="mt-4 w-full bg-secondary hover:bg-secondary-hover text-white py-2.5 rounded-xl font-serif font-bold text-xs transition-all shadow-md active:scale-99 flex items-center justify-center gap-1.5 cursor-pointer">
                          <Building2 className="w-4 h-4 text-amber-200" />
                          <span>Cash In</span>
                        </button>
                      </div>

                      {/* Quick Actions Bar */}
                      <div className="grid grid-cols-3 gap-2 px-5 py-3 border-b border-amber-200/50 bg-white">
                        <Link to="/cash-out" onClick={handleMenuItemClick} className="flex flex-col items-center justify-center gap-1 py-1 group">
                          <div className="w-9 h-9 rounded-xl bg-amber-50 group-hover:bg-primary group-hover:text-white text-slate-800 flex items-center justify-center transition-all duration-200 border border-amber-100/80">
                            <TbCurrencyTaka className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-serif font-medium text-slate-800 text-center">Cash Out</span>
                        </Link>

                        <Link to="/contact" onClick={handleMenuItemClick} className="flex flex-col items-center justify-center gap-1 py-1 group border-x border-slate-100">
                          <div className="w-9 h-9 rounded-xl bg-amber-50 group-hover:bg-primary group-hover:text-white text-slate-800 flex items-center justify-center transition-all duration-200 border border-amber-100/80">
                            <Mail className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-serif font-medium text-slate-800 text-center">Contact us</span>
                        </Link>

                        <button
                          onClick={handleAccountDetailsClick}
                          className="flex flex-col items-center justify-center gap-1 py-1 cursor-pointer group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-amber-50 group-hover:bg-primary group-hover:text-white text-slate-800 flex items-center justify-center transition-all duration-200 border border-amber-100/80">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-serif font-medium text-slate-800 text-center">Account details</span>
                        </button>
                      </div>

                      {/* Menu Items Stack */}
                      <div className="flex-1 overflow-y-auto bg-white divide-y divide-amber-100/70">
                        <Link to="/bind-account" onClick={handleMenuItemClick} className="block">
                          <MenuItem icon={<CreditCard className="w-4 h-4 text-primary" />} text="Bind Account" />
                        </Link>
                        <Link to="/check-in" onClick={handleMenuItemClick} className="block">
                          <MenuItem icon={<LogIn className="w-4 h-4 text-primary" />} text="Check In" />
                        </Link>
                        <Link to="/history" onClick={handleMenuItemClick} className="block">
                          <MenuItem icon={<MdHistory className="w-4 h-4 text-primary" />} text="History" />
                        </Link>
                        <Link to="/forgot-password" onClick={handleMenuItemClick} className="block">
                          <MenuItem icon={<Settings className="w-4 h-4 text-primary" />} text="Change Password" />
                        </Link>
                        <Link to="/help" onClick={handleMenuItemClick} className="block">
                          <MenuItem icon={<HelpCircle className="w-4 h-4 text-primary" />} text="Help" />
                        </Link>
                        <Link to="/about" onClick={handleMenuItemClick} className="block">
                          <MenuItem icon={<Info className="w-4 h-4 text-primary" />} text="About Us" />
                        </Link>
                      </div>

                      {/* Sign Out Section */}
                      <div className="p-4 border-t border-amber-200/60 bg-brand-bg">
                        <button
                          className="w-full cursor-pointer py-2.5 border border-red-500/80 text-red-600 rounded-xl font-bold text-xs hover:bg-red-50 transition-all shadow-2xs active:scale-99"
                          onClick={handleLogOut}
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )}

              {/* Brand Logo & Name */}
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary text-white flex items-center justify-center font-serif font-black text-xs sm:text-sm shadow-xs border border-amber-200/80 group-hover:scale-105 transition-transform">
                  NH
                </div>
                <span className="font-serif font-bold text-lg sm:text-xl text-text-dark tracking-tight">
                  NH HOTEL
                </span>
              </Link>
            </div>

            {/* Right Icons / Balance Badge */}
            <div className="flex items-center space-x-2">
              {isAuthenticated && (
                <div className="bg-amber-100/70 border border-amber-200 text-primary font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                  <span className="text-[10px] text-slate-500 font-light">Bal:</span>
                  <span>৳{user?.userBalance ? user.userBalance.toFixed(0) : "0"}</span>
                </div>
              )}

              <Link
                to="/event"
                className="text-primary hover:text-primary-hover p-1.5 rounded-lg hover:bg-amber-100/50 transition-colors"
                title="Events"
              >
                <MdEvent className="w-5 h-5" />
              </Link>
              
              <Link
                to="/score"
                className="text-primary hover:text-primary-hover p-1.5 rounded-lg hover:bg-amber-100/50 transition-colors"
                title="Score"
              >
                <MdEmojiEvents className="w-5 h-5" />
              </Link>

              <button
                onClick={toggleMobileMenu}
                type="button"
                className="text-text-dark hover:text-primary focus:outline-none p-1 sm:hidden"
                aria-label="Toggle Navigation"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-amber-200/60 bg-white px-3 py-2 space-y-1">
            <Link
              to="/event"
              className="block px-3 py-2 rounded-xl text-xs font-serif font-semibold text-text-dark hover:bg-amber-50"
            >
              Hotel Events
            </Link>
            <Link
              to="/score"
              className="block px-3 py-2 rounded-xl text-xs font-serif font-semibold text-text-dark hover:bg-amber-50"
            >
              VIP Score & Achievements
            </Link>
          </div>
        )}
      </nav>

      {/* Account Details Modal */}
      <AccountDetailsModal
        open={openAccountModal}
        onClose={() => setOpenAccountModal(false)}
        data={accountDetailsData}
      />
    </>
  );
};

// Reusable Menu Item Component
const MenuItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 hover:bg-amber-50/50 cursor-pointer transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-1 rounded-md bg-amber-50">{icon}</div>
        <span className="text-text-dark text-xs sm:text-sm font-serif font-medium">{text}</span>
      </div>
      <span className="text-primary font-light text-lg">+</span>
    </div>
  );
};

export default Navbar;