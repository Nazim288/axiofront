"use client";

import SurveyTitle from "@/components/survey/surveyTitle";
import Question from "@/components/survey/question";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IQuestion, ISurveyData } from "@/types/survey";
import { surveyData } from "@/mocks/survey";
import { getSurvey, sendAnswers } from "@/api/survey";
import Loader from "@/components/loader/loader";
import { ProtectedRoute } from "@/components/protectedRoute/ProtectedRoute";
import { CongratulationsModal } from "@/components/modals/congratulationsModal";
import { RetakeSurveyModal } from "@/components/modals/retakeSurveyModal";

const Survey = () => {
  const [data, setData] = useState<ISurveyData>();
  const [isLoading, setIsLoading] = useState(true);

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
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showRetakeSurvey, setShowRetakeSurvey] = useState(false);

  // Функция для проверки одинаковых ответов
  const checkForSameAnswers = (
    answers: { value: number; questionPosition: number }[]
  ) => {
    if (answers.length === 0) return false;
    const firstValue = answers[0].value;
    return answers.every((answer) => answer.value === firstValue);
  };

  // Функция сброса состояния опроса
  const resetSurveyState = () => {
    setCurrentStep(1);
    setAnswers([]);
    setAnswersStep([]);
    setActiveQuestion(1);
    setAllAnswered(false);
    setQuestions(data?.questionGroups[0].questions || []);
    setShowCongratulations(false);
    setShowRetakeSurvey(false);
  };

  useEffect(() => {
    const fetchSurvey = async () => {
      setIsLoading(true); // Устанавливаем состояние загрузки в true перед запросом
      try {
        const response = await getSurvey("1"); // Здесь нужно передать правильный id
        setData(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке опроса:", error);
      } finally {
        setIsLoading(false); // Устанавливаем состояние загрузки в false после завершения запроса
      }
    };

    fetchSurvey();
  }, []);

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

  const handleSubmit = async (currentStep: number) => {
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
      // Проверяем, не выбрал ли пользователь везде одинаковые ответы
      if (checkForSameAnswers(answers)) {
        setShowRetakeSurvey(true);
        return;
      }

      try {
        await sendAnswers({
          answers: answers,
          personTestId: 1,
        });
        console.log("Collected Answers:", answers);
        setShowCongratulations(true);
      } catch (error) {
        console.error("Ошибка при отправке ответов:", error);
      }
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
        setQuestions(data?.questionGroups[0].questions || []);
        break;
      case 2:
        setQuestions(data?.questionGroups[1].questions || []);
        break;
      case 3:
        setQuestions(data?.questionGroups[2].questions || []);
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
    <ProtectedRoute>
      <div className="flex flex-col max-w-[1200px] mx-auto">
        {isLoading ? (
          <div
            className="flex flex-col items-center justify-center"
            style={{ height: "calc(100vh - 320px)" }}
          >
            <Loader />
          </div>
        ) : (
          <>
            <div className="sticky top-0 z-20 h-auto md:h-[271px] py-4">
              <SurveyTitle data={data} step={currentStep} />
            </div>
            <div className="flex flex-col gap-8 md:gap-10 z-10 mt-4 md:mt-0">
              {questions.map((question) => (
                <div
                  key={question.id}
                  id={`question-${question.id}`}
                  className={`p-4 transition-opacity duration-300 ease-in-out 
                    ${
                      allAnswered || question.position === activeQuestion
                        ? "opacity-100"
                        : "opacity-50 blur-sm hover:opacity-100 hover:blur-none"
                    }
                  `}
                  onMouseEnter={() => setActiveQuestion(question.position)}
                >
                  <Question
                    key={question.id}
                    questionText={question.text}
                    questionNumber={question.position}
                    onSelect={(answer) =>
                      handleAnswer(question.position, answer)
                    }
                  />
                </div>
              ))}
              <Button
                variant="default"
                className="w-full md:w-[80%] mx-auto rounded-[40px] h-[50px] md:h-[60px] text-base md:text-lg my-10 md:my-20"
                onClick={() => handleSubmit(currentStep)}
              >
                {currentStep === 3 ? "Завершить опрос" : "Далее"}
              </Button>
            </div>
          </>
        )}
        <CongratulationsModal
          isOpen={showCongratulations}
          onClose={() => setShowCongratulations(false)}
        />
        <RetakeSurveyModal
          isOpen={showRetakeSurvey}
          onClose={() => setShowRetakeSurvey(false)}
          onRetake={resetSurveyState}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Survey;
