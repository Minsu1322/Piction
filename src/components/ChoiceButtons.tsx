import React from "react";

interface ChoiceButtonsProps {
  choices: string[];
  onSelect: (choice: string) => void;
}

export default function ChoiceButtons({
  choices,
  onSelect,
}: ChoiceButtonsProps) {
  return (
    <div className="flex gap-4">
      {choices.map((choice, index) => {
        const choiceText = choice.replace(/^\d+\.|\d+\)\s*/, "").trim();

        return (
          <button
            key={index}
            onClick={() => onSelect(choice)}
            className="bg-white text-black cursor-pointer flex-1 py-20 px-6 rounded-xl text-lg shadow hover:opacity-75 hover:text-[#385DD9] transition active:scale-[0.98]"
          >
            {choiceText}
          </button>
        );
      })}
    </div>
  );
}
