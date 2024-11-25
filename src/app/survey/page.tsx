"use client";

import SurveyTitle from "@/components/survey/surveyTitle";
import Question from "@/components/survey/question";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Survey = () => {
  const [answers, setAnswers] = useState<
    { value: number; questionPosition: number }[]
  >([]);
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [allAnswered, setAllAnswered] = useState(false);

  const questions = [
    {
      id: 0,
      text: "Как часто вы?",
      position: 0,
    },
    {
      id: 1,
      text: "Как вы оцениваете?",
      position: 1,
    },
    {
      id: 2,
      text: "Как часто вы?",
      position: 2,
    },
    {
      id: 3,
      text: "Как вы оцениваете?",
      position: 3,
    },
    {
      id: 4,
      text: "Как часто вы?",
      position: 4,
    },
    {
      id: 5,
      text: "Как вы оцениваете?",
      position: 5,
    },
    {
      id: 6,
      text: "Как часто вы?",
      position: 6,
    },
    {
      id: 7,
      text: "Как часто вы?",
      position: 7,
    },
    {
      id: 8,
      text: "Как вы оцениваете?",
      position: 8,
    },
    {
      id: 9,
      text: "Как часто вы?",
      position: 9,
    },
    {
      id: 10,
      text: "Как вы оцениваете?",
      position: 10,
    },
  ];

  const handleAnswer = (questionNumber: number, answer: number) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter(
        (a) => a.questionPosition !== questionNumber
      );
      const newAnswers = [
        ...updatedAnswers,
        { value: answer, questionPosition: questionNumber },
      ];
      return newAnswers;
    });

    // Переход к следующему вопросу
    if (questionNumber < questions.length) {
      setActiveQuestion(questionNumber + 1);
      const nextQuestionElement = document.getElementById(
        `question-${questionNumber + 1}`
      );
      if (nextQuestionElement) {
        nextQuestionElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  useEffect(() => {
    const allQuestionsAnswered =
      questions.length === Object.keys(answers).length &&
      Object.keys(answers).every((key) => answers[+key] !== undefined);
    setAllAnswered(allQuestionsAnswered);
  }, [answers, questions.length]);

  const handleSubmit = () => {
    console.log("Collected Answers:", answers);
  };

  useEffect(() => {
    console.log("All questions answered:", allAnswered);
    console.log("Active question:", activeQuestion);
  }, [allAnswered, activeQuestion]);

  return (
    <div className="flex flex-col">
      <div className="sticky top-4 z-50 h-[271px]">
        <SurveyTitle />
      </div>
      <div className="flex flex-col gap-10 z-10">
        {questions.map((question) => (
          <div
            key={question.id}
            id={`question-${question.position}`}
            className={`p-4 transition-opacity duration-300 ease-in-out ${
              allAnswered || question.position === activeQuestion
                ? "opacity-100"
                : "opacity-50 blur-sm hover:opacity-100 hover:blur-none"
            }`}
            onMouseEnter={() => setActiveQuestion(question.position)}
          >
            <Question
              key={question.id}
              questionText={question.text}
              questionNumber={question.position}
              onSelect={(answer) => handleAnswer(question.position, answer)}
            />
          </div>
        ))}
        <Button
          variant="default"
          className="w-full rounded-[40px] h-[60px] text-lg my-20"
          onClick={handleSubmit}
        >
          Пройти опрос
        </Button>
      </div>
    </div>
  );
};

export default Survey;
