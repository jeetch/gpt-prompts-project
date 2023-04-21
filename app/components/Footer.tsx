import { FC } from "react";
import Logo from "./navbar/Logo";
import Image from "next/image";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className="bg-sky-950 text-slate-500 w-full">
      <div className="flex  flex-col items-center justify-between gap-4 mt-12 py-5 md:h-10 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-4">
          <p className="text-center text-xs leading-loose md:text-left">
            © 2023 GPT Prompts Project. All Rights Reserved.
          </p>
        </div>
        <p className="text-center text-xs md:text-left md:px-4">
          Built by{" "}
          <a
            href="https://www.jeetchaudhuri.com/"
            className="font-medium underline underline-offset-4"
          >
            jeet
          </a>
          , source code is available on{" "}
          <a
            href="https://github.com/jeetch/gpt-prompts-project"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
