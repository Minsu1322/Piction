"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStoryStore } from "@/store/storyStore";
import StoryPresets from "@/components/StoryPresets";
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
    <div className={`min-h-screen w-full bg-gray-50 ${nanumFont.className}`}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 top-1/3 w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              새로운
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                이야기
              </span>
              의 시작
            </h1>
            <p className="text-xl md:text-2xl text-gray-600">
              당신만의 세계를 만들고 모험을 시작하세요
            </p>
          </div>

          {/* Hero Image Placeholder */}
          <div className="w-48 h-48 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
          {/* Progress Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-purple-400"></div>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left Column - Story Presets */}
            <div className="order-2 md:order-1">
              <div className="bg-gray-50 rounded-xl p-6 h-full border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-blue-600"
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
                <div className="space-y-2">
                  <StoryPresets onSelect={handlePresetSelect} />
                </div>
              </div>
            </div>

            {/* Right Column - Custom Settings */}
            <div className="order-1 md:order-2">
              <div className="space-y-8">
                {/* World Setting */}
                <div>
                  <label className="block text-2xl font-semibold mb-3 text-gray-800 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3 text-blue-600"
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
                    className="w-full p-4 text-lg border border-gray-200 rounded-lg h-40 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none bg-gray-50 text-gray-800 placeholder-gray-400"
                  />
                </div>

                {/* Story Length */}
                <div>
                  <label className="block text-xl font-semibold mb-3 text-gray-800 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3 text-blue-600"
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
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        min={10}
                        max={200}
                        step={10}
                        className="w-full h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-gray-800 text-xl font-medium min-w-16 text-center bg-white rounded-lg py-1 px-3 border border-gray-200">
                        {length}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg text-gray-600 mt-3 px-1">
                      <span>짧은 이야기</span>
                      <span>긴 모험</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Start Button Section */}
          <div className="px-8 pb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-50"></div>
              <button
                onClick={handleStartStory}
                disabled={isLoading}
                className="relative w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-xl font-bold rounded-lg shadow-lg transition transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
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
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    모험 시작하기
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quote Footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white px-8 py-4 rounded-full border border-gray-200 shadow-md">
            <p className="text-gray-800 text-lg italic">
              "모든 위대한 이야기는{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                당신의 선택
              </span>
              으로 완성됩니다"
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-8 right-8 w-16 h-16 bg-white rounded-full border border-gray-200 shadow-lg flex items-center justify-center z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
    </div>
  );
}
