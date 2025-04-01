"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStoryStore } from "@/store/storyStore";
import { Nanum_Pen_Script } from "next/font/google";
const nanumFont = Nanum_Pen_Script({ weight: "400", subsets: ["latin"] });

export default function NewStoryPage() {
  const router = useRouter();
  const { setWorldSetting, setStoryLength, setGenreSetting } = useStoryStore();
  const [world, setWorld] = useState("");
  const [length, setLength] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [localGenres, setLocalGenres] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  //가이드패널
  const [showGuide, setShowGuide] = useState(false);
  const [guideStep, setGuideStep] = useState(1);
  const [guideInputs, setGuideInputs] = useState({
    MainCharacterName: "",
    MainCharacterName_personality: "",
    MainCharacterName_Age: "",
    CharacterName_etc: "",
    CharacterName_etc_personality: "",
    Genre: "",
    Event: "",
  });

  const guidePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        guidePanelRef.current &&
        !guidePanelRef.current.contains(event.target)
      ) {
        setShowGuide(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [guidePanelRef]);

  const handleGuideInputChange = (field: any, value: any) => {
    setGuideInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 가이드 단계 이동
  const handleNextStep = () => {
    if (guideStep < 7) {
      setGuideStep((prev) => prev + 1);
    } else {
      applyGuideToWorld();
    }
  };

  const handlePrevStep = () => {
    if (guideStep > 1) {
      setGuideStep((prev) => prev - 1);
    }
  };

  // 가이드 내용을 세계관 설정에 적용
  const applyGuideToWorld = () => {
    const generatedWorld = `
주인공의 이름은 ${guideInputs.MainCharacterName}이며, 주인공의 성격은 ${
      guideInputs.MainCharacterName_personality
    } 
나이는 ${guideInputs.MainCharacterName_Age}세입니다.
${
  guideInputs.CharacterName_etc
    ? `주요 등장인물로는 ${guideInputs.CharacterName_etc}이(가) 있습니다.
    성격은 ${guideInputs.CharacterName_etc_personality}`
    : ""
}
${guideInputs.Genre ? `이 이야기의 장르는 ${guideInputs.Genre}입니다.` : ""}
${
  guideInputs.Event
    ? `주요 사건으로는 ${guideInputs.Event}이(가) 발생합니다.`
    : ""
}
    `.trim();

    setWorld(generatedWorld);
    setShowGuide(false);
  };

  const handleStartStory = () => {
    if (!world.trim()) {
      alert("세계관을 입력하거나 프리셋을 선택하세요.");
      return;
    }

    setIsLoading(true);
    setWorldSetting(world);
    setStoryLength(length);
    setGenreSetting(localGenres);
    setTimeout(() => {
      router.push("/story/play");
    }, 600);
  };

  //장르구분함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !localGenres.includes(trimmedValue)) {
        setLocalGenres((prev) => [...prev, trimmedValue]);
      }
      setInputValue("");
    }
  };

  const removeGenre = (genre: string) => {
    setLocalGenres((prev) => prev.filter((g) => g !== genre));
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

          <div className="grid 2 gap-8 p-8">
            {/* Right Column - Custom Settings */}
            <div className="order-1 md:order-2">
              <div className="space-y-8">
                {/* World Setting */}
                <div className="relative">
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

                  {/* 작성이 어려우신가요? 버튼 */}
                  <button
                    onClick={() => setShowGuide(true)}
                    className="absolute right-0 top-0 text-xl cursor-pointer text-blue-600 hover:text-blue-800 flex items-center transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    작성이 어려우신가요?
                  </button>

                  <textarea
                    value={world}
                    onChange={(e) => setWorld(e.target.value)}
                    placeholder="예: 마법이 존재하는 중세 판타지 세계에서 용과 인간이 공존하는 왕국, 주인공은 17세 견습 마법사 등 자세한 설정을 입력해주세요."
                    className="w-full p-4 text-lg border border-gray-200 rounded-lg h-40 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none bg-gray-50 text-gray-800 placeholder-gray-400"
                  />
                </div>
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
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    장르 설정
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {localGenres.map((genre) => (
                      <div
                        key={genre}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg flex items-center"
                      >
                        {genre}
                        <button
                          className="ml-2 text-red-500"
                          onClick={() => removeGenre(genre)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="예: 로맨스, 판타지, 중세, 무협, ..."
                    className="w-full p-4 text-lg border border-gray-200 rounded-lg h-15 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none bg-gray-50 text-gray-800 placeholder-gray-400"
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
              모든 위대한 이야기는
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                당신의 선택
              </span>
              으로 완성됩니다
            </p>
          </div>
        </div>
      </div>

      {/* 가이드 패널 */}
      {showGuide && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div
            ref={guidePanelRef}
            className="bg-white rounded-2xl shadow-[0_10px_50px_rgba(59,130,246,0.3),0_0_30px_rgba(139,92,246,0.2)] max-w-3xl w-full transform transition-all duration-300 ease-in-out overflow-hidden"
            style={{
              animation:
                "floatIn 0.4s cubic-bezier(0.21, 1.11, 0.7, 1.2) forwards",
            }}
          >
            {/* 가이드 헤더 */}
            <div className="px-6 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  세계관 설정 가이드
                </h3>
                <button
                  onClick={() => setShowGuide(false)}
                  className="text-white hover:text-gray-200 transition p-1 rounded-full hover:bg-white/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* 단계 표시 */}
              <div className="mt-4 relative h-2 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-in-out"
                  style={{ width: `${(guideStep / 7) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-s text-white/80">
                <span>Step {guideStep}/7</span>
                <span>{Math.round((guideStep / 7) * 100)}% 완료!</span>
              </div>
            </div>

            {/* 가이드 콘텐츠 */}
            <div className="px-6 py-6">
              <div className="mb-4">
                {guideStep === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center text-blue-600">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3 text-lg font-bold">
                        1
                      </span>
                      <h4 className="font-semibold text-xl">
                        주인공의 이름은 무엇인가요?
                      </h4>
                    </div>
                    <p className="text-gray-600 ml-11">
                      주인공의 이름을 입력해주세요.
                    </p>
                    <div className="ml-11 relative">
                      <input
                        type="text"
                        value={guideInputs.MainCharacterName}
                        onChange={(e) =>
                          handleGuideInputChange(
                            "MainCharacterName",
                            e.target.value
                          )
                        }
                        placeholder="예: 아리아, 레온, 미르..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none pl-10"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {guideStep === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center text-blue-600">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3 text-lg font-bold">
                        2
                      </span>
                      <h4 className="font-semibold text-xl">
                        주인공은 어떤 성격인가요?
                      </h4>
                    </div>
                    <p className="text-gray-600 ml-11">
                      성격에 따라 주인공의 경험과 선택이 달라질 수 있습니다.
                    </p>
                    <div className="ml-11 relative">
                      <input
                        type="text"
                        value={guideInputs.MainCharacterName_personality}
                        onChange={(e) =>
                          handleGuideInputChange(
                            "MainCharacterName_personality",
                            e.target.value
                          )
                        }
                        placeholder="예: 소심하고 음침한 성격, 거침없고 활동적인 성격, 정의로움, 우유부단함"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none pl-10"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {guideStep === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center text-blue-600">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3 text-lg font-bold">
                        3
                      </span>
                      <h4 className="font-semibold text-xl">
                        주인공의 나이는 몇 살인가요?
                      </h4>
                    </div>
                    <p className="text-gray-600 ml-11">
                      나이에 따라 주인공의 경험과 시각이 달라질 수 있습니다.
                    </p>
                    <div className="ml-11 relative">
                      <input
                        type="number"
                        value={guideInputs.MainCharacterName_Age}
                        onChange={(e) =>
                          handleGuideInputChange(
                            "MainCharacterName_Age",
                            e.target.value
                          )
                        }
                        placeholder="예: 17"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none pl-10"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {guideStep === 4 && (
                  <div className="space-y-4">
                    <div className="flex items-center text-blue-600">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3 text-lg font-bold">
                        4
                      </span>
                      <h4 className="font-semibold text-xl">
                        함께하는 등장인물은 누구인가요?
                      </h4>
                    </div>
                    <p className="text-gray-600 ml-11">
                      주인공 외에 이야기에 등장하는 중요한 인물들을
                      입력해주세요.
                    </p>
                    <div className="ml-11 relative">
                      <input
                        type="text"
                        value={guideInputs.CharacterName_etc}
                        onChange={(e) =>
                          handleGuideInputChange(
                            "CharacterName_etc",
                            e.target.value
                          )
                        }
                        placeholder="예: 백수 홍길동, 현자 엘리아스, 기사 로엔,..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none pl-10"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {guideStep === 5 && (
                  <div className="space-y-4">
                    <div className="flex items-center text-blue-600">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3 text-lg font-bold">
                        5
                      </span>
                      <h4 className="font-semibold text-xl">
                        함께하는 등장인물들의 성격은 어떤가요?
                      </h4>
                    </div>
                    <p className="text-gray-600 ml-11">
                      주인공 외에 이야기에 등장하는 중요한 인물들의 성격을
                      입력해주세요.
                    </p>
                    <div className="ml-11 relative">
                      <input
                        type="text"
                        value={guideInputs.CharacterName_etc_personality}
                        onChange={(e) =>
                          handleGuideInputChange(
                            "CharacterName_etc_personality",
                            e.target.value
                          )
                        }
                        placeholder="예: 밝고 명량하며 참견하는걸 좋아함, 고집세고 차가움."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none pl-10"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {guideStep === 6 && (
                  <div className="space-y-4">
                    <div className="flex items-center text-blue-600">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3 text-lg font-bold">
                        6
                      </span>
                      <h4 className="font-semibold text-xl">
                        이야기의 장르는 무엇인가요?
                      </h4>
                    </div>
                    <p className="text-gray-600 ml-11">
                      판타지, SF, 로맨스, 추리 등 이야기의 장르를 선택해주세요.
                    </p>
                    <div className="ml-11 relative">
                      <select
                        value={guideInputs.Genre}
                        onChange={(e) =>
                          handleGuideInputChange("Genre", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none pl-10"
                      >
                        <option value="">장르 선택하기</option>
                        <option value="판타지">판타지</option>
                        <option value="SF">SF</option>
                        <option value="로맨스">로맨스</option>
                        <option value="추리">추리</option>
                        <option value="역사">역사</option>
                        <option value="모험">모험</option>
                        <option value="공포">공포</option>
                        <option value="일상">일상</option>
                      </select>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {guideStep === 7 && (
                  <div className="space-y-4">
                    <div className="flex items-center text-blue-600">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3 text-lg font-bold">
                        7
                      </span>
                      <h4 className="font-semibold text-xl">
                        어떤 사건이 발생하나요?
                      </h4>
                    </div>
                    <p className="text-gray-600 ml-11">
                      이야기의 핵심이 되는 사건을 설명해주세요.
                    </p>
                    <div className="ml-11 relative">
                      <input
                        type="text"
                        value={guideInputs.Event}
                        onChange={(e) =>
                          handleGuideInputChange("Event", e.target.value)
                        }
                        placeholder="예: 고대 봉인된 악이 깨어나 세계를 위협하기 시작합니다. (자세할수록 좋아요!)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none pl-10"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 가이드 푸터 (네비게이션 버튼) */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex justify-between">
              <button
                onClick={handlePrevStep}
                disabled={guideStep === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>

              <button
                onClick={handleNextStep}
                className="px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg font-medium cursor-pointer"
              >
                {guideStep === 7 ? "완료" : "다음"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
