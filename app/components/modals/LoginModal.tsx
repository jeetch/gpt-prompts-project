"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FC } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserModal from "./UserModal";

interface RegisterModalProps {}

const LoginModal: FC<RegisterModalProps> = ({}) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Logged In!", {
          position: "bottom-center",
          style: {
            borderRadius: "10px",
            background: "#21374a",
            color: "#fff",
          },
        });
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error, {
          position: "bottom-center",
          style: {
            borderRadius: "10px",
            background: "#21374a",
            color: "#fff",
          },
        });
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3 px-6 py-4">
      <Heading title="Welcome back 👋" subtitle="Login to your account" />
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
          <div>First time using GPT Prompts Project?</div>
          <div
            onClick={toggle}
            className="font-bold text-neutral-400 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <UserModal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      footer={footerContent}
    />
  );
};

export default LoginModal;
