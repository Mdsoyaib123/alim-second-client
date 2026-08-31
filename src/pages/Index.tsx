import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import FounderQuoteSection from "@/components/home/FounderQuoteSection";
import PartnersSection from "@/components/home/PartnersSection";
import TeamSection from "@/components/home/TeamSection";
import HomeFooter from "@/components/home/HomeFooter";

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleReservationClick = () => {
    const isLoggedIn = !!localStorage.getItem("accessToken");
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/task");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fdfbf7] flex flex-col font-sans">
      <HeroSection onReservationClick={handleReservationClick} />
      <WelcomeSection />
      <FounderQuoteSection />
      <PartnersSection />
      <TeamSection />
      <HomeFooter />
    </div>
  );
};

export default Index;