export const Urls = {
  surveyUrls: {
    getSurvey: (id: string) => `/api/v1/test/${id}`,
    sendAnswers: "/api/v1/person-test",
    getResult: (id: string) => `/api/v1/person-test/result/${id}`,
    getResultShort: "/api/v1/person-test/result/short",
    pay: "/api/v1/payments/initiate",
    setReviews: "/api/v1/reviews",
    getReviews: "/api/v1/reviews/target",
  },
  authUrls: {
    register: "/api/v1/register",
    login: "/api/v1/login",
    logout: "/api/v1/logout",
    getPersonCurrent: "/api/v1/person/current",
  },
};
