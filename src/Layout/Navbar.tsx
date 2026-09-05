import { useState } from "react";
// import {
//   Menu,
//   User,
//   Mail,
//   CreditCard,
//   LogIn,
//   HelpCircle,
//   Info,
//   Settings,
//   Building2,
// } from "lucide-react";
// import { MdHistory, MdEvent, MdEmojiEvents } from "react-icons/md";
// import { TbCurrencyTaka } from "react-icons/tb";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/useRedux";
// import { logout } from "@/store/Slices/AuthSlice/authSlice";
import { useGetSingleUserQuery } from "@/store/api/user/userApi";
import AccountDetailsModal from "@/components/modal/AccountDetailsModal";
import "./Navbar.css";

const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);

  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();

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

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // };

  // Close sheet when route changes
  // useEffect(() => {
  //   setIsOpen(false);
  //   setIsMobileMenuOpen(false);
  // }, [location.pathname]);

  // const handleLogOut = () => {
  //   setIsOpen(false);
  //   dispatch(logout());
  //   navigate("/login", { replace: true });
  // };

  // const handleMenuItemClick = () => {
  //   setIsOpen(false);
  // };

  // const handleAccountDetailsClick = () => {
  //   setIsOpen(false);
  //   setOpenAccountModal(true);
  // };

  return (
    <>
      <nav className="bg-card-beige border-b border-amber-200/70 shadow-2xs w-full sticky top-0 z-40">
        <div className="max-w-125 mx-auto px-4">
          <div className="flex items-center justify-between h-15 sm:h-16">
            {/* Left Trigger & Brand Logo */}
            <div className="flex items-center space-x-3">
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
                  <span className="text-[10px] text-slate-500 font-light">
                    Bal:
                  </span>
                  <span>
                    ৳{user?.userBalance ? user.userBalance.toFixed(0) : "0"}
                  </span>
                </div>
              )}

              {/*<Link
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
              </Link>*/}

              {/*<button
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
              </button>*/}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {/*{isMobileMenuOpen && (
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
        )}*/}
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
// const MenuItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
//   return (
//     <div className="flex items-center justify-between px-5 py-3.5 hover:bg-amber-50/50 cursor-pointer transition-colors">
//       <div className="flex items-center gap-3">
//         <div className="p-1 rounded-md bg-amber-50">{icon}</div>
//         <span className="text-text-dark text-xs sm:text-sm font-serif font-medium">
//           {text}
//         </span>
//       </div>
//       <span className="text-primary font-light text-lg">+</span>
//     </div>
//   );
// };

export default Navbar;
