import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, ClipboardList, User } from "lucide-react";

const Footer: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const isAuthenticated = !!localStorage.getItem("accessToken");

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: (
        <div className="relative flex items-center justify-center">
          <Home className="w-5 h-5 sm:w-6 sm:h-6 text-[#2b6cb0] fill-[#3182ce]/20" />
        </div>
      ),
      isActive: path === "/" || path === "/index",
    },
    {
      name: "Information",
      path: "/about",
      icon: (
        <div className="relative flex items-center justify-center">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#2b6cb0]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full border border-[#b58a4b]" />
        </div>
      ),
      isActive: path === "/help" || path === "/about" || path === "/services" || path === "/contact",
    },
    {
      name: "Reservation",
      path: "/task",
      icon: (
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm border-2 border-white bg-[#b58a4b] shadow-xs flex items-center justify-center">
          <span className="font-serif font-black text-[10px] sm:text-xs text-white leading-none tracking-tighter">
            NH
          </span>
        </div>
      ),
      isActive: path === "/task" || path === "/check-in",
    },
    {
      name: "History",
      path: "/order-record",
      icon: (
        <div className="relative flex items-center justify-center">
          <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6 text-[#2b6cb0]" />
          <span className="absolute -bottom-0.5 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
        </div>
      ),
      isActive: path === "/order-record" || path === "/history",
    },
    {
      name: "Account",
      path: isAuthenticated ? "/account" : "/login",
      icon: (
        <div className="relative flex items-center justify-center">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#2b6cb0]" />
        </div>
      ),
      isActive: path === "/account" || path === "/bind-account" || path === "/login" || path === "/signup",
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 max-w-[500px] mx-auto w-full bg-[#b58a4b] border-t-2 border-amber-200/60 shadow-2xl">
      <nav className="grid grid-cols-5 h-16 sm:h-18 items-center px-1">
        {navItems.map((item) => {
          const active = item.isActive;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-1 transition-all duration-150 active:scale-95 ${
                active ? "opacity-100 font-bold" : "opacity-90 hover:opacity-100 font-medium"
              }`}
            >
              {/* Icon Container */}
              <div className="mb-0.5 flex items-center justify-center h-7">
                {item.icon}
              </div>

              {/* Label */}
              <span
                className={`text-[11px] sm:text-xs tracking-tight transition-colors ${
                  active ? "text-[#1d4ed8] font-bold" : "text-[#2563eb] font-semibold"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

export default Footer;
