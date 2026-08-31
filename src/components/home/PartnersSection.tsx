import React from "react";

interface Partner {
  id: string;
  name: string;
  logo: React.ReactNode;
}

const PARTNERS: Partner[] = [
  {
    id: "marriott",
    name: "Marriott",
    logo: (
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-[#b01b2e] font-black text-2xl leading-none">M</span>
        <span className="text-text-dark uppercase tracking-widest text-[10px] sm:text-xs font-bold mt-1">
          MARRIOTT
        </span>
      </div>
    ),
  },
  {
    id: "sheraton",
    name: "Sheraton",
    logo: (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center mb-0.5">
          <span className="font-serif font-bold text-xs text-slate-800">S</span>
        </div>
        <span className="text-slate-800 uppercase tracking-widest text-[10px] sm:text-xs font-semibold">
          SHERATON
        </span>
        <span className="text-[8px] text-slate-400 font-light">EST. 1937</span>
      </div>
    ),
  },
  {
    id: "holiday-inn",
    name: "Holiday Inn",
    logo: (
      <div className="flex items-center justify-center space-x-1.5">
        <div className="w-7 h-7 bg-[#238823] text-white font-bold rounded-xs flex items-center justify-center text-lg italic">
          H
        </div>
        <span className="text-[#238823] font-bold text-xs sm:text-sm italic tracking-tight">
          Holiday Inn
        </span>
      </div>
    ),
  },
  {
    id: "conrad",
    name: "Conrad Hotels & Resorts",
    logo: (
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-primary tracking-[0.25em] uppercase font-serif font-bold text-xs sm:text-sm">
          CONRAD
        </span>
        <span className="text-[8px] sm:text-[9px] text-primary tracking-widest uppercase font-light">
          HOTELS & RESORTS
        </span>
      </div>
    ),
  },
  {
    id: "radisson",
    name: "Radisson",
    logo: (
      <div className="flex flex-col items-center justify-center text-center">
        <span className="font-serif italic font-bold text-base sm:text-lg text-slate-900 leading-tight">
          Radisson
        </span>
        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">
          HOTELS & RESORTS
        </span>
      </div>
    ),
  },
  {
    id: "accor",
    name: "Accor",
    logo: (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-primary font-serif font-extrabold text-lg leading-none">A</div>
        <span className="text-primary tracking-[0.2em] uppercase font-bold text-xs sm:text-sm mt-0.5">
          ACCOR
        </span>
      </div>
    ),
  },
  {
    id: "hyatt",
    name: "Hyatt",
    logo: (
      <div className="flex items-center justify-center">
        <span className="font-serif tracking-[0.25em] text-[#1c4d8d] font-extrabold text-sm sm:text-base">
          HYATT
        </span>
      </div>
    ),
  },
  {
    id: "hilton",
    name: "Hilton",
    logo: (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-6 h-6 rounded-t-full border-2 border-[#00246B] flex items-center justify-center mb-0.5">
          <span className="font-serif font-bold text-xs text-[#00246B]">H</span>
        </div>
        <span className="text-[#00246B] font-serif font-bold tracking-widest text-xs sm:text-sm">
          Hilton
        </span>
      </div>
    ),
  },
];

const PartnersSection: React.FC = () => {
  return (
    <section className="w-full bg-brand-bg py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center justify-center space-x-3 w-full max-w-xs mb-8">
          <div className="h-[1px] bg-primary/60 flex-1" />
          <span className="text-primary tracking-[0.25em] text-xs sm:text-sm font-medium uppercase">
            Our Partners
          </span>
          <div className="h-[1px] bg-primary/60 flex-1" />
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="bg-white border border-amber-100/80 rounded-2xl p-4 flex items-center justify-center min-h-[95px] sm:min-h-[105px] shadow-xs hover:shadow-md transition-all duration-200"
            >
              {partner.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
