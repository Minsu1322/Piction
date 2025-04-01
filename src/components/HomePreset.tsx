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
  const { setWorldSetting, setStoryLength } = useStoryStore();

  const handlePresetClick = (world: string, length: number) => {
    setWorldSetting(world);
    setStoryLength(length);
    router.push("/story/play");
  };

  return (
    <div className="w-full min-h-screen py-16 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            AI와 함께 쓰는 당신만의 이야기
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            당신의 선택, AI가 당신만의 소설로 만들어 드립니다.
          </motion.p>

          <button
            onClick={() => router.push("/story/new")}
            className="flex-1 mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 cursor-pointer px-28 rounded-lg font-medium hover:bg-gray-200 transition-all"
          >
            나만의 이야기 만들기
          </button>
        </div>

        {/* Featured Story Card */}
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          modules={[Autoplay]}
        >
          {presets.map(
            ({ id, title, shortDescription, world, length, image, tags }) => (
              <SwiperSlide key={id}>
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col lg:flex-row"
                >
                  {/* Left: Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="w-full lg:w-2/5 h-80 lg:h-auto relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      priority={id === 1}
                    />
                    <div className="absolute bottom-6 left-6 z-20">
                      <div className="flex gap-2 mb-2">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium py-1 px-3 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Right: Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded">
                          추천
                        </span>
                        <span className="ml-2 text-sm text-gray-500 flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" /> 분량: {length}
                        </span>
                      </div>

                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                        {title}
                      </h2>
                      <p className="text-lg text-gray-700 mb-3 font-medium">
                        {shortDescription}
                      </p>

                      <div className="bg-gray-50 rounded-xl p-6 mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                          <BookOpenIcon className="w-5 h-5 mr-2 text-blue-600" />
                          줄거리
                        </h3>
                        <p className="text-gray-600 leading-relaxed line-clamp-4">
                          {world}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                        onClick={() => handlePresetClick(world, length)}
                      >
                        <PlayIcon className="w-5  h-5" /> 프리셋으로 시작하기
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
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
