"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import {
  motionEase,
  surveyCircleItem,
  surveyCirclesContainer,
  surveyQuestionEntrance,
} from "@/lib/motion";

interface QuestionProps {
  questionText: string;
  questionNumber: number;
  onSelect: (value: number) => void;
  animateEntrance?: boolean;
  isAnswered?: boolean;
  isFocused?: boolean;
}

const Question: React.FC<QuestionProps> = ({
  questionText,
  questionNumber,
  onSelect,
  animateEntrance = false,
  isAnswered = false,
  isFocused = true,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const circleControls = useAnimation();
  const hasStaggeredRef = useRef(isAnswered);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const runStagger = async () => {
      if (!animateEntrance || hasStaggeredRef.current) return;

      hasStaggeredRef.current = true;
      if (reducedMotion) {
        await circleControls.start("visible");
        return;
      }

      await circleControls.set("hidden");
      await circleControls.start("visible");
    };

    void runStagger();
  }, [animateEntrance, circleControls, reducedMotion]);

  useEffect(() => {
    if (isAnswered && !hasStaggeredRef.current) {
      hasStaggeredRef.current = true;
      void circleControls.start("visible");
    }
  }, [isAnswered, circleControls]);

  useEffect(() => {
    if (!animateEntrance && !isAnswered && !hasStaggeredRef.current) {
      void circleControls.start("dimmed");
    }
  }, [animateEntrance, isAnswered, circleControls]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isFocused) return;

    const value = parseInt(event.target.value, 10);
    setSelectedOption(value);
    onSelect(value);
  };

  const containerVariants = {
    ...surveyCirclesContainer(!!reducedMotion),
    dimmed: {
      opacity: reducedMotion ? 0.55 : 0.4,
      transition: { duration: 0.25 },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.045,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <motion.h3
        className="text-xl text-center px-4 md:px-8"
        variants={surveyQuestionEntrance(!!reducedMotion)}
        initial={animateEntrance ? "hidden" : false}
        animate="visible"
        transition={{ duration: reducedMotion ? 0.2 : 0.55, ease: motionEase }}
      >
        {questionText}
      </motion.h3>
      <div className="w-full px-2 md:px-0 md:w-[80%]">
        <motion.div
          className={`flex justify-between items-center w-full ${!isFocused ? "pointer-events-none" : ""}`}
          variants={containerVariants}
          initial={isAnswered ? "visible" : "dimmed"}
          animate={circleControls}
        >
          {Array.from({ length: 10 }, (_, index) => {
            const value = index + 1;
            const isSelected = selectedOption === value;

            return (
              <motion.label
                key={index}
                className="inline-flex items-center"
                title={`Значение ${value}`}
                variants={surveyCircleItem(!!reducedMotion)}
              >
                <input
                  type="radio"
                  className="hidden"
                  name={`question-${questionNumber}`}
                  value={value}
                  disabled={!isFocused}
                  onChange={handleChange}
                />
                <motion.span
                  className={`w-[28px] h-[28px] sm:w-[35px] sm:h-[35px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] 
                    inline-block rounded-full border-2 border-black shadow-inner relative 
                    ${isFocused ? "cursor-pointer" : "cursor-default"}
                    ${isSelected ? "bg-primary" : "bg-transparent"}
                  `}
                  whileHover={
                    isFocused && !reducedMotion ? { scale: 1.1 } : undefined
                  }
                  whileTap={
                    isFocused && !reducedMotion ? { scale: 0.95 } : undefined
                  }
                  animate={
                    isSelected && !reducedMotion
                      ? { scale: 1.08 }
                      : { scale: 1 }
                  }
                  transition={
                    isSelected && !reducedMotion
                      ? { type: "spring", stiffness: 500, damping: 18 }
                      : { duration: 0.2 }
                  }
                />
              </motion.label>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Question;
