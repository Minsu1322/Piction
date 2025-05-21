"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabaseClient";
import { uploadImageToSupabase } from "@/lib/uploadImage";
import Image from "next/image";

export default function CcreateShareStory() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [story_title, setStory_title] = useState("");
  const [story_content, setStory_content] = useState("");
  const [genre, setGenre] = useState("");
  const [cover_image, setCover_image] = useState("");
  const [story_time, setStory_time] = useState("10");
  const [loading, setLoading] = useState(false);

  const genres = ["전체", "로맨스", "판타지", "스릴러", "액션", "힐링"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!story_title || !story_content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("shareStory").insert([
      {
        story_title,
        story_content,
        user_id: user.id,
        genre,
        cover_image,
        story_time,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("글 작성 중 오류가 발생했습니다.");
      console.error(error);
    } else {
      router.push("/community/shareStory");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-1 py-10">
      <div className="w-full max-w-7xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row gap-8 mb-8"
        >
          {/* 좌측 영역 */}
          <div className="w-full lg:w-1/2 relative">
            {/* 이미지 프리뷰 영역 - 높이 조정 */}
            <div className="relative w-full h-[650px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={cover_image || "/StoryDefalut_Image.svg"}
                alt="표지 이미지"
                className="object-cover w-full h-full"
                fill // 부모 요소가 relative일 때 가득 채움
                sizes="100vw"
              />

              {/* 이미지 업로드 버튼 */}
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file || !user) return;

                  try {
                    const url = await uploadImageToSupabase(file, user.id);
                    setCover_image(url);
                  } catch (err) {
                    console.error("이미지 업로드 실패", err);
                  }
                }}
              />

              {/* 버튼-label 연결 */}
              <label
                htmlFor="imageUpload"
                className="absolute top-6 left-6 cursor-pointer"
              >
                <Image
                  src="/CreateShareStory_PostImage.svg"
                  alt="이미지 업로드"
                  width={120}
                  height={60}
                  className="bg-white rounded-full shadow-md transition-colors cursor-pointer"
                />
              </label>

              {/* 제목 입력창 - 이미지 하단 중앙 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-6">
                <input
                  type="text"
                  placeholder="제목을 입력해주세요"
                  value={story_title}
                  onChange={(e) => setStory_title(e.target.value)}
                  className="w-4/5 mx-auto block bg-transparent text-white text-2xl font-semibold px-4 py-2 rounded-md focus:outline-none text-center"
                />
              </div>
            </div>
          </div>

          {/* 우측 영역 */}
          <div className="w-full lg:w-1/2 flex flex-col h-[650px]">
            {/* 장르 선택 */}
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-3">
                장르
              </label>
              <div className="flex flex-wrap gap-3">
                {genres.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGenre(g)}
                    className={`px-5 py-3 rounded-lg transition-colors text-base ${
                      genre === g
                        ? "border-2 border-blue-400 bg-blue-50 font-medium"
                        : "border border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* 길이 (슬라이더) */}
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-3">
                이야기 길이: {story_time} 회
              </label>
              <input
                type="range"
                min={10}
                max={200}
                value={story_time}
                onChange={(e) => setStory_time(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-sm text-gray-500 mt-2">
                이야기 진행 단계 수를 선택하세요 (10~200회)
              </p>
            </div>

            {/* 이야기 내용  */}
            <div className="flex-1 flex flex-col">
              <label className="block text-gray-700 text-lg font-medium mb-3">
                세계관 / 이야기 내용
              </label>
              <textarea
                placeholder="내용을 입력하세요."
                value={story_content}
                onChange={(e) => setStory_content(e.target.value)}
                className="flex-1 w-full border border-gray-300 rounded-lg px-4 py-3 resize-none text-base"
              />
            </div>
          </div>
        </form>

        {/* 버튼 */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.push("/community/shareStory")}
            className="px-8 py-4 bg-gray-400 text-white text-lg font-medium rounded-lg hover:bg-gray-600 transition cursor-pointer"
          >
            취소
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || !story_title || !story_content}
            className="px-8 py-4 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-600 transition cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "작성 중..." : "작성 완료"}
          </button>
        </div>
      </div>
    </div>
  );
}
