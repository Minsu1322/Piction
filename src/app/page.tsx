"use client";

import HomePreset from "@/components/HomePreset";
import Footer from "@/components/Footer";
import FaqSection from "@/components/section/FaqSection";
import FeatureSection from "@/components/section/FeatureSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        {/* 콘텐츠 영역 */}
        <div className="h-full flex flex-col relative z-10">
          <HomePreset />
        </div>
      </div>
      <div className="w-full max-h-60 bg-[#EDF2FF] z-99 flex justify-center pt-8 mt-36">
        <Image
          src="/HomeDotLine.png"
          alt="Home Dot Line"
          width={4} // 너비
          height={6} // 높이
          style={{ height: "auto" }} // 비율 유지
        />
      </div>
      {/* 나머지 콘텐츠 */}
      <div className="flex flex-col overflow-hidden bg-[#EDF2FF]">
        <FeatureSection />
        <FaqSection />
      </div>
      <Footer />
    </>
  );
}
