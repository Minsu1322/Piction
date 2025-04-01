"use client";

import Spinner from "@/components/LoadingComponents/LoginLoading";
import { Post } from "@/components/types/types";
import { formatDate } from "@/utils/formData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEdit, FiClock, FiThumbsUp, FiMessageSquare } from "react-icons/fi";

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/community");
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

  return (
    <div className="max-w-6xl mx-auto p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">커뮤니티</h1>
        <Link
          href="/createPost"
          className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium flex items-center gap-2 hover:shadow-md transition-shadow"
        >
          <FiEdit className="w-4 h-4" />
          <span>새 글 작성</span>
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">아직 등록된 글이 없습니다.</p>
          <p className="mt-2 text-gray-500">첫 번째 글을 작성해 보세요!</p>
        </div>
      ) : (
        <div className="border-t border-gray-100">
          {/* 헤더 */}
          <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-gray-500 border-b border-gray-100">
            <div className="col-span-8">제목</div>
            <div className="col-span-2 text-center">작성일</div>
            <div className="col-span-1 text-center">추천</div>
            <div className="col-span-1 text-center">댓글</div>
          </div>

          {/* 게시글 목록 */}
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/community/${post.id}`}
              className="block"
            >
              <div className="grid grid-cols-12 py-4 px-4 items-center border-b border-gray-100 hover:bg-gray-100 transition-colors">
                <div className="col-span-8">
                  <h2 className="text-base font-medium text-gray-800 line-clamp-1">
                    {post.title}
                  </h2>
                </div>

                <div className="col-span-2 text-center flex justify-center items-center gap-1 text-sm text-gray-500">
                  <FiClock className="w-3.5 h-3.5" />
                  <span>{formatDate(post.created_at)}</span>
                </div>

                <div className="col-span-1 text-center flex justify-center items-center gap-1 text-sm text-gray-500">
                  <FiThumbsUp className="w-3.5 h-3.5" />
                  {/* <span>{post.likes}</span> */}
                  <span>0</span>
                </div>

                <div className="col-span-1 text-center flex justify-center items-center gap-1 text-sm text-gray-500">
                  <FiMessageSquare className="w-3.5 h-3.5" />
                  <span>{post.comment_count}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
