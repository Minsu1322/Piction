// src/components/FaqSection.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "AI가 만든 이야기를 수정할 수 있나요?",
    answer:
      "네, 이야기가 생성된 후에도 원하는 부분을 수정하고 재생성할 수 있습니다. 여러분의 창의력을 더해 더욱 풍부한 이야기를 만들어보세요.",
  },
  {
    question: "이야기의 저작권은 누구에게 있나요?",
    answer:
      "AI로 생성된 이야기의 저작권은 사용자인 여러분에게 있습니다. 개인적인 용도로 자유롭게 사용하실 수 있습니다.",
  },
  {
    question: "내가 입력한 설정과 정보는 안전한가요?",
    answer:
      "네, 사용자의 개인정보와 입력한 설정은 안전하게 보호됩니다. 자세한 내용은 개인정보처리방침을 참고해주세요.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-[#404E89]">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-base text-center mb-12 text-white font-hallym-700"
        >
          자주 묻는 질문
        </motion.h2>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b last:border-b-0">
              <button
                className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium text-lg text-gray-900">
                  {`Q${index + 1}. ${faq.question}`}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#EDF2FF] rounded-md p-4 mb-4 text-gray-700"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
