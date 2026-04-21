export const Urls = {
  surveyUrls: {
    getSurvey: (id: string) => `/api/v1/test/${id}`,
    sendAnswers: "/api/v1/person-test",
    getResult: (id: string) => `/api/v1/person-test/result/${id}`,
    getResultShort: "/api/v1/person-test/result/short",
    pay: "/api/v1/payments/initiate",
    setReviews: "/api/v1/reviews",
    getReviews: "/api/v1/reviews/target",
    getReviewsToModeration: "/api/v1/reviews/check",
    approveReview: (reviewId: number) => `/api/v1/reviews/${reviewId}/approve`,
    blockReview: (reviewId: number) => `/api/v1/reviews/${reviewId}/blocked`,
    downloadPdf: "/api/v1/download/pdf",
  },
  adminUrls: {
    redeemPromoCode: "/api/admin/promo-codes/redeem",
  },
  authUrls: {
    register: "/api/v1/register",
    login: "/api/v1/login",
    logout: "/api/v1/logout",
    getPersonCurrent: "/api/v1/person/current",
    emailConfirmSend: "/api/v1/email/confirm/send",
    emailConfirm: "/api/v1/email/confirm",
    requestPasswordReset: "/api/v1/auth/request-password-reset",
    resetPassword: "/api/v1/auth/reset-password",
  },
};
