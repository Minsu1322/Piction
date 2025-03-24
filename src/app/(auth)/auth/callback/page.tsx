"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/authStore";
import Spinner from "@/components/LoadingComponents/LoginLoading";

export default function AuthCallback() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("세션 가져오기 오류:", error);
      } else if (user) {
        setUser(user);
        router.push("/");
      }
    };

    fetchSession();
  }, [setUser, router]);

  return <Spinner />;
}
