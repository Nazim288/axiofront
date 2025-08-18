interface CardProps {
  rating: number; // 1-5 stars
  username: string;
  reviewText: string;
}

const Card = ({ rating, username, reviewText }: CardProps) => {
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
    <div
      className={`flex flex-col baseShadow rounded-3xl p-5 w-80 hover:scale-105 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="flex">{renderStars()}</div>
        <span className="text-gray-700 font-medium">{username}</span>
      </div>
      <div className="text-gray-600 text-sm leading-relaxed">
        <p>{reviewText}</p>
      </div>
    </div>
  );
};

export default Card;
