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
  };

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
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

      {/* 유저 정보 or 로그인 버튼 */}
      <button
        onClick={() => router.push("/story/new")}
        className="px-4 ml-auto cursor-pointer py-2 mr-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-sm transition"
      >
        Start Story
      </button>

      {user ? (
        <div className="relative">
          <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
            <Image
              src={user.user_metadata.avatar_url}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full mt-2 right-0 w-24 bg-white border border-gray-300 rounded-md shadow-lg">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-black text-center hover:bg-gray-100 rounded-md"
              >
                LogOut
              </button>
            </div>
          )}
        </div>
      ) : (
        <p></p>
      )}
    </header>
  );
}
