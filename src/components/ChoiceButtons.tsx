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
    <div className="choice-buttons mb-12">
      <h3 className="text-2xl font-bold">✨ 선택지</h3>
      <div className="flex flex-col gap-4">
        {choices.map((choice, index) => {
          const choiceText = choice.replace(/^\d+\.|\-|\d+\)\s*/, "").trim();
          const choiceNumber = (index + 1).toString();

          return (
            <button
              key={index}
              onClick={() => onSelect(choice)}
              className="choice-button bg-gradient-to-r from-brown-500 cursor-pointer to-brown-700 text-black py-3 px-6 rounded-lg shadow-md hover:from-brown-600 hover:to-brown-800 transition-all duration-200 flex items-center text-left border-2 border-transparent hover:border-brown-300 active:scale-98"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white text-2xl text-brown-700 rounded-full h-10 w-10 flex items-center justify-center font-semibold flex-shrink-0">
                  {choiceNumber}
                </div>
                <span className="text-2xl">{choiceText}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
