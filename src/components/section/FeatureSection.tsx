"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FeatureSection() {
  return (
    <section className="py-20 relative " style={{ fontFamily: "serif" }}>
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
                <video
                  src="/sequence1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full p-4"
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
                <video
                  src="/sequence1-2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full p-4"
                />
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
                <video
                  src="/sequence1-3.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full p-4"
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
                <video
                  src="/sequence1-4.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full p-4"
                />
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
        <Image
          src="/main-image-back.jpg"
          alt="메인 배경"
          width={1920}
          height={550}
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
            maskImage: "linear-gradient(to top, black 60%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 60%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}
