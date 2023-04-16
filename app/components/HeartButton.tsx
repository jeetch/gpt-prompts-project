"use client";
import { FC } from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
  postId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: FC<HeartButtonProps> = ({ postId, currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    postId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative
      
  hover:opacity-60
  transition
  cursor-pointer
  "
    >
      <AiOutlineHeart
        size={28}
        className="fill-neutral-200/70 absolute -top-[2px] -right-[2px]"
      />

      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-red-600/50" : "fill-transparent"}
      />
    </div>
  );
};

export default HeartButton;
