"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabaseClient";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "./LoadingComponents/LoginLoading";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

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
      if (user) setUser(user);
      setLoading(false);
    };

    fetchUser();

    return () => subscription.unsubscribe();
  }, [setUser]);

  if (loading) return <Spinner />;

  // 로그인 페이지에서는 리디렉션 안 하도록 예외 처리
  if (!user && pathname !== "/login") {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
}
