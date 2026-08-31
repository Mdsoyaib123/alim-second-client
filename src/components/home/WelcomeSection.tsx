import React from "react";

const WelcomeSection: React.FC = () => {
  return (
    <section className="w-full bg-[#fdfbf7] py-12 sm:py-16 px-6 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Section Header with Side Lines */}
        <div className="flex items-center justify-center space-x-3 w-full max-w-xs mb-2">
          <div className="h-[1px] bg-[#b58a4b]/60 flex-1" />
          <span className="text-[#b58a4b] tracking-[0.25em] text-xs sm:text-sm font-medium uppercase">
            Welcome To
          </span>
          <div className="h-[1px] bg-[#b58a4b]/60 flex-1" />
        </div>

        {/* Main Title */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a2332] mb-6 tracking-tight">
          NH Hotel
        </h2>

        {/* Description Paragraphs */}
        <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
          <p>
            Nh Hotel is a premium travel service exclusively for the high end traveller. Established by luxury travel pioneer, Geoff Moss, our philosophy is that luxury travel is part of a luxury lifestyle.
          </p>
          <p>
            With our team of dedicated Travel Managers, every one of our clients receives the highest level of travel concierge. We meticulously craft every holiday , with our network of ultra - luxury hotels, VIP private travel providers and access to only the finest experiences. Wherever the destination , our gold-standard service takes care of every last details - the true value of luxury.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
