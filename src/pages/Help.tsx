import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Help() {
  return (
    <div className="min-h-screen bg-brand-bg text-text-dark">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center text-sm text-slate-500">
          <Link to="/account" className="hover:text-text-dark cursor-pointer">
            Account
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-text-dark font-medium">Help</span>
        </div>
      </div>

      {/* Hero Section with Color Image */}
      {/*<div className="relative h-72 sm:h-80 overflow-hidden rounded-3xl mx-4 shadow-xl">
        <img
          src={helpImage}
          alt="NOVA Hotel Concierge"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/80 via-brand-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 via-transparent to-brand-bg/30" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span className="font-serif tracking-widest text-primary font-semibold text-xs uppercase">
                Support
              </span>
            </div>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl text-text-dark tracking-tight">
              Help & Support
            </h1>
            <p className="text-slate-600 text-sm mt-2">
              NOVA Hotel Concierge Services
            </p>
          </div>
        </div>
      </div>*/}

      {/* Accordion Section */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Accordion type="single" collapsible className="w-full space-y-3">
          <AccordionItem
            value="agent"
            className="bg-white rounded-2xl border border-amber-200/60 shadow-sm px-6"
          >
            <AccordionTrigger className="py-5 text-lg font-serif font-bold text-text-dark hover:no-underline">
              1. About Agent Mode
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                Agent Mode allows users to manage bookings and transactions
                through a dedicated concierge interface.
              </p>
              <p>
                Access exclusive agent tools for faster processing and priority
                support.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="withdrawal"
            className="bg-white rounded-2xl border border-amber-200/60 shadow-sm px-6"
          >
            <AccordionTrigger className="py-5 text-lg font-serif font-bold text-text-dark hover:no-underline">
              2. About Withdrawal
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                Bind your bank account before submitting withdrawal requests.
              </p>
              <p>Cash Out time is from 10:00 AM to 10:00 PM daily.</p>
              <p>Maximum withdrawal amount is 10,000,000 taka.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="booking"
            className="bg-white rounded-2xl border border-amber-200/60 shadow-sm px-6"
          >
            <AccordionTrigger className="py-5 text-lg font-serif font-bold text-text-dark hover:no-underline">
              3. About More Booking
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm text-slate-600 leading-relaxed space-y-3">
              <p>Complete orders to unlock additional booking privileges.</p>
              <p>
                Higher order counts provide access to premium reservation tiers.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="mission"
            className="bg-white rounded-2xl border border-amber-200/60 shadow-sm px-6"
          >
            <AccordionTrigger className="py-5 text-lg font-serif font-bold text-text-dark hover:no-underline">
              4. About Mission
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                NOVA Hotel is committed to delivering luxury concierge services.
              </p>
              <p>Our mission is to provide gold-standard travel experiences.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="us"
            className="bg-white rounded-2xl border border-amber-200/60 shadow-sm px-6"
          >
            <AccordionTrigger className="py-5 text-lg font-serif font-bold text-text-dark hover:no-underline">
              5. About Us
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                NOVA Hotel is a premium travel service for high-end travelers.
              </p>
              <p>
                Established by luxury travel pioneers, we craft exceptional
                experiences.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
