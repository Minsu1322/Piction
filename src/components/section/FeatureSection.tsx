// src/components/FeatureSection.jsx
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
    title: "이야기를 입력해보세요",
    description:
      "간단한 프롬프트만 입력하면 AI가 당신만의 이야기를 만들어드립니다.",
  },
  {
    icon: <BookOpenIcon className="w-8 h-8 text-purple-600" />,
    title: "랜덤한 스토리",
    description:
      "매번 다른 스토리를 경험하세요. 동일한 설정에서도 새로운 이야기가 탄생합니다.",
  },
  {
    icon: <UserGroupIcon className="w-8 h-8 text-blue-600" />,
    title: "사용자의 선택",
    description:
      "이야기의 중요한 순간마다 당신의 선택이 이야기의 방향을 결정합니다.",
  },
  {
    icon: <FireIcon className="w-8 h-8 text-purple-600" />,
    title: "예측할 수 없는 결말",
    description: "당신의 선택에 따라 달라지는 다양한 결말을 경험해보세요.",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-4 ">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          누구나 쉽게 이야기를 만들어보세요
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              className="bg-gray-50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-2 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
