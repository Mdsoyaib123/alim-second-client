import React from "react";

const PartnerLogosRibbon: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 -mt-8 relative z-20">
      <div className="bg-white/95 backdrop-blur-md rounded-md shadow border border-amber-100/60 p-4 sm:p-5 flex items-center justify-around flex-wrap gap-4 sm:gap-6 transition-all duration-300">
        {/* Trivago */}
        <div className="flex items-center justify-center space-x-0.5 font-bold text-lg sm:text-xl tracking-tight">
          <span className="text-[#007faf]">tri</span>
          <span className="text-[#e60000]">va</span>
          <span className="text-[#e06d00]">go</span>
        </div>

        {/* Expedia */}
        <div className="flex items-center space-x-1.5 font-bold text-base sm:text-lg text-[#00355f]">
          <span className="bg-[#ffcc00] text-[#00355f] p-1 rounded-full text-xs flex items-center justify-center w-5 h-5 font-black">
            ✈
          </span>
          <span className="tracking-tight">Expedia</span>
        </div>

        {/* EGENCIA */}
        <div className="flex items-center space-x-1.5 font-bold text-base sm:text-lg text-[#13294b]">
          <span className="text-[#f1a80a] text-lg font-black leading-none">
            ❯
          </span>
          <span className="tracking-wider uppercase text-sm sm:text-base font-extrabold">
            EGENCIA
          </span>
        </div>

        {/* Travelocity */}
        <div className="flex items-center space-x-1 font-bold text-base sm:text-lg text-[#004e87]">
          <span className="text-[#00a8e8] text-base">✴</span>
          <span className="tracking-tight lowercase text-sm sm:text-base font-semibold">
            travelocity
          </span>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogosRibbon;
