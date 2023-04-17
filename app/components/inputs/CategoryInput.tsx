"use client";

import { FC } from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: string;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: FC<CategoryInputProps> = ({
  icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
      flex mt-4flex-col items-center justify-center 
      gap-1 p-2 text-xs sm:text-sm sm:p-2 sm:gap-2 md:gap-4
      border rounded-full
    hover:border-emerald-500
    transition
    cursor-pointer
    ${selected ? "border-emerald-500" : "border-sky-800"}
    ${selected ? "bg-emerald-700" : "bg-sky-700"}`}
    >
      <div className="text-neutral-300 font-semibold">{icon + " " + label}</div>
    </div>
  );
};

export default CategoryInput;
