"use client";

type Props = {
  onSelect: (preset: string) => void;
};

const presets = [
  {
    title: "중세 판타지 왕국",
    icon: "🏰", // 성 아이콘
  },
  {
    title: "사이버펑크 도시",
    icon: "🌆", // 도시 야경 아이콘
  },
  {
    title: "우주 탐험",
    icon: "🚀", // 로켓 아이콘
  },
  {
    title: "좀비 아포칼립스",
    icon: "🧟", // 좀비 아이콘
  },
  {
    title: "마법 학교",
    icon: "🧙", // 마법사 아이콘
  },
  {
    title: "무협 판타지",
    icon: "⚔️", // 검 아이콘
  },
];

export default function StoryPresets({ onSelect }: Props) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {presets.map((preset) => (
          <button
            key={preset.title}
            onClick={() => onSelect(preset.title)}
            className="p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-50 transition duration-200 text-sm md:text-base border border-gray-200 shadow-sm flex flex-col items-center justify-center h-24 hover:border-blue-300 hover:shadow-md"
          >
            <span className="text-2xl mb-2 text-blue-600">{preset.icon}</span>
            <span className="text-xl">{preset.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
