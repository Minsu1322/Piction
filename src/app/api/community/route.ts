import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10); // 기본값: 1
  const limit = parseInt(searchParams.get("limit") || "10", 10); // 기본값: 10
  const offset = (page - 1) * limit;

  const { data: posts, error: postsError } = await supabase
    .from("community")
    .select("id, created_at, content, title")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1); // 페이지 범위

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

  const { count: totalCount } = await supabase
    .from("community")
    .select("id", { count: "exact", head: true });

  return NextResponse.json(
    { posts: postsWithCommentAndLikesCount, totalCount },
    { status: 200 }
  );
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
