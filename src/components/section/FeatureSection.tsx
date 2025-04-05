// src/components/FeatureSection.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  BookOpenIcon,
  UserGroupIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: <SparklesIcon className="w-8 h-8 text-blue-600" />,
    title: "간단한 설정",
    description:
      "짧은 세계관만으로도 충분히 흥미로운 이야기를 시작할 수 있어요.",
    color: "bg-blue-100",
  },
  {
    icon: <BookOpenIcon className="w-8 h-8 text-purple-600" />,
    title: "AI 스토리 생성",
    description:
      "매번 다른 이야기를 경험하세요. 동일한 설정에서도 새로운 이야기가 탄생합니다.",
    color: "bg-purple-100",
  },
  {
    icon: <UserGroupIcon className="w-8 h-8 text-blue-600" />,
    title: "이야기의 방향을 선택",
    description: "중요한 순간마다 당신의 선택이 이야기의 방향을 결정합니다.",
    color: "bg-green-100",
  },
  {
    icon: <FireIcon className="w-8 h-8 text-purple-600" />,
    title: "예측할 수 없는 결말",
    description: "당신의 선택에 따라 달라지는 다양한 결말을 경험해보세요.",
    color: "bg-red-100",
  },
];

export default function FeatureSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-4">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          누구나 쉽게 이야기를 만들어보세요
        </motion.h2>

        <div className="bg-gray-500 rounded-xl p-2 shadow-md">
          <div className="flex flex-col md:flex-row">
            {/* 좌측: Features 세로 배치 */}
            <div className="w-full md:w-1/2 flex flex-col space-y-0 pr-0">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  className={`${
                    activeIndex === index ? "bg-gray-200" : "bg-gray-500"
                  } p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
                    index === 0 ? "rounded-t-xl" : ""
                  } ${index === features.length - 1 ? "rounded-b-2xl" : ""}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      activeIndex === index ? "text-gray-900" : "text-gray-100"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`${
                      activeIndex === index ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* 우측: 이미지 영역 */}
            <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`w-full h-auto ${features[activeIndex].color} rounded-lg flex items-center justify-center`}
              >
                <p className="text-gray-700 font-bold text-xl">
                  {features[activeIndex].title} 이미지
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
