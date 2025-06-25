"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function HomeHeader() {
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
    <header className="w-full py-4 px-6 flex justify-between items-center bg-transparent mb-20">
      {/* 로고 */}
      <Link href="/" className="hover:scale-120 transition duration-500">
        <Image
          src="/Piction_Logo1.png"
          alt="Piction Logo"
          width={120}
          height={80}
          layout="intrinsic"
        />
      </Link>

      {/* 네비게이션 탭 */}
      <nav className="flex items-center text-xl font-medium text-white ml-auto mr-8">
        <Link
          href="/community/category"
          className="group relative px-4 py-2 cursor-pointer transition-colors duration-300"
        >
          <span
            className="
        transition-all duration-300
        group-hover:text-black
        group-hover:scale-110
        inline-block
      "
          >
            커뮤니티
          </span>
          <span
            className="
        absolute left-0 bottom-1 w-full h-0.5
        bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400
        scale-x-0 group-hover:scale-x-100
        transition-transform duration-300 origin-left
        rounded-full
        pointer-events-none
      "
          />
        </Link>
      </nav>

      {/* 유저 정보 or 로그인 버튼 */}
      <div className="flex items-center">
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
