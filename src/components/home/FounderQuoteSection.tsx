import React from "react";

const FOUNDER_IMAGE = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80";

const FounderQuoteSection: React.FC = () => {
  return (
    <section className="w-full bg-brand-bg py-6 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-card-beige border border-amber-200/50 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          
          {/* Founder Image & Signature */}
          <div className="flex flex-col items-center flex-shrink-0 relative">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={FOUNDER_IMAGE}
                alt="Kennedy - Founder of NOVA Hotel"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Signature Overlay */}
            <span className="font-signature text-3xl sm:text-4xl text-primary -mt-5 z-10 select-none tracking-wide">
              Kennedy
            </span>
          </div>

          {/* Vertical Divider (Hidden on mobile) */}
          <div className="hidden md:block w-[1px] h-32 bg-amber-300/50 flex-shrink-0" />

          {/* Quote Content */}
          <div className="flex-1 text-center md:text-left relative px-2">
            <span className="text-primary font-serif text-4xl leading-none absolute -top-4 -left-2 md:-left-4 opacity-80 select-none">
              “
            </span>
            <p className="font-serif italic text-slate-700 text-sm sm:text-base leading-relaxed px-4 pt-1 pb-1">
              I established NOVA Hotel to bring true luxury to a select number of clients - a gold-standard concierge service and genuine expertise, delivered by only the best professionals in the industry.
            </p>
            <span className="text-primary font-serif text-4xl leading-none absolute -bottom-6 right-2 opacity-80 select-none">
              ”
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderQuoteSection;
