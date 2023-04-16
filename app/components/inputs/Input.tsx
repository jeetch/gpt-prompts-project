"use client";
import { FC } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: FC<InputProps> = ({
  id,
  label = "text",
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`peer w-full p-4 pt-6 font-light bg-sky-600/50 border-2 rounded-md z-10 outline-none transition 
        disabled:opacity-70 disabled:cursor-not-allowed text-neutral-100
        ${formatPrice ? "pl-9" : "pl-4"}
        ${errors[id] ? "border-emerald-600" : "border-sky-600/50"}
        ${errors[id] ? "focus:border-emerald-500" : "focus:border-emerald-600"}
        `}
      />
      <label
        className={`absolute  text-md duration-150 transform -translate-y-3 top-5 z-0 origin-[0]
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

export default Input;
