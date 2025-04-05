"use client";

import { useEffect, useRef, useState } from "react";
import { useStoryStore } from "@/store/storyStore";
import OpenAI from "openai";
import ChoiceButtons from "@/components/ChoiceButtons";
import StoryLoading from "./LoadingComponents/StoryLoading";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function StoryGenerator() {
  const {
    worldSetting,
    storyLength,
    storyProgress,
    GenreSetting,
    setStoryProgress,
  } = useStoryStore();
  const [story, setStory] = useState<string>("");
  const [choices, setChoices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [initialized, setInitialized] = useState(false);
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

    const promptData = `세계관: ${worldSetting}\n분량 수: ${storyLength}\n장르: ${GenreSetting}
  
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

      const generatedText = response.choices[0]?.message?.content?.trim();
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
      // setInitialized(true);

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
      ? "이전 스토리:\n" +
        story +
        '\n\n사용자가 "' +
        userChoice +
        '"를 선택했다.\n\n' +
        "지시사항:\n" +
        "1. 다음 형식을 정확히 따라 응답을 구성하라:\n" +
        "   - 먼저 '------' 제목 아래 이야기를 " +
        (isFinalStep
          ? "충격적인 반전이나 가슴 뭉클한 결말로 완벽하게 마무리한다"
          : "독자가 다음 화를 기다릴 수 없게 흥미진진하게 이어간다") +
        "\n" +
        "   - " +
        (isFinalStep
          ? "이야기를 완결한다"
          : "이야기 후에 '------' 제목 아래 2~4개의 선택지를 제공한다") +
        "\n" +
        "   - 선택지와 스토리가 섞이지 않도록 한다\n\n" +
        "2. 스토리 작성 지침:\n" +
        '   - 대화는 인물의 성격과 감정이 드러나도록 생생하게 표현하라. 대화는 큰따옴표(")로 감싸고, 대화 사이에 인물의 행동과 표정, 어조 등을 섬세하게 묘사하라.\n' +
        "   - 이전 스토리의 분위기와 방향성을 급격히 바꾸지 말고 자연스럽게 이어가라\n" +
        "   - 새로운 요소를 도입할 때는 반드시 이전 내용과 연결되는 복선이나 이유가 있어야 한다\n" +
        "   - 주인공의 내면 독백은 '*italic*' 형식으로 처리하고, 감정선과 갈등이 드러나도록 깊이 있게 표현하라.\n" +
        "   - 모든 묘사는 오감(시각, 청각, 촉각, 후각, 미각)을 활용하여 독자가 현장에 있는 듯한 몰입감을 주어라.\n\n" +
        "3. 선택지 작성 지침 (이야기 완결이 아닌 경우에만):\n" +
        "   - 선택지는 반드시 스토리가 모두 끝난 후, '-----' 제목 아래에 배치한다\n" +
        "   - 대부분의 선택지는 현재 스토리 흐름과 일관성 있게 구성하되, 가끔(5% 확률로) 하나의 위험하거나 극단적인 선택지를 포함할 수 있다\n" +
        "   - 각 선택지는 번호와 함께 별도의 줄에 나열한다\n" +
        "   - 선택지는 다음 형식으로 정확히 제시한다:\n\n" +
        +'1. "[감정이 담긴 대사나 결심]"\n' +
        '2. "[내면의 갈등이 드러나는 대사]"\n' +
        '3. "[극적인 결단을 보여주는 대사]"\n\n' +
        "4. 스토리 전개 지침:\n" +
        "   - 급격한 장르 전환이나 뜬금없는 사건(갑작스러운 납치, 비현실적 폭력, 장르와 맞지 않는 초자연 현상 등)은 피하라\n" +
        "   - 대신 현재 상황에서 발생 가능한 갈등과 긴장을 심화시켜 흥미를 유지하라\n" +
        "   - 캐릭터의 감정 변화와 관계 발전에 초점을 맞추어 스토리에 깊이를 더하라\n\n" +
        "5. 장르별 특성을 강화하라:\n" +
        "   - 로맨스: 심장이 쿵쾅거리는 설렘, 가슴 아픈 오해, 짜릿한 스킨십, 갈등과 화해의 과정을 통한 감정선 발전\n" +
        "   - 판타지: 독창적인 마법 체계, 세계관 법칙, 신비로운 존재들과의 만남\n" +
        "   - 무협: 치밀한 무공 묘사, 파벌 간의 갈등, 의리와 배신\n" +
        "   - 액션: 치밀한 액션묘사, 상대와의 전투묘사, 전투와 속도감\n" +
        "   - 전쟁: 치밀한 상황묘사, 긴박한 상태심리, 경험에 따른 노련함\n" +
        "   - 미스터리: 단서 뿌리기, 의심과 추리, 반전의 복선\n\n" +
        "6. " +
        (randomEventChance < 30
          ? "예상치 못한 사건(라이벌의 등장, 과거의 비밀 폭로, 갑작스러운 고백, 운명적 만남)을 통해 이야기에 강렬한 전환점을 만들어라."
          : "이야기의 긴장감을 유지하되, 미묘한 감정 변화와 캐릭터 성장을 자연스럽게 녹여내라.") +
        "\n\n" +
        "7. " +
        (randomEventChance < 15 && !isFinalStep
          ? "주인공이 극한의 위기나 절체절명의 상황에 처하게 하되, 그 상황이 캐릭터의 내적 성장이나 관계 발전의 계기가 되도록 하라."
          : "선택의 무게감이 느껴지도록 각 결정에 따른 명확한 결과와 감정적 여파를 보여주라.") +
        "\n\n" +
        "8. 다음과 같은 웹소설 특유의 표현 기법을 적절히 활용하라:\n" +
        "   - 상황에 맞는 짧은 의성어/의태어 사용 (쿵, 철렁, 두근, 스르륵)\n" +
        "   - 감정이 고조될 때 끊어진 문장 활용 (그리고 그때...! / 하지만 아무리 생각해도...)\n" +
        "   - 독자의 호기심을 자극하는 복선 (그녀의 눈동자에 스친 이상한 빛을 그때는 알아채지 못했다.)"
      : "세계관: " +
        worldSetting +
        "\n분량 수: " +
        storyLength +
        "\n\n" +
        "지시사항:\n" +
        "1. 다음 형식을 정확히 따라 응답을 구성하라:\n" +
        "   - 먼저 '### 스토리' 제목 아래 한국 인기 웹소설 스타일로 몰입감 높은 스토리를 전개한다\n" +
        "   - 스토리가 끝난 후 '### 선택지' 제목 아래 독자가 고민할 만한 2~4개의 선택지를 제공한다\n" +
        "   - 선택지와 스토리가 섞이지 않도록 한다\n\n" +
        "2. 세계관 구축과 캐릭터 소개:\n" +
        "   - 주인공의 외모, 성격, 배경을 생생하게 묘사하라 (특징적인 외모, 트라우마, 숨겨진 능력 등)\n" +
        "   - 세계관의 독특한 규칙과 분위기를 섬세하게 표현하라\n" +
        "   - 등장인물 간의 관계와 긴장감을 명확히 설정하라\n\n" +
        "3. 문체와 표현:\n" +
        "   - 감각적인 묘사와 비유를 활용하여 장면을 생생하게 그려내라\n" +
        "   - 인물의 대화는 성격과 배경이 드러나도록 개성 있게 작성하라\n" +
        "   - 주인공의 내면 독백은 '*italic*' 형식으로 표현하라\n" +
        "   - 긴장감 있는 장면에서는 짧은 문장을 연속해서 사용하라\n" +
        "   - 감정적 고조나 반전 장면에서는 의성어/의태어를 적절히 활용하라\n\n" +
        "4. 선택지 작성 지침:\n" +
        "   - 선택지는 반드시 스토리가 모두 끝난 후, '### 선택지' 제목 아래에 배치한다\n" +
        "   - 각 선택지는 캐릭터의 가치관과 내적 갈등이 반영되도록 구성하라\n" +
        "   - 선택지는 다음 형식으로 정확히 제시한다:\n\n" +
        "------\n" +
        '1. "[감정이 담긴 대사나 결심]" — [그 선택이 가져올 암시적 결과나 의미]\n' +
        '2. "[내면의 갈등이 드러나는 대사]" — [선택에 따른 위험이나 기회를 암시]\n' +
        '3. "[극적인 결단을 보여주는 대사]" — [독자의 호기심을 자극하는 암시]\n\n' +
        "5. 장르별 특화 요소:\n" +
        "   - 로맨스: 심장이 쿵쾅거리는 우연한 접촉, 설렘 가득한 대화, 의미심장한 눈빛 교환, 오해와 화해의 감정선\n" +
        "   - 판타지: 독창적인 마법 시스템, 신비로운 존재와의 만남, 예언이나 저주\n" +
        "   - 무협/판타지: 화려한 기공/마법 묘사, 세력 간의 복잡한 관계, 비밀스러운 유물\n" +
        "   - 미스터리: 미묘한 단서 배치, 의심스러운 행동 묘사, 복선 깔기\n\n" +
        "6. 스토리는 다음 요소를 포함해야 한다:\n" +
        "   - 캐릭터가 직면한 뚜렷한 갈등 요소 (내적/외적/관계적 갈등)\n" +
        "   - 예상치 못한 사건이나 반전 (새로운 인물의 등장, 비밀의 발견, 배신)\n" +
        "   - 감정선의 변화 (희망→절망→결의 등의 감정 변화)\n" +
        "   - 독자가 '다음에 무슨 일이 벌어질까?' 궁금해하게 만드는 미스터리나 복선";

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: promptData }],
        temperature: 0.8, // 약간 높여서 더 창의적인 결과 유도
        max_tokens: Math.min(storyLength * 50, 2048),
      });

      const generatedText = response.choices[0]?.message?.content?.trim();
      if (!generatedText) {
        setErrorMessage("⚠️ 스토리를 생성하지 못했습니다. 다시 시도해주세요.");
        setLoading(false);
        return;
      }

      // 주인공 사망 여부 확인
      const deathCheck = generatedText.includes("[주인공 사망]");

      // 사망 표시 제거
      const cleanText = generatedText.replace("[주인공 사망]", "");

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
      // setInitialized(false);
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
          <p className="whitespace-pre-wrap text-xl">{story}</p>
        </div>
        {/* {loading && <p className="text-xl">스토리 생성 중...</p>} */}
        {loading && (
          <>
            {!story ? (
              <StoryLoading />
            ) : (
              <p className="text-xl">스토리 생성 중...</p>
            )}
          </>
        )}

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
