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
    question: "어떤 장르의 이야기를 만들 수 있나요?",
    answer:
      "판타지, SF, 로맨스, 미스터리 등 다양한 장르의 이야기를 만들 수 있습니다. 장르 조합도 가능하니 원하는 설정을 자유롭게 시도해보세요.",
  },
  {
    question: "이야기는 얼마나 길게 만들 수 있나요?",
    answer:
      "단편 소설부터 장편 소설까지 원하는 길이로 설정 가능합니다. 이야기가 진행되면서 길이를 조절할 수도 있습니다.",
  },
  {
    question: "내가 입력한 설정과 정보는 안전한가요?",
    answer:
      "네, 사용자의 개인정보와 입력한 설정은 안전하게 보호됩니다. 자세한 내용은 개인정보처리방침을 참고해주세요.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-gray-900"
        >
          자주 묻는 질문
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium text-lg text-gray-900">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    activeIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "pb-6 max-h-40" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
