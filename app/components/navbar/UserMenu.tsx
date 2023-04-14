"use client";
import { FC, useState, useCallback } from "react";
import Avatar from "../Avatar";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import LoginModal from "../modals/LoginModal";
import useLoginrModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginrModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-emerald-500 text-sm font-semibold py-3 px-4 rounded-full hover:scale-105 
      bg-sky-900 transistion cursor-pointer"
        >
          Submit Your Prompt
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-slate-600 flex flex-row items-center gap-3 rounded-full
          cursor-pointer hover:shadow-md hover:scale-105 transistion"
        >
          <AiOutlineMenu />
          <Avatar src={currentUser?.image} />
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4
      bg-slate-800 overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My Prompts"
                />
                <MenuItem
                  submit
                  onClick={rentModal.onOpen}
                  label="Submit your prompt"
                />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
