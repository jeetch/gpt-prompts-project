"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { SafeUser } from "../types";
import { motion } from "framer-motion";

interface BannerProps {
  currentUser?: SafeUser | null;
}

const Banner: FC<BannerProps> = ({ currentUser }) => {
  const params = useSearchParams();
  const router = useRouter();
  const searchQuery = params?.get("search");
  const category = params?.get("category");
  const pathname = usePathname();
  const notIsHome = pathname != "/";

  return (
    <>
      <div className="relative">
        <div
          className={`text-center px-4 sm:px-12 xl:px-64 py-2 ${
            searchQuery || category || currentUser || notIsHome
              ? "hidden"
              : "block"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            exit={{ opacity: 0, y: 20 }}
            className=""
          >
            <div className="text-2xl sm:text-3xl pt-8 text-white font-bold">
              Enhance your ChatGPT experience with our prompts 🚀
            </div>
            <p className="text-slate-400 text-sm mt-2 mb-12">
              The GPT Prompts Project is an open platform for sharing ChatGPT
              prompts. Join our community today and start sharing and exploring
              prompts.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Banner;
