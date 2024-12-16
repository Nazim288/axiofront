import { ISendAnswersBody, ISurveyData } from "@/types/survey";
import api from "./api";
import { Urls } from "./urls";

export const getSurvey = (id: string) =>
  api.get<ISurveyData>(Urls.surveyUrls.getSurvey(id));

export const sendAnswers = (body: ISendAnswersBody) =>
  api.post(Urls.surveyUrls.sendAnswers, body);
