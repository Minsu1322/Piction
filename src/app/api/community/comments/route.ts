import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// 특정 게시글의 댓글 조회
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const communityId = searchParams.get("community_id");

  if (!communityId) {
    return NextResponse.json(
      { error: "community_id가 필요합니다." },
      { status: 400 }
    );
  }

  const { data: comments, error } = await supabase
    .from("comments")
    .select("id, created_at, user_id, comment_content")
    .eq("community_id", communityId)
    .order("created_at");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // user_id별 익명번호 부여
  const anonymousMap = new Map();
  let count = 1;

  const commentsWithAnonymous = comments.map((comment) => {
    if (!anonymousMap.has(comment.user_id)) {
      anonymousMap.set(comment.user_id, count++);
    }
    return {
      ...comment,
      anonymous_name: `익명${anonymousMap.get(comment.user_id)}`,
    };
  });

  return NextResponse.json(commentsWithAnonymous, { status: 200 });
}

// 댓글 작성
export async function POST(req: Request) {
  const { comment_content, community_id, user_id } = await req.json();

  if (!comment_content || !community_id || !user_id) {
    return NextResponse.json(
      { error: "모든 필드를 입력하세요." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("comments")
    .insert([{ comment_content, community_id, user_id }])
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || [], { status: 201 });
}

// 댓글 삭제
export async function DELETE(req: Request) {
  const { comment_id, user_id } = await req.json();

  if (!comment_id || !user_id) {
    return NextResponse.json(
      { error: "댓글 ID와 사용자 ID가 필요합니다." },
      { status: 400 }
    );
  }

  // 댓글 작성자만 삭제 가능하도록 체크
  const { data: comment, error: fetchError } = await supabase
    .from("comments")
    .select("user_id")
    .eq("id", comment_id)
    .single();

  if (fetchError || !comment) {
    return NextResponse.json(
      { error: "댓글을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  if (comment.user_id !== user_id) {
    return NextResponse.json(
      { error: "본인이 작성한 댓글만 삭제할 수 있습니다." },
      { status: 403 }
    );
  }

  // 댓글 삭제
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", comment_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
