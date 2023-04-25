"use client";

import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "../libs/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors ",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-600 hover:bg-emerald-600 hover:scale-105 transition shadow-sm hover:shadow-md transition text-white ",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-transparent text-slate-400 border border-neutral-500 over:bg-slate-100 ",
        subtle:
          "bg-emerald-900 hover:text-slate-100 text-emerald-100 hover:bg-emerald-800 ",
        ghost:
          "bg-transparent hover:bg-emerald-500 dark:hover:bg-sky-900 dark:text-slate-400 dark:hover:text-slate-100",
        link: "bg-transparent text-slate-300 hover:text-slate-400 hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md text-xs",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const ButtonUi = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ButtonUi.displayName = "Button";

export { ButtonUi, buttonVariants };
