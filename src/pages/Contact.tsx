import React from "react";
import { BsTelegram } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { ArrowLeft, Headset, MessageSquare, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Contact: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-bg max-w-[500px] mx-auto pb-24 text-text-dark">
      {/* Sticky Top Header with Back Button */}
      <div className="bg-white border-b border-amber-100 px-4 py-3.5 sticky top-0 z-20 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/account")}
            className="text-slate-600 hover:text-slate-900 transition-colors p-1"
            aria-label="Go back to Account"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-serif font-bold text-text-dark leading-tight">
              Concierge Support
            </h1>
            <p className="text-[11px] text-slate-400 font-light">
              NH Hotel 24/7 Guest Services
            </p>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="p-4">
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-52 sm:h-60 shadow-sm flex items-center justify-center text-center">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
            alt="NH Hotel Concierge Desk"
            className="absolute inset-0 w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

          <div className="relative z-10 px-6 py-4 max-w-md">
            <span className="font-serif italic text-amber-200 text-xs sm:text-sm">Exclusive Service</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mt-0.5 mb-2">
              NH Hotel Help Center
            </h2>
            <p className="text-amber-100/90 text-xs sm:text-sm font-light leading-relaxed">
              Our 24/7 dedicated travel managers and hotel concierge team are here to assist you with reservations, cash-ins, exclusive bookings, and custom travel arrangements.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Service Support Channels */}
      <div className="px-4 space-y-4">
        <div className="flex items-center space-x-2">
          <Headset className="w-5 h-5 text-primary" />
          <h3 className="font-serif font-bold text-base sm:text-lg text-text-dark">
            Direct Concierge Channels
          </h3>
        </div>

        {/* Telegram Card */}
        <div className="bg-white rounded-2xl p-5 border border-amber-100/80 shadow-2xs hover:shadow-xs transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0088cc]">
                <BsTelegram className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-text-dark">Telegram Customer Service</h4>
                <p className="text-xs text-slate-400 font-light">Online Concierge & Cash-In Support</p>
              </div>
            </div>

            <a
              href="https://t.me/OfficialCustomerservice_00"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0088cc] hover:bg-[#0077b3] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-2xs active:scale-95 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Connect</span>
            </a>
          </div>
        </div>

        {/* WhatsApp Card */}
        <div className="bg-white rounded-2xl p-5 border border-amber-100/80 shadow-2xs hover:shadow-xs transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#25D366]">
                <IoLogoWhatsapp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-text-dark">WhatsApp Customer Service</h4>
                <p className="text-xs text-slate-400 font-light">Direct Hotel Manager Hotline</p>
              </div>
            </div>

            <a
              href="https://t.me/OfficialCustomerservice_00"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-2xs active:scale-95 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Connect</span>
            </a>
          </div>
        </div>

        {/* Service Operating Hours Notice */}
        <div className="bg-card-beige rounded-2xl p-4 border border-amber-200/60 shadow-2xs flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
          <div className="text-xs text-slate-600 font-light leading-relaxed">
            <span className="font-serif font-bold text-text-dark block">Concierge Desk Operating Hours</span>
            Our online customer service operates from <strong className="text-primary font-bold">10:00 AM to 10:00 PM</strong> daily.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;