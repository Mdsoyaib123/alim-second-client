import PopularHotels from "@/components/about/PopularHotels";
import FeatureHotels from "@/components/about/FeatureHotels";
import MoreHotels from "@/components/about/MoreHotels";
import SignInBonus from "@/components/about/SignInBonus";
import RulesDescription from "@/components/about/RulesDescription";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const ABOUT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-brand-bg text-text-dark">
      {/* Top Banner with Background Image & Text Overlay */}
      <div className="relative h-64 sm:h-80 bg-slate-900 overflow-hidden">
        <img
          src={ABOUT_HERO_IMAGE}
          alt="Luxury Hotel Room"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/30" />

        <div className="relative h-full max-w-2xl mx-auto px-6 flex flex-col items-center justify-center text-center">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
            About Us
          </h1>
          <p className="text-amber-100/90 text-xs sm:text-sm font-light leading-relaxed max-w-lg">
            Reservations are Welcome Contact your referral today to learn more
            about our benefits !
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <PopularHotels />
      <FeatureHotels />
      <MoreHotels />
      <SignInBonus />
      <RulesDescription />

      {/* Additional FAQ / Accordion Section */}
      <section className="w-full py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 w-full max-w-xs mx-auto mb-6">
            <div className="h-px bg-[#b58a4b]/60 flex-1" />
            <span className="text-[#b58a4b] tracking-[0.25em] text-xs sm:text-sm font-medium uppercase">
              Platform Details
            </span>
            <div className="h-px bg-[#b58a4b]/60 flex-1" />
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full bg-white border border-amber-100 rounded-md p-4 sm:p-6 shadow-xs"
          >
            <AccordionItem
              value="consultant-mode"
              className="border-b last:border-b-0 border-amber-100"
            >
              <AccordionTrigger className="py-4 text-base sm:text-lg font-serif font-semibold text-text-dark hover:no-underline">
                1. About Consultant Mode
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Platform users can invite others to join as consultants using an
                invitation code. Once they join, they become part of your
                downline.
                <br />
                <br />
                As an upline, you will receive a 5% commission from the earnings
                of your Senior Consultants in your downline.
                <br />
                <br />
                The commissions earned by the upline are automatically credited
                to their platform account and can be tracked in the Team Report.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="cash-in"
              className="border-b last:border-b-0 border-amber-100"
            >
              <AccordionTrigger className="py-4 text-base sm:text-lg font-serif font-semibold text-text-dark hover:no-underline">
                2. About Cash In
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Cash-in can be completed through the “Contact Us” page. Simply
                slide the “Start” button to be redirected to the online Cash-In
                Client Service, where you will receive assistance with the
                remittance process.
                <br />
                <br />
                <strong>Cash-In Steps:</strong>
                <br />
                • Transfer the specified amount to the account number provided
                by the platform’s Client Service.
                <br />• Submit a screenshot of the successful transaction for
                verification.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="frozen"
              className="border-b last:border-b-0 border-amber-100"
            >
              <AccordionTrigger className="py-4 text-base sm:text-lg font-serif font-semibold text-text-dark hover:no-underline">
                3. About Frozen
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Promotion are not submitted after receiving an order will be in
                "Processing". All you need to do is sliding the "start" button
                to complete the outstanding Promotion.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="orders"
              className="border-b last:border-b-0 border-amber-100"
            >
              <AccordionTrigger className="py-4 text-base sm:text-lg font-serif font-semibold text-text-dark hover:no-underline">
                4. About Orders
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-light space-y-4">
                <div>
                  <strong>1. Falcon Order</strong>
                  <p className="mt-1">
                    A Smart Falcon Order allows all Consultants to earn up to 3
                    times the Incentive.
                  </p>
                </div>
                <div>
                  <strong>2. Premium Order</strong>
                  <p className="mt-1">
                    A Premium Order offers 6x–7x profit opportunities on
                    higher-value products.
                  </p>
                </div>
                <div>
                  <strong>3. Luxury Order</strong>
                  <p className="mt-1">
                    A Luxury Order appears when the snatching amount becomes
                    significantly higher at VIP Level 5.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
