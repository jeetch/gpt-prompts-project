"use client";
import { FC } from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";
import getPostFavoritesCount from "../actions/getPostFavoritesCount";

interface HeartButtonProps {
  postId: string;
  currentUser?: SafeUser | null;
  favorites?: number;
}

const HeartButton: FC<HeartButtonProps> = ({
  postId,
  currentUser,
  favorites,
}) => {
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
      <div>
        <AiOutlineHeart
          size={28}
          className="fill-neutral-200/70 absolute -top-[2px] -right-[2px]"
        />

        <AiFillHeart
          size={24}
          className={hasFavorited ? "fill-red-600/50" : "fill-transparent"}
        />
      </div>
      <div className="text-neutral-200/70 text-xs absolute top-[25px] right-[8px]">
        {favorites}
      </div>
    </div>
  );
};

export default HeartButton;
