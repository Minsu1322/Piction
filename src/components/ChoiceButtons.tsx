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
        const choiceNumber = index + 1;

        return (
          <button
            key={index}
            onClick={() => onSelect(choice)}
            className="bg-gray-400 text-black cursor-pointer flex-1 py-5 px-6 rounded-xl text-base shadow hover:opacity-75 transition active:scale-[0.98]"
          >
            {choiceNumber}. {choiceText}
          </button>
        );
      })}
    </div>
  );
}
