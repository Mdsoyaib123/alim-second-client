import React from "react";

const HomeFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card-beige border-t border-amber-200/50 py-6 text-center text-xs sm:text-sm text-slate-500 font-light tracking-wide">
      Copyright © {currentYear} NOVA Hotel. All Right Reserved
    </footer>
  );
};

export default HomeFooter;
