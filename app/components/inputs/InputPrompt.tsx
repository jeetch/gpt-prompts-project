"use client";
import { FC } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const InputPrompt: FC<InputProps> = ({
  id,
  label = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative font-mono">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`peer text-wrap align-top w-full p-4 pt-6 font-light bg-sky-600/50 border-2 rounded-md z-10 outline-none transition 
        disabled:opacity-70 disabled:cursor-not-allowed text-neutral-100 h-[200px]
        ${formatPrice ? "pl-9" : "pl-4"}
        ${errors[id] ? "border-emerald-600" : "border-neutral-500"}
        ${errors[id] ? "focus:border-emerald-500" : "focus:border-emerald-600"}
        `}
      />
      <label
        className={`absolute  text-sm duration-150 transform -translate-y-3 top-5 z-0 origin-[0]
        ${formatPrice ? "left-9" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? "text-slate-900" : "text-zinc-200"}`}
      >
        {" "}
        {label}{" "}
      </label>
    </div>
  );
};

export default InputPrompt;
