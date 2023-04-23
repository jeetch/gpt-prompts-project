"use client";

import { FC } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  deletePrompt?: boolean;
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  deletePrompt = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
  relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg 
   w-full border border-none  hover:shadow-sm
  ${
    deletePrompt
      ? "bg-red-900 hover:bg-red-900/80"
      : outline
      ? "bg-sky-900 hover:bg-sky-900/70 "
      : "bg-emerald-800  hover:bg-emerald-800/80"
  }
  
  ${outline ? "text-neutral-300" : "text-neutral-200"}
  ${small ? "py-1" : "py-3"}
  ${small ? "text-sm" : "text-md"}
  ${small ? "font-light" : "font-semibold"}
  ${small ? "border-[1px]" : "border-2"} `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
