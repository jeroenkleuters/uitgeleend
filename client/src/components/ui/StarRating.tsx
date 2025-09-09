import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  initialValue?: number; // beginwaarde
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export default function StarRating({ initialValue = 0, onChange, disabled }: StarRatingProps) {
  const [selected, setSelected] = useState<number>(initialValue);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = hovered !== null ? n <= hovered : n <= selected;

        return (
          <div
            key={n}
            className="cursor-pointer"
            onClick={() => {
              if (!disabled) {
                setSelected(n);      // update lokale selectie
                if (onChange) onChange(n);
              }
            }}
            onMouseEnter={() => !disabled && setHovered(n)}
            onMouseLeave={() => !disabled && setHovered(null)}
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
