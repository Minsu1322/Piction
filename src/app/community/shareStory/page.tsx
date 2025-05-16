"use client";

import CommunityHeader from "@/components/community/Header";
import Spinner from "@/components/LoadingComponents/LoginLoading";
import { shareStory } from "@/components/types/types";
import { formatDate } from "@/utils/formData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiClock, FiThumbsUp, FiMessageSquare } from "react-icons/fi";

export default function ShareStoryPage() {
  const [posts, setPosts] = useState<shareStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<"latest" | "recommend">(
    "latest"
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/shareStory");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching community posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const sortedStorySharePost = [...posts].sort((a, b) => {
    if (sortOption === "latest") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortOption === "recommend") {
      return b.likes_count - a.likes_count;
    }
    return 0;
  });

  return (
    <div className="max-w-350 mx-auto p-6">
      {/* 헤더 */}
      <CommunityHeader />

      {/* 장르 선택 UI */}
      <div className="flex  justify-between flex-wrap gap-3 mb-6 text-sm font-medium text-gray-600">
        <div>
          <button className="px-4 py-2 cursor-pointer rounded-full border border-gray-300 hover:bg-blue-100 hover:text-blue-600 transition">
            전체
          </button>
          <button className="px-4 py-2 cursor-pointer rounded-full border border-gray-300 hover:bg-blue-100 hover:text-blue-600 transition">
            로맨스
          </button>
          <button className="px-4 py-2 cursor-pointer rounded-full border border-gray-300 hover:bg-blue-100 hover:text-blue-600 transition">
            판타지
          </button>
          <button className="px-4 py-2 cursor-pointer rounded-full border border-gray-300 hover:bg-blue-100 hover:text-blue-600 transition">
            스릴러
          </button>
          <button className="px-4 py-2 cursor-pointer rounded-full border border-gray-300 hover:bg-blue-100 hover:text-blue-600 transition">
            힐링
          </button>
        </div>

        <div className="flex">
          <div className="flex pl-4 justify mb-4">
            <button
              onClick={() => setSortOption("latest")}
              className={`px-3 py-1 text-sm rounded-full ${
                sortOption === "latest" ? "text-[#373B40]" : " text-[#6E7681]"
              }`}
            >
              • 최신순
            </button>
            <button
              onClick={() => setSortOption("recommend")}
              className={`px-3 py-1 text-sm rounded-full ${
                sortOption === "recommend" ? "text-[#373B40]" : "text-[#6E7681]"
              }`}
            >
              • 추천순
            </button>
          </div>
          <div className="flex justify-between items-center mb-6">
            <Link
              href="/createPost"
              className="px-6 py-2 rounded-xl bg-[#4F78FF] text-white text-sm font-medium flex items-center gap-2 hover:shadow-md transition-shadow"
            >
              <span>글쓰기</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 이야기 카드 리스트 (1개만 구현) */}
      {/* 이야기 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedStorySharePost.map((post) => (
          <Link
            href={`/community/shareStory/${post.id}`}
            key={post.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
          >
            {/* 표지 이미지 */}
            <div className="h-40 bg-gray-200">
              <img
                src={post.cover_image || "https://via.placeholder.com/300x160"}
                alt="표지 이미지"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 제목 & 줄거리 */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 truncate">
                {post.story_title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {post.story_content}
              </p>
            </div>

            {/* 하단: 장르 태그 + 추천수 */}
            <div className="flex justify-between items-center px-4 pb-4">
              <span className="text-sm text-[#868D98] px-2 py-1">
                #{post.genre?.split(",")[0]}
              </span>
              <span className="text-sm text-[#868D98]">
                추천수 {post.likes_count}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
