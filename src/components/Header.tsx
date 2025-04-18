"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function Header() {
  const { user, clearUser } = useAuthStore();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearUser();
    router.push("/");
    console.log(user);
  };

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white shadow-md">
      {/* 로고 */}
      <Link href="/">
        <Image
          src="/Logo.png"
          alt="Piction Logo"
          width={120}
          height={40}
          style={{ width: "auto", height: "auto" }}
        />
      </Link>

      {/* 네비게이션 탭 */}
      <nav className="flex items-center text-lg font-medium text-gray-800 ml-auto mr-8">
        <Link
          href="/community/category"
          className="px-4 py-2 transition cursor-pointer hover:text-purple-500"
        >
          커뮤니티
        </Link>
      </nav>

      {/* 유저 정보 or 로그인 버튼 */}
      <div className="flex items-center">
        <button
          onClick={() => router.push("/story/new")}
          className="px-4 py-2 mr-4 font-semibold text-gray-800 transition cursor-pointer hover:text-blue-500"
        >
          Start Story
        </button>

        {user ? (
          <div className="relative">
            <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
              {user?.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium cursor-pointer">
                  {user.data.user.user_metadata.name
                    ? user.data.user.user_metadata.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-24 bg-white border border-gray-300 rounded-md shadow-lg">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-black text-center hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  LogOut
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
}
