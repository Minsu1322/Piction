"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Header() {
  const { user, clearUser } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearUser();
    router.push("/");
  };

  return (
    <header className="w-full bg-[#4a3d3d] shadow-lg py-4 px-6 flex justify-between items-center">
      {/* 로고 */}
      <Link href="/">
        <Image
          src="/Piction_Logo.png"
          alt="Piction Logo"
          width={120}
          height={40}
          style={{ width: "auto", height: "auto" }}
        />
      </Link>

      {/* 유저 정보 or 로그인 버튼 */}
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-white">{user.user_metadata.full_name}</span>
          <Image
            src={user.user_metadata.avatar_url}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <button
            onClick={handleLogout}
            className="px-2 py-1 bg-red-400 text-white rounded-xl"
          >
            LogOut
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          로그인
        </Link>
      )}
    </header>
  );
}
