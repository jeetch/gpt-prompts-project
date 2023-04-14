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
          "bg-sky-900 text-neutral-400 hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-transparent text-slate-400 border border-neutral-500 over:bg-slate-100 ",
        subtle:
          "bg-emerald-500 hover:text-slate-100 text-slate-900 hover:bg-emerald-800 d dark:bg-emerald-900/80 dark:text-slate-400",
        ghost:
          "bg-transparent hover:bg-emerald-500 dark:hover:bg-sky-900 dark:text-slate-400 dark:hover:text-slate-100",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
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
