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
  personTestId: number;
};

export type IQuestion = {
  id: number;
  text: string;
  position: number;
};

export interface ISendAnswersBody {
  answers: { value: number; questionPosition: number }[];
  personTestId: number;
}
