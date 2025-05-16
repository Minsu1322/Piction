import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shareStoryId = searchParams.get("shareStoryId");

  if (!shareStoryId) {
    return NextResponse.json(
      { error: "shareStoryId is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("story_likes")
    .select("user_id")
    .eq("story_id", shareStoryId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ users: data }, { status: 200 });
}

export async function POST(req: Request) {
  const { shareStoryId, userId } = await req.json();

  // 사용자가 이미 좋아요를 눌렀는지 확인
  const { data: existingLike, error } = await supabase
    .from("story_likes")
    .select("*")
    .eq("story_id", shareStoryId)
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows found
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (existingLike) {
    // 이미 누른 경우: 좋아요 삭제
    const { error: deleteError } = await supabase
      .from("story_likes")
      .delete()
      .eq("id", existingLike.id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ liked: false }, { status: 200 });
  } else {
    // 안 누른 경우: 좋아요 추가
    const { error: insertError } = await supabase
      .from("story_likes")
      .insert({ story_id: shareStoryId, user_id: userId });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ liked: true }, { status: 201 });
  }
}
