import {
  ISendAnswersBody,
  ISurveyData,
  ITestResult,
  ITestResultShort,
  IPayBody,
  IPayResponse,
} from "@/types/survey";
import api from "./api";
import { Urls } from "./urls";

export const getSurvey = (id: string) =>
  api.get<ISurveyData>(Urls.surveyUrls.getSurvey(id));

export const sendAnswers = (body: ISendAnswersBody) =>
  api.post(Urls.surveyUrls.sendAnswers, body);

export const getTestResult = (id: string) =>
  api.post<ITestResult>(Urls.surveyUrls.getResult(id));

export const getTestResultShort = () =>
  api.post<ITestResultShort>(Urls.surveyUrls.getResultShort);

export const pay = (body: IPayBody) =>
  api.post<IPayResponse>(Urls.surveyUrls.pay, body);

export interface IDownloadPdfBody {
  email?: string;
  userId?: number;
  testResultId: number;
}

export const downloadPdf = (body: IDownloadPdfBody) =>
  api.post(Urls.surveyUrls.downloadPdf, body);
