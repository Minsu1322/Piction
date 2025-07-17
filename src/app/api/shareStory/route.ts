import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10); // 기본값: 1
  const limit = parseInt(searchParams.get("limit") || "10", 10); // 기본값: 10
  const sortOption = searchParams.get("sort") || "latest";

  const offset = (page - 1) * limit;

  let query = supabase
    .from("shareStory")
    .select(
      "id, created_at, user_id, story_content, genre, cover_image, story_title"
    );

  // 정렬 조건에 따른 처리
  if (sortOption === "latest") {
    // 최신순: created_at으로 정렬
    query = query.order("created_at", { ascending: false });
  } else {
    // 추천순, 댓글순: 일단 모든 데이터를 가져와서 JS에서 정렬
    query = query.order("created_at", { ascending: false });
  }

  const { data: posts, error: postsError } = await query;

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

  const sortedPosts = [...storyLikesCount];

  if (sortOption === "recommend") {
    sortedPosts.sort((a, b) => b.likes_count - a.likes_count);
  }

  const paginatedPosts = sortedPosts.slice(offset, offset + limit);
  const totalCount = sortedPosts.length;

  return NextResponse.json(
    { posts: paginatedPosts, totalCount },
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
    .from("shareStory")
    .insert([{ title, content }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
