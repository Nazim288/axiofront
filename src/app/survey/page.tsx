"use client";

import SurveyTitle from "@/components/survey/surveyTitle";
import Question from "@/components/survey/question";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IQuestion, ISurveyData } from "@/types/survey";
import { surveyData } from "@/mocks/survey";

const Survey = () => {
  const [data, setData] = useState<ISurveyData>(surveyData);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [allAnswered, setAllAnswered] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<
    { value: number; questionPosition: number }[]
  >([]);
  const [answersStep, setAnswersStep] = useState<
    { value: number; questionPosition: number }[]
  >([]);

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

    setAnswersStep((prevAnswers) => {
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
  };

  const handleSubmit = (currentStep: number) => {
    if (!allAnswered) {
      // Находим первый неотвеченный вопрос
      const unansweredQuestion = questions.find(
        (question) =>
          !answers.some(
            (answer) => answer.questionPosition === question.position
          )
      );

      if (unansweredQuestion) {
        // Получаем элемент вопроса
        const questionElement = document.getElementById(
          `question-${unansweredQuestion.position}`
        );

        // Проверяем, существует ли элемент и выполняем к нему скролл
        if (questionElement) {
          questionElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          setAllAnswered(true);
        }
      }
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      console.log("Collected Answers:", answers);
    }
  };

  useEffect(() => {
    const allQuestionsAnswered =
      questions.length === Object.keys(answersStep).length &&
      Object.keys(answersStep).every((key) => answersStep[+key] !== undefined);
    setAllAnswered(allQuestionsAnswered);
  }, [answersStep, questions, currentStep]);

  useEffect(() => {
    setAnswersStep([]);
    switch (currentStep) {
      case 1:
        setQuestions(data.questionGroups[0].questions);
        break;
      case 2:
        setQuestions(data.questionGroups[1].questions);
        break;
      case 3:
        setQuestions(data.questionGroups[2].questions);
        break;
    }
    // Сохранение текущего шага в localStorage при его изменении
    // localStorage.setItem("currentStep", currentStep.toString());
  }, [currentStep, data, questions]);

  useEffect(() => {
    setData(surveyData);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Сообщение, которое будет показано в диалоговом окне
      const message =
        "Вы уверены, что хотите покинуть страницу? Все несохраненные изменения будут потеряны.";
      event.returnValue = message; // Стандарт для некоторых браузеров
      return message; // Стандарт для других браузеров
    };

    // Добавляем слушатель события
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Функция очистки, которая удаляет слушатель события
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="sticky top-4 z-50 h-[271px]">
        <SurveyTitle data={data} step={currentStep} />
      </div>
      <div className="flex flex-col gap-10 z-10">
        {questions.map((question) => (
          <div
            key={question.id}
            id={`question-${question.id}`}
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
          onClick={() => handleSubmit(currentStep)}
        >
          Пройти опрос
        </Button>
      </div>
    </div>
  );
};

export default Survey;
