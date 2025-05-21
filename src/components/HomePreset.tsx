"use client";

import { useRouter } from "next/navigation";
import { useStoryStore } from "@/store/storyStore";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlayIcon, BookOpenIcon, ClockIcon } from "lucide-react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { presets } from "./Preset.tsx";

export default function HomePreset() {
  const router = useRouter();
  const { setWorldSetting, setStoryLength, setGenreSetting } = useStoryStore();

  const handlePresetClick = (world: string, length: number, tags: string[]) => {
    setWorldSetting(world);
    setStoryLength(length);
    setGenreSetting(tags);
    router.push("/story/play");
  };

  return (
    <div
      className="w-full py-16"
      style={{
        backgroundImage: 'url("/main-image-large 1.svg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        height: "680px",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/main-image-large 1.svg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
        }}
      ></div>
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "50px",
          background: "linear-gradient(to bottom, transparent, #EDF2FF)",
        }}
      ></div>
      <div className="mx-auto relative">
        {/* Main Hero Section */}
        <div className="text-center mb-16 z-50">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl mb-6 bg-clip-text text-white bg-black"
          >
            당신의 선택으로 펼쳐지는 이야기를 만들어보세요!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-white max-w-3xl mx-auto"
          >
            AI 기술을 활용하여 누구나 쉽게 자신만의 이야기를 만들 수 있는
            서비스입니다. <br />
            당신의 상상력과 AI의 창의성이 만나 무한한 이야기의 세계를
            경험해보세요.
          </motion.p>

          <button
            onClick={() => router.push("/story/new")}
            className="flex-1 mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 cursor-pointer px-12 rounded-lg font-medium hover:bg-gray-200 transition-all"
          >
            모험 시작하기
          </button>
        </div>

        {/* Featured Story Card */}
        <Swiper
          spaceBetween={0}
          slidesPerView="auto"
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="py-4"
        >
          {presets.map(
            ({ id, title, shortDescription, world, length, image, tags }) => (
              <SwiperSlide
                key={id}
                className="px-0"
                style={{
                  width: "auto",
                  transition: "all 300ms ease",
                }}
              >
                {({ isActive }) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isActive ? 1 : 0.6,
                      y: 0,
                      scale: isActive ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`overflow-hidden shadow-md transition-all bg-white duration-300 ${
                      isActive
                        ? "w-[900px] h-[390px] rounded-2xl"
                        : "w-[250px] h-[350px] rounded-xl"
                    }`}
                  >
                    {isActive ? (
                      // 활성 슬라이드일 때 전체 콘텐츠 표시
                      <div className="flex flex-col lg:flex-row h-full">
                        {/* 왼쪽: 콘텐츠 */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 1 }}
                          className="w-full lg:w-3/5 p-6 flex flex-col justify-between"
                        >
                          {/* 태그 */}
                          <div className="flex gap-2 mb-2">
                            {tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* 제목 */}
                          <div>
                            <h2 className="text-2xl lg:text-2xl font-bold text-gray-900 mb-2">
                              {title}
                            </h2>

                            {/* 짧은 설명 */}
                            <p className="text-base text-gray-700 mb-4 font-medium">
                              {shortDescription}
                            </p>

                            <div className="rounded-lg p-2 mb-4">
                              <h3 className="text-base font-medium text-gray-900 mb-2 flex items-center">
                                <BookOpenIcon className="w-4 h-4 mr-2 text-blue-600" />
                                줄거리
                              </h3>
                              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                {world}
                              </p>
                            </div>

                            <div className="flex items-center text-xs text-gray-500 mb-4">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              분량: {length}
                            </div>
                          </div>

                          {/* 버튼 */}
                          <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                              onClick={() =>
                                handlePresetClick(world, length, tags)
                              }
                            >
                              <PlayIcon className="w-4 h-4" />
                              추천 스토리로 시작
                            </motion.button>
                          </div>
                        </motion.div>

                        {/* 오른쪽: 이미지 */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="w-full lg:w-3/5 h-full relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
                          <Image
                            src={image}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover"
                            priority={id === 1}
                          />
                        </motion.div>
                      </div>
                    ) : (
                      // 비활성 슬라이드일 때 세로로 긴 이미지만 표시
                      <div className="w-full h-full relative overflow-hidden">
                        <Image
                          src={image}
                          alt={title}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                      </div>
                    )}
                  </motion.div>
                )}
              </SwiperSlide>
            )
          )}
        </Swiper>

        {/* More stories can be added here as a grid */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-6">
            더 많은 이야기의 세계가 기다리고 있습니다
          </p>
        </div>
      </div>
    </div>
  );
}
