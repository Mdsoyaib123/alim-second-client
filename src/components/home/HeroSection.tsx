import React from "react";
import { Calendar } from "lucide-react";
import PartnerLogosRibbon from "./PartnerLogosRibbon";
import { useAppSelector } from "@/hooks/useRedux";
import { useGetSingleUserQuery } from "@/store/api/user/userApi";

const PARIS_SUNSET_HERO =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80";

interface HeroSectionProps {
  onReservationClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onReservationClick }) => {
  const token =
    useAppSelector((state) => state.auth?.token) ||
    localStorage.getItem("accessToken");
  const id = localStorage.getItem("userId");
  const userId = id ? parseInt(id) : 0;

  const { data: userData } = useGetSingleUserQuery(userId, {
    skip: !token || !userId,
  });

  const userName = userData?.data?.name || "ishak11";

  return (
    <div className="relative w-full bg-brand-bg text-text-dark">
      {/* Top Banner with Unsplash Background */}
      <div className="relative min-h-120 sm:min-h-130 w-full flex flex-col justify-between overflow-hidden">
        {/* Unsplash Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={PARIS_SUNSET_HERO}
            alt="Paris Skyline at Sunset"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay to enhance readability on text side */}
          <div className="absolute inset-0 bg-linear-to-r from-brand-bg/90 via-brand-bg/60 to-transparent sm:w-3/4" />
          <div className="absolute inset-0 bg-linear-to-b from-brand-bg/40 via-transparent to-brand-bg" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 pt-6 sm:pt-8 pb-12 flex flex-col items-start max-w-5xl">
          {/* Logo Badge */}
          <div className="flex items-center gap-2.5 mb-8 sm:mb-10">
            <div className="w-8 h-8 sm:w-9 sm:h-9 border-2 border-primary rounded-sm flex items-center justify-center bg-white/40 backdrop-blur-xs shadow-xs">
              <span className="font-serif font-bold text-primary text-base sm:text-lg leading-none">
                H
              </span>
            </div>
            <span className="font-serif tracking-widest text-primary-hover font-semibold text-base sm:text-lg">
              NH HOTEL
            </span>
          </div>

          {/* Greeting Section */}
          <div className="max-w-md">
            <p className="font-serif italic text-primary text-xl sm:text-2xl font-light mb-0.5">
              Welcome,
            </p>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-text-dark tracking-tight">
              {userName}
            </h1>

            {/* Gold horizontal accent line */}
            <div className="w-14 h-0.75 bg-primary rounded-full my-4" />

            <p className="text-slate-700 text-sm sm:text-base font-medium mb-2 leading-relaxed">
              Achievement is a testament to excellent
            </p>
            <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed font-normal">
              Reservations are Welcome Contact your referral today to learn more
              about our benefits !
            </p>

            {/* Make a Reservation Button */}
            <button
              onClick={onReservationClick}
              className="bg-primary hover:bg-primary-hover active:scale-97 text-white font-medium px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2.5 cursor-pointer text-sm sm:text-base"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-100" />
              <span>Make a Reservation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Travel Partners Ribbon */}
      <PartnerLogosRibbon />
    </div>
  );
};

export default HeroSection;
