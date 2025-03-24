"use client";

import { useStoryStore } from "@/store/storyStore";
import StoryGenerator from "@/components/StoryGenerator";
import { Nanum_Pen_Script, Noto_Sans_KR } from "next/font/google";
import { useState } from "react";

const nanumFont = Nanum_Pen_Script({ weight: "400", subsets: ["latin"] });
const NotoFont = Noto_Sans_KR({ weight: "400", subsets: ["latin"] });

export default function PlayStoryPage() {
  const { worldSetting, storyLength } = useStoryStore();
  const [showWorldSetting, setShowWorldSetting] = useState(false);

  if (!worldSetting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">스토리를 생성하려면 먼저 설정을 해야 합니다.</p>
      </div>
    );
  }

  return (
    <div
      className={`h-screen flex flex-col items-center justify-center p-4 pt-0 ${NotoFont.className}`}
    >
      {/* 전체 컨테이너 - 그림자 효과로 은은한 빛나는 테두리 구현 */}
      <div className="w-full max-w-[95%] h-[90vh] flex flex-col rounded-xl overflow-hidden relative">
        {/* 실제 콘텐츠 영역 */}
        <div className="relative w-full h-full flex flex-col bg-white rounded-xl overflow-hidden">
          {/* 세계관 영역 (상단) - 토글에 따라 높이 변경 */}
          <div
            className={`w-full ${
              showWorldSetting ? "h-[20%]" : "h-[10%]"
            } transition-all duration-300 overflow-hidden`}
          >
            <div className="h-full p-4 bg-gray-50">
              {/* 세계관 토글 버튼 */}
              <button
                onClick={() => setShowWorldSetting(!showWorldSetting)}
                className="w-full py-2 px-4 rounded-md text-black font-semibold hover:opacity-90 transition"
              >
                {showWorldSetting ? "세계관 숨기기 ▲" : "세계관 보기 ▼"}
              </button>

              {/* 세계관 정보 */}
              {showWorldSetting && (
                <div className="mt-4 p-4 rounded-md bg-white flex-grow overflow-y-auto scrollbar-hide">
                  <p className="text-lg font-semibold">🌍 세계관 설정</p>
                  <p className="mt-2 text-gray-700">
                    {worldSetting} ({storyLength}단계)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 얕은 회색 구분선 */}
          <div className="w-full h-[1px] bg-gray-300"></div>

          {/* 스토리 영역 (하단) - 세계관 영역 높이에 따라 조정됨 */}
          <div
            className={`w-full ${
              showWorldSetting ? "h-[80%]" : "h-[90%]"
            } transition-all duration-300`}
          >
            <div className="h-full p-6 overflow-y-auto scrollbar-hide">
              <StoryGenerator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
