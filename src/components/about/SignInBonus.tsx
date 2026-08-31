import React from "react";

interface BonusDay {
  day: string;
  amount: string;
}

const BONUS_DAYS: BonusDay[] = [
  { day: "1st Day", amount: "10 USDT" },
  { day: "2nd Day", amount: "20 USDT" },
  { day: "3rd Day", amount: "30 USDT" },
  { day: "4th Day", amount: "40 USDT" },
  { day: "5th Day", amount: "50 USDT" },
  { day: "6th Day", amount: "60 USDT" },
  { day: "7th Day", amount: "70 USDT" },
];

const SignInBonus: React.FC = () => {
  return (
    <section className="w-full py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-[#faf5ed] border border-amber-200/60 rounded-3xl p-5 sm:p-6 shadow-xs">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-4 border-b border-amber-200/50 pb-3">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1a2332]">
            7 Day Sign In Bonus
          </h3>
          <span className="text-amber-500 text-lg">⭐</span>
        </div>

        {/* Bonus Items List */}
        <div className="space-y-2">
          {BONUS_DAYS.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-white/90 rounded-xl p-3 px-4 border border-amber-100 shadow-2xs hover:border-amber-300 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-full bg-[#b58a4b]/15 text-[#b58a4b] font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-slate-700 text-xs sm:text-sm font-medium">
                  {item.day}
                </span>
              </div>
              <span className="font-serif font-bold text-xs sm:text-sm text-[#b58a4b] bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignInBonus;
