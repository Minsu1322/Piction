"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Nanum_Pen_Script } from "next/font/google";
import HomePreset from "@/components/HomePreset";
import Footer from "@/components/Footer";
import FaqSection from "@/components/section/FaqSection";
import FeatureSection from "@/components/section/FeatureSection";
const nanumFont = Nanum_Pen_Script({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white via-beige-100 to-stone-200 flex px-20 flex-col p-4 overflow-hidden">
        <HomePreset />
        <FeatureSection />

        <FaqSection />
      </div>
      <Footer />
    </>
  );
}
