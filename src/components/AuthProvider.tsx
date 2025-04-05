"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabaseClient";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "./LoadingComponents/LoginLoading";

const PROTECTED_ROUTES = ["/story/new", "/community", "/story/play"];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // 경로 보호 확인 함수
  const isProtectedRoute = (path: string) => {
    return PROTECTED_ROUTES.some(
      (route) => path === route || path.startsWith(`${route}/`)
    );
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();

    return () => subscription.unsubscribe();
  }, [setUser]);

  // 별도의 useEffect에서 인증과 리다이렉트 처리
  useEffect(() => {
    // 로딩 중이면 아직 처리하지 않음
    if (loading) return;

    // 사용자가 없고 보호된 경로에 있으면 즉시 리다이렉트
    if (!user && isProtectedRoute(pathname)) {
      console.log("사용자 미인증 상태에서 보호된 경로 접근. 리다이렉트 실행");
      router.push("/login");
    }
  }, [loading, user, pathname, router]);

  if (loading) return <Spinner />;

  return <>{children}</>;
}
