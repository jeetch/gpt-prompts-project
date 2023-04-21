"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

const Banner: FC = ({}) => {
  const params = useSearchParams();
  const router = useRouter();
  const searchQuery = params?.get("search");
  const category = params?.get("category");

  return (
    <>
      <div
        className={`text-center px-6 py-2 ${
          searchQuery || category ? "hidden" : "block"
        }`}
      >
        <h2 className="text-2xl sm:text-3xl   pt-8 text-white font-bold ">
          Transform your ChatGPT experience with our prompts 🚀
        </h2>{" "}
        <p className="text-slate-400 text-sm mt-2 mb-12 ">
          We are a open repository of GPT prompts, start by expoloring the
          categories or searching for prompts
        </p>
      </div>
    </>
  );
};

export default Banner;
