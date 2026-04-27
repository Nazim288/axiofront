import { Check, X } from "lucide-react";

interface CardProps {
  rating: number; // 1-5 stars
  username: string;
  reviewText: string;
  showModerationActions?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
}

const Card = ({
  rating,
  username,
  reviewText,
  showModerationActions = false,
  onApprove,
  onReject,
}: CardProps) => {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="flex h-full flex-col baseShadow rounded-3xl p-5 sm:p-6 w-full hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex">{renderStars()}</div>
        <span className="text-gray-700 font-medium">{username}</span>
      </div>
      <div className="text-muted-foreground text-sm leading-relaxed">
        <p>{reviewText}</p>
      </div>
      {showModerationActions && (
        <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={onApprove}
            className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
            aria-label="Одобрить отзыв"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={onReject}
            className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
            aria-label="Отклонить отзыв"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
