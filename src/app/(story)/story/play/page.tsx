"use client";

import { useStoryStore } from "@/store/storyStore";
import StoryGenerator from "@/components/StoryGenerator";
import { Noto_Sans_KR } from "next/font/google";
import { useState } from "react";

const NotoFont = Noto_Sans_KR({ weight: "400", subsets: ["latin"] });

export default function PlayStoryPage() {
  const { worldSetting, storyLength, GenreSetting, storyProgress } =
    useStoryStore();
  const [showOverlay, setShowOverlay] = useState(false);

  if (!worldSetting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">스토리를 생성하려면 먼저 설정을 해야 합니다.</p>
      </div>
    );
  }

  // 진행도 계산
  const progressPercent =
    storyLength > 0
      ? Math.min(100, Math.round((storyProgress / storyLength) * 100))
      : 0;

  return (
    <div
      className={`h-[90vh] flex flex-col items-center justify-center p-4 pt-0 ${NotoFont.className}`}
    >
      <div className="w-full max-w-[95%] h-[90vh] flex flex-col rounded-xl overflow-hidden relative">
        <div className="relative w-full h-full flex flex-col bg-white rounded-xl overflow-hidden">
          {/* 좌측상단 버튼/진행도 영역 */}
          <div className="top-4 left-4 flex items-center space-x-4">
            <button
              onClick={() => setShowOverlay(true)}
              className="py-2 px-6 rounded-2xl text-white bg-gray-500 hover:bg-gray-700 transition cursor-pointer text-sm whitespace-nowrap"
            >
              세계관 보기
            </button>
            {/* 진행도 막대 */}
            <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            {/* 진행도 퍼센트 */}
            <span className="text-black font-semibold mr-20">
              {progressPercent}%
            </span>
          </div>

          {/* 오버레이 및 블러 배경 */}
          {showOverlay && (
            <div
              onClick={() => setShowOverlay(false)}
              className="fixed inset-0 bg-gray-200 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-40 cursor-pointer"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl p-16 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 relative"
                style={{ minHeight: "600px" }} // 필요시 더 크게 조절
              >
                {/* 상단 gradient 라인 */}
                <div className="absolute top-0 left-0 w-full h-3 rounded-t-2xl bg-gradient-to-r from-blue-400 to-purple-400" />
                {/* 닫기 버튼 */}
                <button
                  onClick={() => setShowOverlay(false)}
                  className="absolute right-10 top-10 py-2 px-8 cursor-pointer rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white text-lg font-semibold shadow hover:opacity-90 transition"
                >
                  닫기
                </button>
                {/* 내용 */}
                <div className="pt-10 pb-4 px-4">
                  <p className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      🌍
                    </span>
                    세계관 설정
                  </p>
                  <div className="mt-8 p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-inner">
                    <p className="text-xl font-semibold text-gray-700 mb-3">
                      장르 : <span className="text-lg">{GenreSetting}</span>
                    </p>
                    <p className="text-xl font-semibold text-gray-700 mb-1">
                      줄거리
                    </p>
                    <div className="text-lg text-gray-600 leading-relaxed whitespace-pre-line mb-6">
                      {worldSetting}
                    </div>
                    <p className="text-lg ">
                      길이 : <span className="">{storyLength}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 구분선 */}
          <div className="w-full h-[1px] bg-gray-300"></div>

          {/* 스토리 영역 */}
          <div className="w-full h-full pt-12">
            <div className="h-full p-6 overflow-y-auto scrollbar-hide">
              <StoryGenerator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
