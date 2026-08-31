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
      icon: (active: boolean) => (
        <Home
          className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${active ? "text-primary fill-primary/15" : "text-slate-400"}`}
        />
      ),
      isActive: path === "/" || path === "/index",
    },
    {
      name: "Information",
      path: "/about",
      icon: (active: boolean) => (
        <div className="relative flex items-center justify-center">
          <FileText
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${active ? "text-primary" : "text-slate-400"}`}
          />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full" />
        </div>
      ),
      isActive:
        path === "/help" ||
        path === "/about" ||
        path === "/services" ||
        path === "/contact",
    },
    {
      name: "Reservation",
      path: "/task",
      icon: (active: boolean) => (
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 flex items-center justify-center transition-all shadow-2xs ${
            active
              ? "border-primary bg-primary text-white shadow-xs scale-105"
              : "border-amber-200/80 bg-amber-50/60 text-primary"
          }`}
        >
          <span className="font-serif font-black text-[11px] sm:text-xs leading-none tracking-tighter">
            NH
          </span>
        </div>
      ),
      isActive: path === "/task" || path === "/check-in",
    },
    {
      name: "History",
      path: "/order-record",
      icon: (active: boolean) => (
        <div className="relative flex items-center justify-center">
          <ClipboardList
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${active ? "text-primary" : "text-slate-400"}`}
          />
          <span className="absolute -bottom-0.5 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
        </div>
      ),
      isActive: path === "/order-record" || path === "/history",
    },
    {
      name: "Account",
      path: isAuthenticated ? "/account" : "/login",
      icon: (active: boolean) => (
        <User
          className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${active ? "text-primary" : "text-slate-400"}`}
        />
      ),
      isActive:
        path === "/account" ||
        path === "/bind-account" ||
        path === "/login" ||
        path === "/signup",
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 max-w-[500px] mx-auto w-full bg-white/95 backdrop-blur-md border-t border-amber-200/80 shadow-2xl">
      <nav className="grid grid-cols-5 h-16 sm:h-18 items-center px-1">
        {navItems.map((item) => {
          const active = item.isActive;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-1 transition-all duration-150 active:scale-95 group relative ${
                active ? "opacity-100" : "opacity-80 hover:opacity-100"
              }`}
            >
              {/* Top Active Bar Indicator */}
              {active && (
                <span className="absolute top-0 w-8 h-[2.5px] bg-primary rounded-full" />
              )}

              {/* Icon */}
              <div className="mb-0.5 flex items-center justify-center h-7">
                {item.icon(active)}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] sm:text-[11px] tracking-tight transition-colors ${
                  active
                    ? "text-primary font-bold"
                    : "text-slate-500 font-medium group-hover:text-slate-800"
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
