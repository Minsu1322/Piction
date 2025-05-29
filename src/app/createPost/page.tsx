"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabaseClient";

export default function CreatePostPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("community").insert([
      {
        title,
        content,
        user_id: user.id,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("글 작성 중 오류가 발생했습니다.");
      console.error(error);
    } else {
      router.push("/community/category");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">새 글 작성</h1>

      {/* Content Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full flex-grow"
        >
          {/* Title Input */}
          <div className="p-6 w-full">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full text-2xl font-medium text-gray-800 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="h-px bg-gray-300"></div>

          {/* Content Input */}
          <div className="flex-grow p-6 min-h-0">
            <textarea
              placeholder={`내용을 입력하세요. 
모든 글은 익명으로 작성됩니다.`}
              className="w-full h-[calc(100vh-500px)] text-lg text-gray-700 focus:outline-none resize-none overflow-y-scroll"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="px-12 py-4 bg-blue-500 text-white text-lg font-medium rounded-xl hover:bg-blue-600 transition-colors shadow-md disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={loading || !title || !content}
        >
          {loading ? "작성 중..." : "작성 완료"}
        </button>
      </div>
    </div>
  );
}
