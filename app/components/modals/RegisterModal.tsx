"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FC } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Heading from "../Heading";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
import UserModal from "./UserModal";

interface RegisterModalProps {}

const RegisterModal: FC<RegisterModalProps> = ({}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Sucess");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3 px-6 py-4">
      <Heading
        title="Welcome to GPT Prompts Project 👋"
        subtitle="Create an account"
      />

      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-xs text-neutral-300 text-center mt-4 font-light">
        <div className=" flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className="font-bold text-neutral-400 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <UserModal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Sign Up"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
