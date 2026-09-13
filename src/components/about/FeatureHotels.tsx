import React from "react";

const FEATURE_HERO =
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80";
const SUB_CARD_1 =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80";
const SUB_CARD_2 =
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80";

const FeatureHotels: React.FC = () => {
  return (
    <section className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-text-dark">
            Feature Hotel
          </h3>
          {/*<span className="text-xs text-slate-500 font-light cursor-pointer hover:text-[#b58a4b]">
            Direct recommendation / view
          </span>*/}
        </div>

        {/* Main Large Feature Banner */}
        <div className="relative rounded-md overflow-hidden shadow-md mb-3 h-80 sm:h-96 group">
          <img
            src={FEATURE_HERO}
            alt="IHG InterContinental Hotel"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5">
            {/* Logo Badge */}
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg w-max mb-2">
              <span className="text-[#e60000] font-black text-base sm:text-lg tracking-wider">
                IHG
              </span>
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wide border-l border-white/40 pl-2">
                InterContinental Hotel
              </span>
            </div>
            <p className="text-slate-200 text-xs sm:text-sm font-light max-w-lg">
              World-class luxury accommodations with premium concierge and
              dining experiences.
            </p>
          </div>
        </div>

        {/* Sub Feature Cards (2 grid columns) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="relative rounded-md overflow-hidden shadow-xs h-28 sm:h-36 group">
            <img
              src={SUB_CARD_1}
              alt="Luxury Suite"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <span>⭐</span>
              <span>4.8 / 5.0</span>
            </div>
          </div>

          <div className="relative rounded-md overflow-hidden shadow-xs h-28 sm:h-36 group">
            <img
              src={SUB_CARD_2}
              alt="Resort Entrance"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <span>⭐</span>
              <span>4.9 / 5.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHotels;
