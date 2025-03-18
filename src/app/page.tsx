"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Nanum_Pen_Script } from "next/font/google";
const nanumFont = Nanum_Pen_Script({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {" "}
      {/* 스크롤 방지 */}
      {/* 펼쳐진 책 이미지 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-[1200px] h-[850px]"
      >
        {/* 책 이미지 */}
        <Image
          src="/Book-Image.png"
          alt="펼쳐진 책"
          fill
          className="object-contain"
        />

        {/* 책의 왼쪽 페이지 내용 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute left-0 w-1/2 h-full flex flex-col items-start justify-start p-8 pl-40 pt-12"
        >
          <h1
            className={`text-4xl font-bold text-black text-left ${nanumFont.className} leading-loose`}
          >
            <p>이 책은 당신의 상상력을 기다립니다.</p>
            <p>새로운 이야기가 시작되고,</p>
            <p>무수한 가능성이 펼쳐집니다.</p>
            <p>새로운 세계가 열리고,</p>
            <p>당신만의 특별한 모험이 기다립니다.</p>
            <p>지금, 당신의 이야기를 써보세요.</p>
            <p>모든 선택은 새로운 시작이 됩니다.</p>
            <p>이제 당신만의 이야기를 만들어보세요!</p>
          </h1>
        </motion.div>

        {/* 책의 오른쪽 페이지 내용 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute right-0 w-1/2 h-full flex items-center justify-center p-8"
        >
          <button
            onClick={() => router.push("/story/new")}
            className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition"
          >
            스토리 만들기
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
