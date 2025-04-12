"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/authStore";
import { Comment } from "@/components/types/types";
import { FiClock, FiEye, FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import { formatDate } from "@/utils/formData";
import Spinner from "@/components/LoadingComponents/LoginLoading";

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // New states for likes
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("community")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error("글을 불러오는 중 오류 발생:", error);
      else setPost(data);
      setLoading(false);
    };

    const fetchComments = async () => {
      const response = await fetch(
        `/api/community/comments?community_id=${id}`
      );
      const data = await response.json();
      setComments(data);
    };

    if (id) {
      fetchPost();
      fetchComments();
    }
  }, [id]);

  //게시글 삭제
  const handleDeletePost = async () => {
    if (!confirm("정말로 이 글을 삭제하시겠습니까?")) return;

    const response = await fetch(`/api/community/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("게시글이 삭제되었습니다.");
      router.push("/community");
    } else {
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return alert("댓글을 입력하세요.");

    const response = await fetch("/api/community/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment_content: newComment,
        community_id: id,
        user_id: user?.id,
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      return alert(result.error || "댓글 작성 중 오류가 발생했습니다.");
    }

    setNewComment("");

    const commentsResponse = await fetch(
      `/api/community/comments?community_id=${id}`
    );
    const updatedComments = await commentsResponse.json();
    setComments(updatedComments);
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;

    const response = await fetch("/api/community/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment_id: commentId, user_id: user?.id }),
    });

    if (response.ok) {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  // 추천하기 기능 (미구현 - 나중에 API 연결)
  const handleLike = () => {
    if (hasLiked) {
      setLikeCount(likeCount - 1);
      setHasLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setHasLiked(true);
    }
    // 실제 API 호출 코드는 나중에 구현
  };

  if (loading) return <Spinner />;
  if (!post) return <p className="text-center">해당 글을 찾을 수 없습니다.</p>;

  return (
    <main className="max-w-450 mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* 헤더 영역: 제목(좌측), 조회수/작성시간(우측) */}
        <div className="p-6 border-b border-gray-400">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FiEye className="w-4 h-4" />
                <span>0회</span>
              </div>
              <div className="flex items-center gap-1">
                <FiClock className="w-4 h-4" />
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>
          </div>

          {/* 본문 영역 */}
          <div className="py-4 min-h-60">
            <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
          </div>

          {/* 추천 버튼 영역 */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                hasLiked
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              } transition-colors`}
            >
              <FiThumbsUp className="w-5 h-5" />
              추천하기 {likeCount > 0 && `(${likeCount})`}
            </button>
          </div>

          {/* 관리 버튼 */}
          {user?.id === post.user_id && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeletePost}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                게시글 삭제
              </button>
            </div>
          )}
        </div>

        {/* 댓글 영역 */}
        <div className="p-6 bg-gray-50">
          <div className="flex items-center gap-2 mb-4">
            <FiMessageSquare className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              댓글 {comments.length > 0 && `(${comments.length})`}
            </h2>
          </div>

          {/* 댓글 목록 */}
          <div className="space-y-4 mb-6">
            {comments.length > 0 ? (
              [...comments]
                .sort(
                  (a, b) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
                )
                .map((comment, index) => (
                  <div
                    key={`comment-${comment.id || index}`}
                    className="bg-white p-4 rounded-md shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">
                            {comment.anonymous_name}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-700">
                          {comment.comment_content}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                        {user?.id === comment.user_id && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-gray-400 text-xs hover:text-red-500 cursor-pointer"
                          >
                            삭제
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-6 bg-white rounded-md">
                <p className="text-gray-500">첫 번째 댓글을 작성해보세요!</p>
              </div>
            )}
          </div>

          {user ? (
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex items-stretch gap-2">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요..."
                  className="flex-1 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-auto"
                  rows={3}
                  style={{ minHeight: "80px" }}
                />
                <button
                  onClick={handleCommentSubmit}
                  className="w-28 flex items-center justify-center bg-gray-500 text-white rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <p className="text-xl">작성</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 bg-white rounded-md">
              <p className="text-gray-500">
                로그인 후 댓글을 작성할 수 있습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
