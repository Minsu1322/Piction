"use client";

import HomePreset from "@/components/HomePreset";
import Footer from "@/components/Footer";
import FaqSection from "@/components/section/FaqSection";
import FeatureSection from "@/components/section/FeatureSection";

export default function Home() {
  return (
    <>
      {/* 배경 이미지 컨테이너 - 그라데이션 및 오버플로우 수정 */}
      <div
        style={{
          position: "relative",
          height: "75vh",
          minHeight: "400px", // 최소 높이 설정
          overflow: "visible", // 내용이 넘치도록 허용
        }}
      >
        {/* 배경 이미지와 그라데이션 레이어 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            backgroundImage: "url('/main-image-large 1.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
          }}
        >
          {/* 하단 그라데이션 오버레이 */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "25%", // 하단 25%만 그라데이션 적용
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
              zIndex: 1,
            }}
          />
        </div>

        {/* 콘텐츠 영역 */}
        <div className="h-full flex flex-col p-4 relative z-10">
          <HomePreset />
        </div>
      </div>

      {/* 나머지 콘텐츠 */}
      <div className="flex flex-col p-4 overflow-hidden mt-80">
        <FeatureSection />
        <FaqSection />
      </div>
      <Footer />
    </>
  );
}
