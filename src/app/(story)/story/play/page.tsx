"use client";

import { useStoryStore } from "@/store/storyStore";
import StoryGenerator from "@/components/StoryGenerator";
import Image from "next/image";
import { Nanum_Pen_Script } from "next/font/google";

const nanumFont = Nanum_Pen_Script({ weight: "400", subsets: ["latin"] });

export default function PlayStoryPage() {
  const { worldSetting, storyLength } = useStoryStore();

  if (!worldSetting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg">스토리를 생성하려면 먼저 설정을 해야 합니다.</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center p-4 overflow-hidden">
      {/* 두루마리 배경 이미지 */}
      <div className="relative w-full max-w-4xl h-[90vh]">
        <Image
          src="/storyImage.png"
          alt="두루마리 배경"
          fill
          className="object-cover"
        />

        {/* 스토리 및 선택지 컨테이너 - flex로 변경하여 레이아웃 제어 */}
        <div
          className={`relative flex flex-col h-full z-10 ${nanumFont.className}`}
        >
          {/* 상단 정보 영역 */}
          <div className="px-32 pt-32">
            <p className="text-2xl text-gray-700 mb-8">
              세계관: <strong>{worldSetting}</strong> ({storyLength}단계)
            </p>
          </div>

          {/* 스토리 영역 - 스크롤 적용 (스크롤바 숨김) */}
          <div className="flex-grow px-32 overflow-y-auto scrollbar-hide">
            <StoryGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}
