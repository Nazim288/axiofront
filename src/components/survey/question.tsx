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
    <div className="w-full flex flex-col items-center gap-6">
      <h3 className="text-xl text-center px-4 md:px-8">{questionText}</h3>
      <div className="w-full px-2 md:px-0 md:w-[80%]">
        <div className="flex justify-between items-center w-full">
          {Array.from({ length: 10 }, (_, index) => (
            <label
              key={index}
              className="inline-flex items-center"
              title={`Значение ${index + 1}`}
            >
              <input
                type="radio"
                className="hidden"
                name={`question-${questionNumber}`}
                value={index + 1}
                onChange={handleChange}
              />
              <span
                className={`w-[28px] h-[28px] sm:w-[35px] sm:h-[35px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] 
                  inline-block rounded-full border-2 border-black shadow-inner relative 
                  hover:scale-110 transition-transform duration-300 ease-in-out 
                  ${
                    selectedOption === index + 1
                      ? "bg-primary"
                      : "bg-transparent"
                  }
                  cursor-pointer
                `}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
