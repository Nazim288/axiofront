import { ISendAnswersBody, ISurveyData } from "@/types/survey";
import api from "./api";
import { Urls } from "./urls";

export const getSurvey = (id: string) =>
  api.get<ISurveyData>(Urls.surveyUrls.getSurvey.replace("{id}", id));

export const sendAnswers = (id: string, body: ISendAnswersBody) =>
  api.post(Urls.surveyUrls.sendAnswers, body);
