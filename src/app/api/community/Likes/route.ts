import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const communityId = searchParams.get("communityId");

  if (!communityId) {
    return NextResponse.json(
      { error: "communityId is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("likes")
    .select("user_id")
    .eq("community_id", communityId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ users: data }, { status: 200 });
}

export async function POST(req: Request) {
  const { communityId, userId } = await req.json();

  // 사용자가 이미 좋아요를 눌렀는지 확인
  const { data: existingLike, error } = await supabase
    .from("likes")
    .select("*")
    .eq("community_id", communityId)
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows found
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (existingLike) {
    // 이미 누른 경우: 좋아요 삭제
    const { error: deleteError } = await supabase
      .from("likes")
      .delete()
      .eq("id", existingLike.id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ liked: false }, { status: 200 });
  } else {
    // 안 누른 경우: 좋아요 추가
    const { error: insertError } = await supabase
      .from("likes")
      .insert({ community_id: communityId, user_id: userId });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ liked: true }, { status: 201 });
  }
}
