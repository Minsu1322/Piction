import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  const { data: posts, error: postsError } = await supabase
    .from("shareStory")
    .select(
      "id, created_at, user_id, story_content, genre, cover_image, story_title"
    );

  if (postsError) {
    return NextResponse.json({ error: postsError.message }, { status: 500 });
  }

  const storyLikesCount = await Promise.all(
    posts.map(async (post) => {
      const { count: likesCount, error: likeError } = await supabase
        .from("story_likes")
        .select("id", { count: "exact", head: true })
        .eq("story_id", post.id);

      if (likeError) {
        console.error("좋아요 수 조회 오류:", likeError);
      }

      return {
        ...post,
        likes_count: likesCount || 0,
      };
    })
  );

  return NextResponse.json(storyLikesCount, { status: 200 });
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
    .from("shareStory")
    .insert([{ title, content }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
