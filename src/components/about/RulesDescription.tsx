import React from "react";

const POOL_BANNER =
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80";

const RULES = [
  "In order to prevent malicious use or a series of illegal behaviors, the platform has established a set-up operation process user instructions. Users can start the assignment after completing the booking. Post-completing the booking every day, the earnings can be withdrawn to the bound Bank Account, Trx, usdt.",
  "Each user/member can only register one account.",
  "Users can submit reservations 22 times/day or according to their tier when using funds.",
  "Unfinished booking logic is assigned by the system, so non-attending to execution status is not changed, cancelled, or skipped.",
  "User order cancellation will cause reservation block and account profile freeze.",
  "The platform operating hours are 10:00am - 22:00pm every day. Customer service operates during standard operating hours.",
  "To submit orders, please do not register for a second account using the same personal information or IP and mac-login.",
  "The platform only allows the owner of the account to operate, when people borrow account funds it will cause the freeze of the account.",
  "When you encountered a high value booking, please contact online customer service for high-volume system reserve asset processing.",
];

const RulesDescription: React.FC = () => {
  return (
    <section className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-4">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-text-dark uppercase tracking-wide">
            Rules Description
          </h3>
          <span className="text-amber-500 text-lg">⭐</span>
        </div>

        {/* Poolside Banner Image */}
        <div className="rounded-md overflow-hidden shadow-sm h-48 sm:h-64 mb-6">
          <img
            src={POOL_BANNER}
            alt="Luxury Poolside Resort"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Rules List */}
        <div className="space-y-3.5 bg-white border border-amber-100 rounded-md p-5 sm:p-6 shadow-xs">
          {RULES.map((rule, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 text-slate-700 text-xs sm:text-sm leading-relaxed"
            >
              <span className="font-bold text-[#b58a4b] min-w-5">
                {idx + 1}.
              </span>
              <p className="font-light">{rule}</p>
            </div>
          ))}

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs italic text-slate-500 font-light">
            Please feel free to contact us if you have any questions or
            concerns.
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesDescription;
