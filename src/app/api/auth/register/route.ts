import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const formData = await request.json();
  const email = formData.email;
  const password = formData.password;
  const name = formData.name;

  // 쿠키를 통해 supabase 클라이언트 생성
  const supabase = createRouteHandlerClient({ cookies });

  // 회원가입 처리
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
      },
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    message: "회원가입 이메일이 발송되었습니다. 이메일을 확인해주세요.",
    data,
  });
}
