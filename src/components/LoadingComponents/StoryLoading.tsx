"use client";

import { useEffect, useState } from "react";

export default function StoryLoading() {
  const [loadingPhase, setLoadingPhase] = useState(0);
  const loadingMessages = [
    "이야기의 세계를 준비하고 있어요",
    "등장인물들이 모이고 있어요",
    "흥미로운 이야기를 구상하고 있어요",
    "장면을 세팅하고 있어요",
    "스토리를 짜는 중이에요",
    "마법 같은 이야기가 곧 시작됩니다",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPhase((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50 p-6">
      <div className="max-w-lg w-full text-center">
        {/* 달려가는 캐릭터 애니메이션 */}
        <div className="relative h-20 mb-8 overflow-hidden">
          <div className="absolute w-full h-1 bg-gray-200 bottom-0"></div>

          <div className="absolute left-0 bottom-1 animate-run-right">
            <div className="relative">
              {/* 캐릭터 모양 */}
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative">
                {/* 눈 */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full"></div>
                {/* 입 */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-white rounded-full"></div>
              </div>

              {/* 흔들리는 책 */}
              <div className="absolute -top-4 -right-3 animate-bounce-slow">
                <div className="w-6 h-8 bg-purple-300 rounded-sm relative">
                  <div className="absolute inset-1 border-2 border-white opacity-50 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 로딩 메시지 */}
        <div className="h-12 flex items-center justify-center">
          <h3 className="text-xl font-medium text-gray-800 transition-opacity duration-500">
            {loadingMessages[loadingPhase]}
          </h3>
        </div>

        {/* 스토리 생성 카운터 표시 */}
        <div className="mt-8 text-sm text-gray-500">
          <p>새로운 이야기의 세계를 창조하는 중...</p>
        </div>

        {/* 텍스트 로딩 효과 */}
        <div className="mt-8 flex space-x-3 justify-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse-delay-1"></div>
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse-delay-2"></div>
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse-delay-3"></div>
        </div>
      </div>
    </div>
  );
}
