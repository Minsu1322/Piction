"use client";

import { useEffect, useRef, useState } from "react";
import { useStoryStore } from "@/store/storyStore";
import OpenAI from "openai";
import ChoiceButtons from "@/components/ChoiceButtons";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function StoryGenerator() {
  const { worldSetting, storyLength, storyProgress, setStoryProgress } =
    useStoryStore();
  const [story, setStory] = useState<string>("");
  const [choices, setChoices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [storyEnded, setStoryEnded] = useState<"success" | "failure" | null>(
    null
  );
  const initialRenderRef = useRef(true);

  useEffect(() => {
    if (worldSetting && storyLength && initialRenderRef.current) {
      initialRenderRef.current = false; // 한 번만 실행되도록 설정
      generateInitialStory();
    }
  }, [worldSetting, storyLength]);

  const generateInitialStory = async () => {
    setLoading(true);
    setErrorMessage("");

    const promptData = `세계관: ${worldSetting}\n분량 수: ${storyLength}
  
  지시사항:
  1. 스토리를 완전한 문장으로 작성하고, 마지막에 반드시 2~3개의 선택지를 제공하고, 웹소설 스타일을 반영하라.
  2. 스토리를 현대 웹소설 스타일로 작성하라. 등장인물 간 대화는 큰따옴표(")를 사용하여 표현하라.
  3. 각 선택지는 별도의 줄에 숫자와 함께 나열해라. 예시: \n1. 첫 번째 선택지\n2. 두 번째 선택지
  4. 선택지 중 하나는 위험하거나 도전적인 선택이 되도록 하라.
  5. 스토리는 흥미진진하고 예측 불가능한 요소를 포함해야 한다.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: promptData }],
        temperature: 0.8,
        max_tokens: Math.min(storyLength * 50, 2048),
      });

      let generatedText = response.choices[0]?.message?.content?.trim();
      if (!generatedText) {
        setErrorMessage("⚠️ 스토리를 생성하지 못했습니다. 다시 시도해주세요.");
        setLoading(false);
        return;
      }

      // 스토리와 선택지 분리 개선
      const choicePattern = /(\n\d+\.|\n\-|\n\d+\))\s+.+/g;
      const matches = generatedText.match(choicePattern);

      let newStory = generatedText;
      let newChoices: string[] = [];

      if (matches && matches.length > 0) {
        // 선택지 추출
        newChoices = matches.map((choice) => choice.trim());

        // 스토리에서 선택지 부분 제거
        for (const choice of matches) {
          newStory = newStory.replace(choice, "");
        }
        newStory = newStory.trim();
      }

      // 초기 스토리 설정
      setStory(newStory);
      setChoices(newChoices.length > 0 ? newChoices : []);
      setInitialized(true);

      // 초기 스토리는 storyProgress를 증가시키지 않음
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
      setErrorMessage("⚠️ 서버 오류 발생! 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  //선택지를 선택했을떄 사용
  const generateStory = async (userChoice?: string) => {
    setLoading(true);
    setErrorMessage("");

    const isFinalStep = storyProgress + 1 >= storyLength;
    const randomEventChance = Math.random() * 100; // 0-100 사이의 난수 생성

    const promptData = userChoice
      ? `이전 스토리:\n${story}\n\n사용자가 "${userChoice}"를 선택했다.
  
  지시사항:
  1. 이야기를 ${isFinalStep ? "완결되도록 마무리하고" : "이어가고"} ${
          isFinalStep
            ? "더 이상의 선택지는 제공하지 마라."
            : "반드시 2~3개의 새로운 선택지를 제공해라."
        }
  2. 각 선택지는 별도의 줄에 숫자와 함께 나열해라. 예시: \n1. 첫 번째 선택지\n2. 두 번째 선택지
  3. 대화체를 적극적으로 활용하라. 주인공과 등장인물 간의 대화는 큰따옴표(")로 감싸고, 상황 설명과 지문은 자연스럽게 섞어라.
  4. 몰입감을 높이기 위해 주인공의 생각을 이탤릭체(예: *이게 정말 가능할까...?*)로 표현하라.
  5. 새로운 선택지를 제공할 때는 웹소설 스타일로 작성하라. 예를 들어:
  
  [선택지]  
  "이곳을 떠나야 해. 당장." — 더 이상 머뭇거릴 시간이 없다.  
  "아니, 기다려봐. 무언가 이상해." — 뭔가 놓친 게 있을지도 모른다.  
  "누군가 있다...!" — 낯선 기척이 느껴진다. 숨을 죽일 것인가?
  
  6. 예측 불가능한 전개와 위험한 상황을 과감하게 포함시켜라.
  7. ${
    randomEventChance < 25
      ? "갑작스러운 위기나 예상치 못한 사건을 발생시켜라."
      : "이야기의 자연스러운 흐름을 유지하되, 단조롭지 않게 전개하라."
  }
  8. ${
    randomEventChance < 10 && !isFinalStep
      ? "주인공이 죽거나 치명적 위기에 처할 가능성을 고려하라. 만약 주인공이 죽게 된다면, 마지막에 '[주인공 사망]'이라고 명시하라."
      : "주인공의 생존을 보장하지 말고, 선택에 따른 결과를 사실적으로 반영하라."
  }`
      : `세계관: ${worldSetting}\n단어 수: ${storyLength}
  
  지시사항:
  1. 스토리를 완전한 문장으로 작성하고, 마지막에 반드시 2~3개의 선택지를 제공하고, 웹소설 스타일을 반영하라.
  2. 스토리를 현대 웹소설 스타일로 작성하라. 등장인물 간 대화는 큰따옴표(")를 사용하여 표현하라.
  3. 각 선택지는 별도의 줄에 숫자와 함께 나열해라. 예시: \n1. 첫 번째 선택지\n2. 두 번째 선택지
  4. 선택지 중 하나는 위험하거나 도전적인 선택이 되도록 하라.
  5. 스토리는 흥미진진하고 예측 불가능한 요소를 포함해야 한다.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: promptData }],
        temperature: 0.8, // 약간 높여서 더 창의적인 결과 유도
        max_tokens: Math.min(storyLength * 50, 2048),
      });

      let generatedText = response.choices[0]?.message?.content?.trim();
      if (!generatedText) {
        setErrorMessage("⚠️ 스토리를 생성하지 못했습니다. 다시 시도해주세요.");
        setLoading(false);
        return;
      }

      // 주인공 사망 여부 확인
      const deathCheck = generatedText.includes("[주인공 사망]");

      // 사망 표시 제거
      let cleanText = generatedText.replace("[주인공 사망]", "");

      // 스토리와 선택지 분리 개선
      const choicePattern = /(\n\d+\.|\n\-|\n\d+\))\s+.+/g;
      const matches = cleanText.match(choicePattern);

      let newStory = cleanText;
      let newChoices: string[] = [];

      if (matches && matches.length > 0) {
        // 선택지 추출
        newChoices = matches.map((choice) => choice.trim());

        // 스토리에서 선택지 부분 제거
        for (const choice of matches) {
          newStory = newStory.replace(choice, "");
        }
        newStory = newStory.trim();
      }

      // 최초 생성인 경우와 이어서 생성하는 경우 구분
      if (!userChoice) {
        setStory(newStory);
        // 첫 실행 시에는 스토리 생성 후 storyProgress를 0으로 유지합니다
        // 이미 storyProgress는 0이므로 별도로 설정할 필요 없음
      } else {
        setStory((prev) => `${prev}\n\n${newStory}`);
        // 사용자 선택 후에만 storyProgress 증가
        setStoryProgress(storyProgress + 1);
      }

      // 주인공 사망 또는 최종 단계 처리
      if (deathCheck) {
        setStoryEnded("failure");
        setChoices([]);
      } else if (isFinalStep && userChoice) {
        // userChoice가 있을 때만 최종 단계 체크
        setStoryEnded("success");
        setChoices([]);
      } else if (newChoices.length === 0) {
        setErrorMessage("⚠️ 선택지가 포함되지 않았습니다. 다시 생성합니다.");
        setLoading(false);
        return generateStory(userChoice);
      } else {
        setChoices(newChoices);
      }
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
      setErrorMessage("⚠️ 서버 오류 발생! 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 스토리 리셋 함수
  const resetStory = () => {
    if (
      confirm("정말로 새 이야기를 시작하시겠습니까? 기존 이야기는 사라집니다.")
    ) {
      setStory("");
      setChoices([]);
      setStoryEnded(null);
      setStoryProgress(0);
      setInitialized(false);
      generateStory();
    }
  };

  return (
    <div className="w-full flex h-full">
      {/* 스토리 영역 (좌측) */}
      <div className="w-2/3 h-full overflow-y-auto scrollbar-hide pr-6">
        <h1 className="text-3xl font-bold mb-4">📖 생성된 스토리</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="story-content mb-6">
          <p className="whitespace-pre-wrap text-2xl">{story}</p>
        </div>
        {loading && <p className="text-xl">스토리 생성 중...</p>}

        {storyEnded === "failure" && (
          <div className="story-failed mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <h2 className="text-2xl font-bold text-red-600">
              💀 주인공이 죽었습니다!
            </h2>
            <p className="mt-2 mb-4">이야기가 비극적으로 끝났습니다.</p>
            <button
              onClick={resetStory}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              새 이야기 시작하기
            </button>
          </div>
        )}

        {storyEnded === "success" && (
          <div className="story-completed mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h2 className="text-2xl font-bold text-green-600">
              🎉 이야기가 완결되었습니다!
            </h2>
            <button
              onClick={resetStory}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              새 이야기 시작하기
            </button>
          </div>
        )}
      </div>

      {/* 선택지 영역 (우측) */}
      <div className="w-1/3 h-full pl-6 border-l border-gray-200 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">✨ 선택지</h2>

        {choices.length > 0 ? (
          <div className="flex-grow">
            <ChoiceButtons choices={choices} onSelect={generateStory} />
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-500 italic">
              {storyEnded
                ? "이야기가 종료되었습니다."
                : "선택지를 기다리는 중..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
