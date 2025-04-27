import React, { useState } from 'react';
import { GoStar, GoStarFill } from 'react-icons/go';

export default function StarSelector() {
  const [selectedStars, setSelectedStars] = useState<number>(0);

  const Star = ({ selected, index }: { selected: boolean; index: number }) =>
    selected ? (
      <GoStarFill
        size={30}
        className="text-point cursor-pointer"
        onClick={() => setSelectedStars(index + 1)}
      />
    ) : (
      <GoStar
        size={30}
        className="text-main-board-border cursor-pointer"
        onClick={() => setSelectedStars(index + 1)}
      />
    );

  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} index={i} selected={selectedStars > i} />
      ))}
    </div>
  );
}
