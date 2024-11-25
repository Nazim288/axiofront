"use client";
import React, { useState } from "react";

interface QuestionProps {
  questionText: string;
  questionNumber: number;
  onSelect: (value: number) => void;
}

const Question: React.FC<QuestionProps> = ({
  questionText,
  questionNumber,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    setSelectedOption(value);
    onSelect(value);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-xl text-center">{questionText}</h3>
      <div className="flex justify-between w-[80%]">
        {Array.from({ length: 10 }, (_, index) => (
          <label key={index} className="inline-flex items-center mt-3">
            <input
              type="radio"
              className="hidden"
              name={`question-${questionNumber}`}
              value={index + 1}
              onChange={handleChange}
            />
            <span
              className={`w-[60px] h-[60px] inline-block mr-2 rounded-full border-2 border-black shadow-inner relative hover:scale-125 transition-transform duration-300 ease-in-out ${
                selectedOption === index + 1 ? "bg-primary" : "bg-transparent"
              }`}
            ></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
