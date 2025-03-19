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
    <div className="flex flex-col gap-4 mt-auto">
      {choices.map((choice, index) => {
        const choiceText = choice.replace(/^\d+\.|\d+\)\s*/, "").trim();
        const choiceNumber = index + 1;

        return (
          <button
            key={index}
            onClick={() => onSelect(choice)}
            className="bg-gradient-to-r from-blue-300 to-purple-300 text-black py-3 px-5 rounded-lg text-xl shadow hover:opacity-90 transition active:scale-[0.98]"
          >
            {choiceNumber}. {choiceText}
          </button>
        );
      })}
    </div>
  );
}
