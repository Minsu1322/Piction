"use client";

import Spinner from "@/components/LoadingComponents/LoginLoading";
import { shareStory } from "@/components/types/types";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/authStore";
import { useStoryStore } from "@/store/storyStore";
import { formatDate } from "@/utils/formData";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiThumbsUp, FiTrash2 } from "react-icons/fi";

const DetailShareStory = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const router = useRouter();

  const [shareStory, setShareStory] = useState<shareStory>();
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  //모험시작
  const { setWorldSetting, setStoryLength, setGenreSetting } = useStoryStore();

  const handlePresetClick = () => {
    if (!shareStory?.story_content) return;
    setWorldSetting(shareStory.story_content);
    setStoryLength(shareStory.story_time);
    setGenreSetting([shareStory.genre]);
    router.push("/story/play");
  };

  useEffect(() => {
    const fetchShareStory = async () => {
      const { data, error } = await supabase
        .from("shareStory")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error("글을 불러오는 중 오류 발생:", error);
      else setShareStory(data);

      const { count: likesCount, error: likeError } = await supabase
        .from("story_likes")
        .select("user_id", { count: "exact", head: true })
        .eq("story_id", data.id);

      if (likeError) {
        console.error("좋아요 수 조회 오류:", likeError);
      } else if (likesCount !== null) {
        setLikeCount(likesCount);
      }

      setLoading(false);
    };

    const checkUserLiked = async () => {
      if (user) {
        try {
          const response = await fetch(
            `/api/shareStory/Likes?shareStoryId=${id}`
          );
          const data = await response.json();

          if (data.users && Array.isArray(data.users)) {
            const userLiked = data.users.some(
              (like: any) => like.user_id === user.id
            );
            setHasLiked(userLiked);
          }
        } catch (error) {
          console.error("좋아요 상태 확인 중 오류 발생:", error);
        }
      }
    };

    if (id) {
      fetchShareStory();
      checkUserLiked();
    }
  }, [id, user]);

  const handleDeletePost = async () => {
    if (!confirm("정말로 이 글을 삭제하시겠습니까?")) return;

    const response = await fetch(`/api/shareStory/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("게시글이 삭제되었습니다.");
      router.push("/community");
    } else {
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  // 추천하기 기능
  const handleLikeClick = async () => {
    if (!user) {
      alert("로그인한 사용자만 추천할 수 있습니다.");
      return;
    }

    setIsLikeLoading(true);

    try {
      const response = await fetch("/api/shareStory/Likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shareStoryId: id,
          userId: user.id,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // 좋아요 상태 토글
        setHasLiked(!hasLiked);

        // 좋아요 수 새로고침
        const { count: newLikesCount, error: likeCountError } = await supabase
          .from("story_likes")
          .select("user_id", { count: "exact", head: true })
          .eq("story_id", id);

        if (likeCountError) {
          console.error("좋아요 수 새로고침 오류:", likeCountError);
        } else if (newLikesCount !== null) {
          setLikeCount(newLikesCount);
        }
      } else {
        console.error("추천 처리 중 오류 발생:", result.error);
        alert("추천 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("추천 처리 중 예외 발생:", error);
      alert("추천 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLikeLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!shareStory)
    return <p className="text-center">해당 글을 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-3/4 mx-auto p-6">
      {/* 상단 네비게이션 */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 transition"
        >
          <FiArrowLeft className="mr-2" /> 목록으로 돌아가기
        </button>

        {/* 작성자만 삭제 버튼 보이게 */}
        {user && user.id === shareStory.user_id && (
          <button
            onClick={handleDeletePost}
            className="flex items-center text-red-500 hover:text-red-700 transition"
          >
            <FiTrash2 className="mr-1" /> 삭제하기
          </button>
        )}
      </div>
      <div className="flex flex-col md:flex-row">
        {/* 좌측 - 표지 이미지 */}
        <div className="md:w-1/2">
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg h-180 relative">
            {shareStory.cover_image ? (
              <img
                src={shareStory.cover_image}
                alt={`${shareStory.story_title} 표지`}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="/StoryDefalut_Image.svg"
                alt="기본 표지 이미지"
                className="w-full h-full object-cover"
              />
            )}

            {/* 하단에 오버레이된 제목 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
              <h1 className="text-2xl font-bold text-white">
                {shareStory.story_title}
              </h1>
            </div>
          </div>
        </div>

        {/* 우측 - 이야기 정보 */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            {/* 상단 영역 (장르 + 추천수) */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-wrap gap-2">
                {shareStory.genre &&
                  shareStory.genre.split(",").map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#EEEFF1] text-blue-800 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
              </div>
              <div className="flex items-center">
                <button
                  onClick={handleLikeClick}
                  disabled={isLikeLoading || !user}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                    hasLiked
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  } transition ${
                    isLikeLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <FiThumbsUp className={hasLiked ? "fill-current" : ""} />
                  <span>{likeCount}</span>
                </button>
              </div>
            </div>

            {/* 작성일 */}
            <div className="text-sm text-gray-500 mb-6">
              {formatDate(shareStory.created_at)}
            </div>

            {/* 내용 영역 (스크롤) */}
            <div className="prose max-w-none overflow-y-auto h-64 rounded-md p-4">
              <p className="whitespace-pre-wrap">{shareStory.story_content}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 relative flex items-center justify-center">
        {/* 그라데이션 실선 */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        {/* 가운데 텍스트 */}
        <div className="relative bg-white px-4">
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            <button className="cursor-pointer" onClick={handlePresetClick}>
              모험시작하기
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailShareStory;
