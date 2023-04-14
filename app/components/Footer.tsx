import { FC } from "react";
import Logo from "./navbar/Logo";
import Image from "next/image";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className="bg-sky-950 text-slate-500 w-full">
      <div className="flex  flex-col items-center justify-between gap-4 border-t border-emerald-500 py-5 md:h-10 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-4">
          <p className="text-center text-sm leading-loose md:text-left">
            💻 Built by{" "}
            <a
              href="https://www.jeetchaudhuri.com/"
              className="font-medium underline underline-offset-4"
            >
              jeet
            </a>
          </p>
        </div>
        <p className="text-center text-sm md:text-left md:px-4">
          The source code is available on{" "}
          <a
            href="https://github.com/jeetch/rent-your-home"
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
