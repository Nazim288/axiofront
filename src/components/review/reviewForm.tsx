"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createReview } from "@/api/review";

const formSchema = z.object({
  rating: z.number().min(1, { message: "Пожалуйста, выберите рейтинг" }).max(5),
  reviewText: z
    .string()
    .min(5, { message: "Отзыв должен содержать минимум 5 символов" })
    .max(500, { message: "Отзыв не должен превышать 500 символов" }),
});

const ReviewForm = () => {
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      reviewText: "",
    },
  });

  const watchedRating = form.watch("rating");

  const handleStarClick = (rating: number) => {
    form.setValue("rating", rating);
  };

  const handleStarHover = (rating: number) => {
    setHoveredStar(rating);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError("");

    try {
      await createReview({
        comment: values.reviewText,
        rating: values.rating,
        targetType: "KV_86",
      });

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
      }, 3000);
    } catch (err) {
      console.error("Ошибка при отправке отзыва:", err);
      setError("Произошла ошибка при отправке отзыва. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  }

  const renderStars = () => {
    const stars = [];
    const currentRating = hoveredStar || watchedRating;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`text-3xl transition-colors duration-200 hover:scale-110 ${
            i <= currentRating ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col gap-4 baseShadow rounded-3xl p-8 w-full bg-green-50 border border-green-200">
        <div className="text-center">
          <div className="text-4xl mb-4">✓</div>
          <h3 className="text-2xl font-semibold text-green-800 mb-2">
            Спасибо за ваш отзыв!
          </h3>
          <p className="text-green-700">
            Ваш отзыв поможет нам улучшить наш сервис.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 baseShadow rounded-3xl p-8 w-full hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-2xl font-semibold mb-4">
            Оставьте отзыв о сервисе Axiogram
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="rating"
            render={() => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  Оцените наш сервис
                </FormLabel>
                <FormControl>
                  <div className="flex gap-2 py-2">{renderStars()}</div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reviewText"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  Расскажите о своем опыте
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Поделитесь вашими впечатлениями о нашем психологическом тесте..."
                    className="min-h-[120px] bg-muted"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between text-sm text-gray-500">
                  <FormMessage />
                  <span>{field.value?.length || 0}/500</span>
                </div>
              </FormItem>
            )}
          />

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="default"
            size="cta"
            className="w-full text-lg font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Отправляем...
              </div>
            ) : (
              "Отправить отзыв"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
