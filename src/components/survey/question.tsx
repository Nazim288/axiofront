"use client";
import React, { useState } from "react";

interface QuestionProps {
  questionText: string;
  questionNumber: number;
  onAnswerChange: (questionNumber: number, answer: number) => void;
}

const Question: React.FC<QuestionProps> = ({
  questionText,
  questionNumber,
  onAnswerChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  //   const handleChange = (index: number) => {
  //     setSelectedOption(index);
  //     onAnswerChange(questionNumber, index);
  //   };

  const handleChange = (value: number) => {
    setSelectedOption(value);
    onAnswerChange(questionNumber, value);
  };

  return (
    <div className="w-full flex flex-col items-center ">
      <h3 className="text-xl text-center">{questionText}</h3>
      <div className="flex justify-between w-[80%]">
        {Array.from({ length: 10 }, (_, index) => (
          <label key={index} className="inline-flex items-center mt-3">
            <input
              type="radio"
              className="hidden"
              name={`question-${questionNumber}`}
              value={index + 1}
              onChange={() => handleChange(index + 1)}
              //   onChange={(e) => handleChange(parseInt(e.target.value))}
            />
            <span className="w-[60px] h-[60px] inline-block mr-2 rounded-full border-2 border-black shadow-inner relative hover:scale-125 transition-transform duration-300 ease-in-out">
              <span
                className={`absolute inset-0.5 rounded-full ${
                  selectedOption === index + 1 ? "bg-primary" : "bg-transparent"
                }`}
              ></span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
