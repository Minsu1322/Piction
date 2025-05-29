"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStoryStore } from "@/store/storyStore";

export default function NewStoryPage() {
  const router = useRouter();
  const { setWorldSetting, setStoryLength, setGenreSetting } = useStoryStore();
  const [world, setWorld] = useState("");
  const [length, setLength] = useState(50);
  const [localGenres, setLocalGenres] = useState<string[]>([]);
  const [storyMakeStep, setStoryMakeStep] = useState<number>(1);

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
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "//cdn.jsdelivr.net/npm/font-kopubworld@1.0/batang.min.css";
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

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

    setWorldSetting(world);
    setStoryLength(length);
    setGenreSetting(localGenres);
    setTimeout(() => {
      router.push("/story/play");
    }, 600);
  };

  return (
    <div
      className={`min-h-screen w-full`}
      style={{
        backgroundImage: 'url("/story_bg.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "KoPub Batang, serif",
        fontWeight: 400,
      }}
    >
      {/* Decorative Elements */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex mb-4 justify-center text-[#A5ABB4] font-semibold">
          {storyMakeStep}/3
        </div>

        {/* Header Section */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-4xl font-hallym-700 text-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              새로운 이야기의 시작
            </span>
          </h1>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl overflow-hidden">
          <div className="grid 2 gap-8 p-8">
            <div className="order-1 md:order-2">
              <div className="space-y-8">
                {/* 스토리 단계별 실행(storyMakeStep으로 렌더링 구분분) */}

                {storyMakeStep === 1 && (
                  <div>
                    <label className="flex text-4xl justify-center font-semibold mb-5 text-gray-800 items-center">
                      장르
                    </label>

                    <div className="grid grid-cols-4 gap-6 my-20">
                      {[
                        "로맨스",
                        "호러",
                        "스릴러",
                        "판타지",
                        "SF",
                        "코미디",
                        "중세",
                        "무협",
                      ].map((genre) => {
                        const isSelected = localGenres.includes(genre);
                        return (
                          <button
                            key={genre}
                            onClick={() => {
                              if (isSelected) {
                                setLocalGenres(
                                  localGenres.filter((g) => g !== genre)
                                );
                              } else {
                                setLocalGenres([...localGenres, genre]);
                              }
                            }}
                            className={`px-8 py-8 rounded-lg text-xl font-medium transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? " text-black border-2 border-[#385DD9] bg-[#EDF2FF]"
                                : " bg-white hover:bg-gray-200"
                            }`}
                          >
                            {genre}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={() => setStoryMakeStep((prev) => prev + 1)}
                        disabled={localGenres.length === 0}
                        className={`px-12 py-3 rounded-2xl text-lg text-white font-semibold transition cursor-pointer ${
                          localGenres.length === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-[#4F78FF] text-white hover:bg-blue-700"
                        }`}
                      >
                        다음
                      </button>
                    </div>
                  </div>
                )}

                {storyMakeStep === 2 && (
                  <div className="relative">
                    <div className="flex justify-center text-lg text-gray-400 font-semibold mt-10 mb-10">
                      {localGenres.join(" · ")}
                    </div>

                    <label className="text-4xl justify-center text-gray-800 flex items-center">
                      세계관
                    </label>

                    {/* 가이드 버튼 */}

                    {/* 텍스트 입력 */}
                    <textarea
                      value={world}
                      onChange={(e) => setWorld(e.target.value)}
                      placeholder="예: 마법이 존재하는 중세 판타지 세계에서 용과 인간이 공존하는 왕국, 주인공은 17세 견습 마법사 등 자세한 설정을 입력해주세요."
                      className="w-full mt-12 p-4 text-base shadow-xl resize-none border border-gray-200 rounded-lg h-80 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none bg-gray-50 text-gray-800 placeholder-gray-400"
                    />

                    <div className="flex justify-center my-12">
                      <button
                        onClick={() => setShowGuide(true)}
                        className="right-0 top-0 text-lg cursor-pointer text-[#868D98] hover:text-blue-700 hover:font-bold flex items-center transition"
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
                    </div>

                    {/* 버튼 영역 */}
                    <div className="flex justify-center gap-8 mt-6">
                      <button
                        onClick={() => setStoryMakeStep((prev) => prev - 1)}
                        className="px-12 py-3 rounded-xl bg-[#A5ABB4] text-white hover:bg-gray-500 font-semibold transition text-base cursor-pointer"
                      >
                        이전
                      </button>
                      <button
                        onClick={() => setStoryMakeStep((prev) => prev + 1)}
                        disabled={world.trim().length === 0}
                        className={`px-12 py-3 rounded-lg font-semibold transition
          ${
            world.trim().length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#4F78FF] text-white hover:bg-blue-700 cursor-pointer"
          }`}
                      >
                        다음
                      </button>
                    </div>
                  </div>
                )}

                {storyMakeStep === 3 && (
                  <div>
                    <div className="flex justify-center text-sm text-gray-400 font-semibold mt-10">
                      {localGenres.join(" · ")}
                    </div>

                    <div className="flex justify-center mb-10">
                      <div className="text-lg text-gray-400 font-semibold line-clamp-1 max-w-3/5">
                        {world}
                      </div>
                    </div>

                    <label className="flex text-4xl justify-center mb-10 text-gray-800 items-center">
                      스토리 길이
                    </label>

                    <div className="bg-gray-50 rounded-lg p-20 px-24 border border-gray-200 shadow-sm">
                      <div className="relative">
                        <div
                          className="absolute font-semibold -top-10 bg-[#EDF2FF] text-[#385DD9] text-sm px-5 py-1 rounded transform -translate-x-1/2 pointer-events-none"
                          style={{
                            left: `${((length - 9) / (200 - 10)) * 100}%`,
                          }}
                        >
                          {length}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                        </div>

                        <input
                          type="range"
                          value={length}
                          onChange={(e) => setLength(Number(e.target.value))}
                          min={10}
                          max={200}
                          step={10}
                          className="w-full h-2 bg-gradient-to-r from-blue-300 to-purple-400 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="flex justify-between text-sm text-gray-600 mt-3 px-1">
                        <span>짧은 이야기</span>
                        <span>긴 이야기</span>
                      </div>
                    </div>

                    {/* 버튼 영역 */}
                    <div className="flex justify-center gap-6 mt-12">
                      <button
                        onClick={() => setStoryMakeStep((prev) => prev - 1)}
                        className="px-12 py-3 rounded-xl bg-[#A5ABB4] text-white hover:bg-gray-500 font-semibold transition text-base cursor-pointer"
                      >
                        이전
                      </button>
                      <button
                        onClick={handleStartStory}
                        className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold transition"
                      >
                        모험 시작하기
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
