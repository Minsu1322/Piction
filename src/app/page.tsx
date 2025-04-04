"use client";

import HomePreset from "@/components/HomePreset";
import Footer from "@/components/Footer";
import FaqSection from "@/components/section/FaqSection";
import FeatureSection from "@/components/section/FeatureSection";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white via-beige-100 to-stone-200 flex flex-col p-4 overflow-hidden">
        <HomePreset />
        <FeatureSection />

        <FaqSection />
      </div>
      <Footer />
    </>
  );
}
