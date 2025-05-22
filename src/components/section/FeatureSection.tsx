"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

export default function FeatureSection() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "//cdn.jsdelivr.net/npm/font-kopubworld@1.0/batang.min.css";
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <section
      className="py-20 relative"
      style={{ fontFamily: "KoPub Batang, serif" }}
    >
      <div className="max-w-screen-lg mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center mb-24 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-hallym-700"
        >
          누구나 쉽게 이야기를 만들어보세요
        </motion.h2>

        {/* Feature 1: 좌측 이미지, 우측 텍스트 */}
        <div className="mb-48">
          <div className="flex flex-col md:flex-row items-center gap-28">
            {/* 좌측 이미지 */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-white rounded-2xl h-80 flex items-center justify-center shadow-xl overflow-hidden"
              >
                <Image
                  src="/featureSection_img01.png"
                  alt="Feature Image 1"
                  fill
                  className="object-cover p-4"
                  priority
                />
              </motion.div>
            </div>

            {/* 우측 텍스트 */}
            <div className="w-full md:w-1/2 md:pl-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -top-12 left-0">
                  <span className="text-5xl font-light text-gray-300 tracking-tighter">
                    01
                  </span>
                </div>
                <div className="pt-28">
                  <h3 className="text-3xl font-bold mb-6 text-blue-600">
                    간단한 설정
                  </h3>
                  <p className="text-gray-600 text-lg">
                    짧은 세계관만으로도 <br />
                    충분히 흥미로운 이야기를 시작할 수 있어요.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Feature 2: 우측 이미지, 좌측 텍스트 */}
        <div className="mb-48">
          <div className="flex flex-col md:flex-row-reverse items-center gap-28">
            {/* 우측 이미지 */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl h-80 flex items-center justify-center shadow-xl overflow-hidden"
              >
                <p className="text-gray-700 font-bold text-xl">이미지 2</p>
              </motion.div>
            </div>

            {/* 좌측 텍스트 */}
            <div className="w-full md:w-1/2 md:pr-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -top-12 left-0">
                  <span className="text-5xl font-light text-gray-300 tracking-tighter">
                    02
                  </span>
                </div>
                <div className="pt-28">
                  <h3 className="text-3xl font-bold mb-6 text-blue-600">
                    AI 스토리 생성
                  </h3>
                  <p className="text-gray-600 text-lg">
                    매번 다른 이야기를 경험하세요. <br />
                    동일한 설정에서도 새로운 이야기가 탄생합니다.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Feature 3: 좌측 이미지, 우측 텍스트 */}
        <div className="mb-48">
          <div className="flex flex-col md:flex-row items-center gap-28">
            {/* 좌측 이미지 */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl h-80 flex items-center justify-center shadow-xl overflow-hidden"
              >
                <p className="text-gray-700 font-bold text-xl">이미지 3</p>
              </motion.div>
            </div>

            {/* 우측 텍스트 */}
            <div className="w-full md:w-1/2 md:pl-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -top-12 left-0">
                  <span className="text-5xl font-light text-gray-300 tracking-tighter">
                    03
                  </span>
                </div>
                <div className="pt-28">
                  <h3 className="text-3xl font-bold mb-6 text-blue-600">
                    이야기의 방향을 선택
                  </h3>
                  <p className="text-gray-600 text-lg">
                    중요한 순간마다 <br />
                    당신의 선택이 이야기의 방향을 결정합니다.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Feature 4: 우측 이미지, 좌측 텍스트 */}
        <div className="mb-100">
          <div className="flex flex-col md:flex-row-reverse items-center gap-28">
            {/* 우측 이미지 */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl h-80 flex items-center justify-center shadow-xl overflow-hidden"
              >
                <p className="text-gray-700 font-bold text-xl">이미지 4</p>
              </motion.div>
            </div>

            {/* 좌측 텍스트 */}
            <div className="w-full md:w-1/2 md:pr-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -top-12 left-0">
                  <span className="text-5xl font-light text-gray-300 tracking-tighter">
                    04
                  </span>
                </div>
                <div className="pt-28">
                  <h3 className="text-3xl font-bold mb-6 text-blue-600">
                    예측할 수 없는 결말
                  </h3>
                  <p className="text-gray-600 text-lg">
                    당신의 선택이 이끄는, <br />
                    다양한 결말을 경험해보세요.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* === 배경 이미지 추가 === */}
      <div className="absolute left-0 right-0 bottom-0 w-full h-[550px] pointer-events-none z-0 overflow-hidden">
        <img
          src="/main-image-back.svg"
          alt="메인 배경"
          className="
      w-full
      h-full
      object-cover
      opacity-100
      mask-gradient-blur
      transition-all
      duration-500
      scale-115
    "
          draggable={false}
          style={{
            // mask-image 효과를 위한 fallback
            maskImage: "linear-gradient(to top, black 60%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 60%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}
