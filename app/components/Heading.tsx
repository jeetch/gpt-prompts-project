"use client";
import { FC } from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-neutral-200 text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-400 mt-2"> {subtitle}</div>
    </div>
  );
};

export default Heading;
