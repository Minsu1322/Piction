"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/authStore";
import { Comment } from "@/components/types/types";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

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
      setComments(data); // ✅ 서버에서 받은 익명번호를 유지
    };

    if (id) {
      fetchPost();
      fetchComments();
    }
  }, [id]);

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

    const newCommentData = await response.json();
    setNewComment("");

    const commentsResponse = await fetch(
      `/api/community/comments?community_id=${id}`
    );
    const updatedComments = await commentsResponse.json();
    setComments(updatedComments);
  };
  // ✅ 댓글 삭제
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

  if (loading) return <p className="text-center">로딩 중...</p>;
  if (!post) return <p className="text-center">해당 글을 찾을 수 없습니다.</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-gray-700 mt-2">{post.content}</p>
        <p className="text-sm text-gray-500 mt-4">
          작성일: {new Date(post.created_at).toLocaleString()}
        </p>
      </div>

      {/* ✅ 댓글 입력 */}
      {user && (
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            댓글 작성
          </button>
        </div>
      )}

      {/* ✅ 댓글 목록 */}
      <div className="mt-6 p-4 border rounded-md">
        <h2 className="text-lg font-semibold">댓글</h2>
        {comments.map((comment, index) => (
          <div
            key={`comment-${comment.id || index}`}
            className="border-b py-2 flex justify-between text-sm"
          >
            <p>
              <strong>{comment.anonymous_name}</strong>:{" "}
              {comment.comment_content}
            </p>
            {user?.id === comment.user_id && (
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="text-gray-400 text-xs"
              >
                삭제
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
