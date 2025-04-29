import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  const { data: posts, error: postsError } = await supabase
    .from("community")
    .select("id, created_at, content, title");

  if (postsError) {
    return NextResponse.json({ error: postsError.message }, { status: 500 });
  }

  const postsWithCommentAndLikesCount = await Promise.all(
    posts.map(async (post) => {
      const { count: commentCount, error: commentError } = await supabase
        .from("comments")
        .select("id", { count: "exact", head: true })
        .eq("community_id", post.id);

      if (commentError) {
        console.error("댓글 수 조회 오류:", commentError);
        return { ...post, comment_count: 0 };
      }

      const { count: likesCount, error: likeError } = await supabase
        .from("likes")
        .select("id", { count: "exact", head: true })
        .eq("community_id", post.id);

      if (likeError) {
        console.error("좋아요 수 조회 오류:", likeError);
      }

      return {
        ...post,
        comment_count: commentCount || 0,
        likes_count: likesCount || 0,
      };
    })
  );

  return NextResponse.json(postsWithCommentAndLikesCount, { status: 200 });
}

export async function POST(req: Request) {
  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json(
      { error: "모든 필드를 입력해주세요." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("community")
    .insert([{ title, content }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
