import React from "react";
import HeroSection from "../components/home/sections/HeroSection";
import ServicesSection from "../components/home/sections/ServicesSection";
import StatsSection from "../components/home/sections/StatsSection";
import FeatureSection from "../components/home/sections/FeatureSection";
import CtaSection from "../components/home/sections/CtaSection";
import Navbar from "../components/Navbar";
import Hero from "../components/home/sections/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-midnight-900 transition-colors duration-500">
      <Navbar/>
      
      {/* Content */}
      <div className="relative">
        {/* <HeroSection /> */}
<Hero/>        
        <div className="relative z-10 bg-white dark:bg-midnight-800">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 dark:via-midnight-800/50 to-white dark:to-midnight-800" />
          <ServicesSection />
        </div>

        <div className="relative z-20 bg-gradient-to-b from-white dark:from-midnight-800 to-gray-50 dark:to-midnight-900">
          <StatsSection />
        </div>

        <div className="relative z-30">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-midnight-900 to-white dark:to-midnight-800" />
          <FeatureSection />
        </div>

        <div className="relative z-40 bg-white dark:bg-midnight-800">
          <CtaSection />
        </div>
      </div>
    </div>
  );
}
