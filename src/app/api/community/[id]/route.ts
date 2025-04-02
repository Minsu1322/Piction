import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// ✅ 게시글 삭제 API
export async function DELETE(request: NextRequest) {
  // URL에서 ID 추출
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/");
  const id = pathParts[pathParts.length - 1]; // URL의 마지막 부분이 ID

  try {
    const { error } = await supabase.from("community").delete().eq("id", id);

    if (error) {
      console.error("Supabase 삭제 오류:", error);
      return NextResponse.json({ error: "삭제 중 오류 발생" }, { status: 500 });
    }

    return NextResponse.json({ message: "삭제 완료" }, { status: 200 });
  } catch (err) {
    console.error("삭제 처리 중 예외 발생:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
