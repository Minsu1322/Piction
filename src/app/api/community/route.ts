import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  // 커뮤니티 게시글을 가져옵니다
  const { data: posts, error: postsError } = await supabase
    .from("community")
    .select("id, created_at, title");

  if (postsError) {
    return NextResponse.json({ error: postsError.message }, { status: 500 });
  }

  const postsWithCommentCount = await Promise.all(
    posts.map(async (post) => {
      const { count, error: commentError } = await supabase
        .from("comments")
        .select("id", { count: "exact", head: true })
        .eq("community_id", post.id);

      if (commentError) {
        console.error("댓글 수 조회 오류:", commentError);
        return { ...post, comment_count: 0 };
      }

      return {
        ...post,
        comment_count: count || 0,
      };
    })
  );

  return NextResponse.json(postsWithCommentCount, { status: 200 });
}

export async function POST(req: Request) {
  const { title, content, user_id } = await req.json();

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
