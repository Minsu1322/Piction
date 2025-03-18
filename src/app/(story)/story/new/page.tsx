"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStoryStore } from "@/store/storyStore";
import StoryPresets from "@/components/StoryPresets";
import Image from "next/image";
import { Nanum_Pen_Script } from "next/font/google";
const nanumFont = Nanum_Pen_Script({ weight: "400", subsets: ["latin"] });

export default function NewStoryPage() {
  const router = useRouter();
  const { setWorldSetting, setStoryLength } = useStoryStore();
  const [world, setWorld] = useState("");
  const [length, setLength] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  const handlePresetSelect = (preset: string) => {
    setWorld(preset);
  };

  const handleStartStory = () => {
    if (!world.trim()) {
      alert("세계관을 입력하거나 프리셋을 선택하세요.");
      return;
    }

    setIsLoading(true);
    setWorldSetting(world);
    setStoryLength(length);

    setTimeout(() => {
      router.push("/story/play");
    }, 600);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative ${nanumFont.className}`}
    >
      {/* 페이지 타이틀과 설명 */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2 text-amber-900">
          새로운 이야기의 시작
        </h1>
        <p className="text-3xl text-amber-800">
          당신만의 세계를 만들고 모험을 시작하세요
        </p>
      </div>

      {/* 메인 컨텐츠 카드 */}
      <div className="bg-amber-50/90 backdrop-blur-sm rounded-xl shadow-xl p-8 w-full max-w-2xl border border-amber-200">
        {/* 도서관 아이콘 장식 */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-amber-800 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-amber-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>

        {/* 프리셋 선택 섹션 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-amber-900 border-b border-amber-300 pb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-amber-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            이야기 세계 선택
          </h2>
          <StoryPresets onSelect={handlePresetSelect} />
        </div>

        {/* 세계관 설정 */}
        <div className="mb-6">
          <label className="block text-3xl font-semibold mb-2 text-amber-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-amber-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            세계관 설정
          </label>
          <textarea
            value={world}
            onChange={(e) => setWorld(e.target.value)}
            placeholder="예: 마법이 존재하는 중세 판타지 세계에서 용과 인간이 공존하는 왕국, 주인공은 17세 견습 마법사 등 자세한 설정을 입력해주세요."
            className="w-full p-3 text-2xl border border-amber-300 rounded-lg h-32 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-amber-50 text-amber-900"
          />
        </div>

        {/* 양피지 디자인 구분선 */}
        <div className="border-t border-amber-300 my-6 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-50 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-amber-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </div>
        </div>

        {/* 스토리 길이 설정 */}
        <div className="mb-8">
          <label className="block text-xl font-semibold mb-2 text-amber-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-amber-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            스토리 길이
          </label>
          <div className="flex items-center">
            <input
              type="range"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min={10}
              max={200}
              step={10}
              className="w-full h-2 bg-amber-300 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-4 text-amber-900 text-xl font-medium min-w-16 text-center">
              {length} 단계
            </span>
          </div>
          <div className="flex justify-between text-2xl text-amber-700 mt-1">
            <span>짧은 이야기</span>
            <span>긴 모험</span>
          </div>
        </div>

        {/* 시작 버튼 */}
        <button
          onClick={handleStartStory}
          disabled={isLoading}
          className="w-full px-6 py-4 bg-amber-800 text-black text-xl font-bold rounded-lg shadow-md hover:bg-amber-900 transition transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-amber-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              이야기 세계 구축 중...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              시작하기
            </>
          )}
        </button>
      </div>

      {/* 분위기 장식 요소들 */}
      <div className="text-center mt-6 text-black text-2xl">
        "모든 위대한 이야기는 선택으로 완성됩니다"
      </div>
    </div>
  );
}
