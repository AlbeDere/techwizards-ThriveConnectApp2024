import React from 'react';

interface RatingCircleProps {
  score: number;
}

const RatingCircle: React.FC<RatingCircleProps> = ({ score }) => {
  const getColor = (score: number) => {
    const green = Math.min(255, Math.floor((score / 10) * 255));
    const red = Math.max(0, 255 - green);
    return `bg-rgb(${red}, ${green}, 0)`;
  };

  return (
    <div
      className={`w-16 h-16 flex items-center justify-center rounded-full text-white font-bold ${getColor(score)}`}
    >
      {Math.round(score)}
    </div>
  );
};

export default RatingCircle;
