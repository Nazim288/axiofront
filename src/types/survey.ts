export type ISurveyData = {
  id: number;
  name: string;
  countQuestions: number;
  description: string;
  questionGroups: {
    id: number;
    name: string;
    position: number;
    header: string;
    leftText: string;
    rightText: string;
    questions: IQuestion[];
  }[];
  model: string;
  personTestId: number | null;
  testId: number;
  personId: number;
};

export type IQuestion = {
  id: number;
  text: string;
  position: number;
};

export interface ISendAnswersBody {
  answers: { value: number; questionPosition: number }[];
  personTestId: number;
  personId: number;
  testId: number;
  startTime: string;
}

export interface IValueType {
  rating: number;
  description: string | null;
  type: string;
  groupName: string | null;
}

export interface INi {
  adaptability: IValueType;
  traditions: IValueType;
  compassion: IValueType;
  empathy: IValueType;
  selfSufficiency: IValueType;
  activity: IValueType;
  hedonistic: IValueType;
  ambition: IValueType;
  power: IValueType;
  security: IValueType;
  owner: unknown | null;
  topIdealsPosition: number[];
}

export interface ITestResult {
  pcs: number;
  ip: INi | null;
  ni: INi | null;
  recommendation: string | null;
  resultCongruence: string | null;
  colorNumber: number;
  date: string;
  userName: string;
  paidStatus: string;
}

export interface ITestResultShort {
  id: number;
  respondentId: number;
  testId: number;
  finishTime: string;
  pcs: number;
  read: boolean;
}

export interface IPayBody {
  userId?: number;
  personTestId: number;
  testId?: number;
  amount: number;
  paymentMethod: "CREDIT_CARD";
  currency: string;
}

export interface IPayResponse {
  paymentId: number;
  status: string;
  amount: number;
  currency: string;
  paymentUrl: string;
  message: string;
}
