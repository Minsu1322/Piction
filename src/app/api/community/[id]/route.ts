import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { error } = await supabase.from("community").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: "삭제 중 오류 발생" }, { status: 500 });
  }

  return NextResponse.json({ message: "삭제 완료" }, { status: 200 });
}
