import React from "react";

const ACCOR_HERO =
  "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80";
const MORE_SUB_1 =
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80";
const MORE_SUB_2 =
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80";

const MoreHotels: React.FC = () => {
  return (
    <section className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-text-dark">
            More Hotels
          </h3>
          {/*<span className="text-xs text-slate-500 font-light cursor-pointer hover:text-[#b58a4b]">
            Direct recommendation / view
          </span>*/}
        </div>

        {/* Main Large Feature Banner */}
        <div className="relative rounded-md overflow-hidden shadow-md mb-3 h-80 sm:h-96 group">
          <img
            src={ACCOR_HERO}
            alt="Accor Hotel"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5">
            {/* Logo Badge */}
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg w-max mb-2">
              <span className="text-[#b58a4b] font-serif font-bold text-lg">
                A
              </span>
              <span className="text-white text-xs sm:text-sm font-semibold tracking-widest uppercase border-l border-white/40 pl-2">
                Accor Hotel
              </span>
            </div>
            <p className="text-slate-200 text-xs sm:text-sm font-light max-w-lg">
              Bespoke luxury stays, private villas, and personalized guest
              services worldwide.
            </p>
          </div>
        </div>

        {/* Sub Feature Cards (2 grid columns) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="relative rounded-xl overflow-hidden shadow-xs h-28 sm:h-36 group">
            <img
              src={MORE_SUB_1}
              alt="Presidential Suite"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <span>⭐</span>
              <span>4.8 / 5.0</span>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-xs h-28 sm:h-36 group">
            <img
              src={MORE_SUB_2}
              alt="Executive Lounge"
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

export default MoreHotels;
