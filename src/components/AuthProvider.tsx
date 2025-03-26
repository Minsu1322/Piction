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
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

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
      } else if (pathname !== "/login") {
        setShouldRedirect(true);
      }
      setLoading(false);
    };

    fetchUser();

    return () => subscription.unsubscribe();
  }, [setUser, pathname, router]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/login");
    }
  }, [shouldRedirect, router]);

  if (loading) return <Spinner />;

  return <>{children}</>;
}
