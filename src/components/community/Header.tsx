"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CommunityHeader() {
  const pathname = usePathname();

  const isCategory =
    pathname === "/community" || pathname === "/community/category";
  const isShareStory = pathname === "/community/shareStory";

  return (
    <div className="mb-6">
      <div className="flex items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-800">커뮤니티</h1>
        <div className="flex gap-4 text-lg font-medium">
          <Link
            href="/community/category"
            className={`hover:text-blue-600 transition-colors ${
              isCategory ? "font-bold text-blue-600" : "text-gray-500"
            }`}
          >
            자유게시판
          </Link>
          <Link
            href="/community/shareStory"
            className={`hover:text-blue-600 transition-colors ${
              isShareStory ? "font-bold text-blue-600" : "text-gray-500"
            }`}
          >
            이야기 공유
          </Link>
        </div>
      </div>
    </div>
  );
}
