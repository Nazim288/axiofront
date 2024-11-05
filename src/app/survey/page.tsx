"use client";

import SurveyTitle from "@/components/survey/surveyTitle";
import Question from "@/components/survey/question";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Survey = () => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [allAnswered, setAllAnswered] = useState(false);

  const questions = [
    "Как вы оцениваете?",
    "Как часто вы?",
    "Как вы оцениваете?",
    "Как часто вы?",
    "Как вы оцениваете?",
    "Как часто вы?",
    "Как вы оцениваете?",
    "Как часто вы?",
    "Как вы оцениваете?",
    "Как часто вы?",
    "Как вы оцениваете?",
    "Как часто вы?",
    "Как вы оцениваете?",
    "Как часто вы?",
    "Как вы оцениваете?",
    "Как часто вы?",
    "Как вы оцениваете?",
    "Как часто вы?",
    "Как вы оцениваете?",
    "Как часто вы?",
  ];

  useEffect(() => {
    // Проверяем, заполнены ли все ответы
    const allQuestionsAnswered =
      questions.length === Object.keys(answers).length &&
      Object.keys(answers).every((key) => answers[+key] !== undefined);
    setAllAnswered(allQuestionsAnswered);
  }, [answers, questions.length]);

  // const handleAnswerChange = (questionNumber: number, answer: number) => {
  //   setAnswers((prev) => ({ ...prev, [questionNumber]: answer }));
  // };

  const handleAnswer = (questionNumber: number, answer: number) => {
    // Обновление ответов
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionNumber]: answer,
    }));

    // Переход к следующему вопросу
    // if (questionNumber < questions.length) {
    //   setActiveQuestion(questionNumber + 1);
    //   const nextQuestionElement = document.getElementById(
    //     `question-${questionNumber + 1}`
    //   );
    //   if (nextQuestionElement) {
    //     nextQuestionElement.scrollIntoView({ behavior: "smooth" });
    //   }
    // }

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

  const handleSubmit = () => {
    console.log("Collected Answers:", answers);
  };

  return (
    <div className="flex flex-col">
      <SurveyTitle />
      <div className="flex flex-col gap-10 mt-20">
        {questions.map((question, index) => (
          <div
            key={index}
            id={`question-${index + 1}`}
            // className={`p-4 ${
            //   index + 1 === activeQuestion
            //     ? "opacity-100"
            //     : "opacity-50 blur-sm"
            // }`}
            // className={`p-4 transition-opacity duration-300 ease-in-out ${
            //   index + 1 === activeQuestion
            //     ? "opacity-100"
            //     : "opacity-50 blur-sm hover:opacity-100 hover:blur-none"
            // }`}
            // onMouseEnter={() => setActiveQuestion(index + 1)}
            className={`p-4 transition-opacity duration-300 ease-in-out ${
              allAnswered || index + 1 === activeQuestion
                ? "opacity-100"
                : "opacity-50 blur-sm hover:opacity-100 hover:blur-none"
            }`}
            onMouseEnter={() => setActiveQuestion(index + 1)}
          >
            <Question
              key={index}
              questionText={question}
              questionNumber={index + 1}
              onAnswerChange={(answer) => handleAnswer(index + 1, answer)}
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
