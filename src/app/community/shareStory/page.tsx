"use client";

import CommunityHeader from "@/components/community/Header";

export default function ShareStoryPage() {
  return (
    <div className="max-w-350 mx-auto p-6">
      {/* 헤더 */}
      <CommunityHeader />

      {/* 장르 선택 UI */}
      <div className="flex flex-wrap gap-3 mb-6 text-sm font-medium text-gray-600">
        <button className="px-4 py-2 cursor-pointer rounded-full border border-gray-300 hover:bg-blue-100 hover:text-blue-600 transition">
          전체
        </button>
        <button className="px-4 py-2 cursor-pointer rounded-full border border-gray-300 hover:bg-blue-100 hover:text-blue-600 transition">
          로맨스
        </button>
        <button className="px-4 py-2 cursor-pointer rounded-full border border-gray-300 hover:bg-blue-100 hover:text-blue-600 transition">
          판타지
        </button>
        <button className="px-4 py-2 cursor-pointer rounded-full border border-gray-300 hover:bg-blue-100 hover:text-blue-600 transition">
          스릴러
        </button>
        <button className="px-4 py-2 cursor-pointer rounded-full border border-gray-300 hover:bg-blue-100 hover:text-blue-600 transition">
          힐링
        </button>
      </div>

      {/* 이야기 카드 리스트 (1개만 구현) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
          {/* 표지 이미지 */}
          <div className="h-40 bg-gray-200">
            <img
              src="https://via.placeholder.com/300x160"
              alt="표지 이미지"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 제목 & 줄거리 */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 truncate">
              이야기의 제목
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              여기에 줄거리 요약이 들어갑니다. 두 줄을 초과하면 말줄임표로
              처리됩니다. 이야기의 분위기나 핵심 내용을 간단히 보여줍니다.
            </p>
          </div>

          {/* 하단: 장르 태그 + 추천수 */}
          <div className="flex justify-between items-center px-4 pb-4">
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              로맨스
            </span>
            <span className="text-sm text-gray-500">추천수 10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
