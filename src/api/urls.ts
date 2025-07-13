export const Urls = {
  surveyUrls: {
    getSurvey: (id: string) => `/api/v1/test/${id}`,
    sendAnswers: "/api/v1/person-test",
    getResult: (id: string) => `/api/v1/person-test/result/${id}`,
    getResultShort: "/api/v1/person-test/result/short",
    pay: "/api/v1/payments/initiate",
  },
  authUrls: {
    register: "/api/v1/register",
    login: "/api/v1/login",
    logout: "/api/v1/logout",
  },
};
