// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   const formData = await request.json();
//   const email = formData.email;
//   const password = formData.password;

//   const supabase = createRouteHandlerClient({ cookies });

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }

//   return NextResponse.json({
//     message: "로그인 성공",
//     data,
//   });
// }
