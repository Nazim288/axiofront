export const Urls = {
  surveyUrls: {
    getSurvey: (id: string) => `/api/v1/test/${id}`,
    sendAnswers: "/api/v1/person-test",
  },
  authUrls: {
    register: "/api/v1/register",
    login: "/api/v1/login",
  },
};
