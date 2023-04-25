"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { SafeUser } from "../types";
import { motion } from "framer-motion";
import { ButtonUi } from "./ButtonUi";
import { AiFillEdit } from "react-icons/ai";
import { IoCopy } from "react-icons/io5";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import RegisterModal from "./modals/RegisterModal";

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
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  return (
    <>
      <div className="relative">
        <div
          className={`text-center px-4 sm:px-12 xl:px-64 py-8  lg:mb-8 ${
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
            <div className="text-2xl sm:text-4xl p-2  font-semibold bg-gradient-to-l from-indigo-400 from-10% via-sky-400 via-30% to-emerald-400 to-90% bg-clip-text text-transparent ">
              Enhance your ChatGPT experience with our prompts
              <a className=" text-white ml-2 ">🚀</a>
            </div>

            <p className="text-slate-400 text-sm mt-2 mb-4 p-2">
              GPT Prompts Project is an open platform for sharing ChatGPT
              prompts. Join our community today and start sharing and exploring
              prompts.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
            exit={{ opacity: 0, y: 20 }}
            className="flex items-center justify-center gap-4"
          >
            {" "}
            <ButtonUi
              variant="default"
              size="lg"
              onClick={registerModal.onOpen}
            >
              👋 Sign Up
            </ButtonUi>
            <ButtonUi variant="link" size="lg" onClick={loginModal.onOpen}>
              Login
            </ButtonUi>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Banner;
