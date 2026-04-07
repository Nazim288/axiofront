import api from "./api";
import { Urls } from "./urls";

interface CreateReviewBody {
  comment: string;
  rating: number;
  targetType: string;
}

interface ReviewResponse {
  id: number;
  userId: number;
  userName: string;
  targetType: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export const createReview = async (
  body: CreateReviewBody,
): Promise<ReviewResponse> => {
  try {
    const response = await api.post(Urls.surveyUrls.setReviews, body);
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании отзыва:", error);
    throw error;
  }
};

export const getReviews = async (
  targetType: string,
  moderation: boolean = false,
): Promise<ReviewResponse[]> => {
  try {
    const response = await api.get(
      moderation
        ? Urls.surveyUrls.getReviewsToModeration
        : Urls.surveyUrls.getReviews,
      {
        params: { targetType },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении отзывов:", error);
    throw error;
  }
};

export const approveReview = async (reviewId: number): Promise<void> => {
  try {
    await api.put(Urls.surveyUrls.approveReview(reviewId));
  } catch (error) {
    console.error("Ошибка при одобрении отзыва:", error);
    throw error;
  }
};

export const blockReview = async (reviewId: number): Promise<void> => {
  try {
    await api.put(Urls.surveyUrls.blockReview(reviewId));
  } catch (error) {
    console.error("Ошибка при блокировке отзыва:", error);
    throw error;
  }
};
