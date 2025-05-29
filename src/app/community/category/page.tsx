"use client";

import CommunityHeader from "@/components/community/Header";
import Spinner from "@/components/LoadingComponents/LoginLoading";
import { Post } from "@/components/types/types";
import { formatDate } from "@/utils/formData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiClock, FiThumbsUp, FiMessageSquare } from "react-icons/fi";

export default function CommunityPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const POSTS_PER_PAGE = 10;
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<
    "latest" | "recommend" | "comment"
  >("latest");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/community?page=${currentPage}&limit=${POSTS_PER_PAGE}`
        );
        const data = await res.json();

        if (Array.isArray(data.posts)) {
          setPosts(data.posts);
          setTotalCount(data.totalCount || 0);
        } else {
          console.error("data.posts가 배열이 아닙니다:", data.posts);
          setPosts([]); // fallback
        }
      } catch (error) {
        console.error("fetchPosts 에러:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOption === "latest") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortOption === "recommend") {
      return b.likes_count - a.likes_count;
    } else if (sortOption === "comment") {
      return b.comment_count - a.comment_count;
    }
    return 0;
  });

  return (
    <div className="max-w-350 mx-auto p-6 rounded-lg">
      <CommunityHeader />
      <div className="flex justify-between border-b-[0.5px] border-b-[#A5ABB4]">
        {/* 정렬 옵션 버튼 */}
        <div className="flex pl-4 justify mb-4 gap-2">
          <button
            onClick={() => setSortOption("latest")}
            className={`px-3 py-1 cursor-pointer text-sm rounded-full ${
              sortOption === "latest" ? "font-bold" : " text-gray-700"
            }`}
          >
            • 최신순
          </button>
          <button
            onClick={() => setSortOption("recommend")}
            className={`px-3 py-1 cursor-pointer text-sm rounded-full ${
              sortOption === "recommend" ? "font-bold" : "0 text-gray-700"
            }`}
          >
            • 추천순
          </button>
          <button
            onClick={() => setSortOption("comment")}
            className={`px-3 py-1 cursor-pointer text-sm rounded-full ${
              sortOption === "comment" ? "font-bold" : " text-gray-700"
            }`}
          >
            • 댓글순
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

      {loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">아직 등록된 글이 없습니다.</p>
          <p className="mt-2 text-gray-500">첫 번째 글을 작성해 보세요!</p>
        </div>
      ) : (
        <div className="border-t rounded-2xl bg-white border-gray-100">
          {/* 게시글 목록 */}
          {sortedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/community/${post.id}`}
              className="block px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between border-b-[0.5px] border-b-[#A5ABB4] pb-6">
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {post.content}
                  </p>
                </div>

                <div className="flex flex-col items-center text-xs text-gray-400 mt-2 gap-4">
                  <div className="flex items-center gap-1">
                    <FiClock className="w-3 h-3" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <FiThumbsUp className="w-3 h-3" />
                      <span>{post.likes_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiMessageSquare className="w-3 h-3" />
                      <span>{post.comment_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-2 cursor-pointer py-1 rounded-md text-sm ${
              currentPage === page ? "bg-gray-200 text-black" : "text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
