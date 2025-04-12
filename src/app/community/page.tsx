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
    <div className="max-w-450 mx-auto p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">커뮤니티</h1>
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
        <div className="border-t rounded-2xl bg-white border-gray-100">
          {/* 게시글 목록 */}
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/community/${post.id}`}
              className="block"
            >
              <div className="grid grid-cols-12 py-4 px-4 items-center border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="col-span-8">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-lg text-gray-500 line-clamp-1">
                    {post.content}
                  </p>
                </div>

                <div className="col-span-4 flex flex-col items-end justify-between gap-1 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <FiThumbsUp className="w-4 h-4" />
                      {/* <span>{post.likes}</span> */}
                      <span>0</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FiMessageSquare className="w-4 h-4" />
                      <span>{post.comment_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
