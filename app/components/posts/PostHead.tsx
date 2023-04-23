"use client";

import { SafeUser } from "@/app/types";
import { FC } from "react";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface PostHeadProps {
  favorites?: number;
  title: string;
  user: SafeUser;
  id: string;
  currentUser?: SafeUser | null;
  description?: string;
}

const PostHead: FC<PostHeadProps> = ({
  title,
  user,
  id,
  currentUser,
  favorites,
  description,
}) => {
  return (
    <>
      <div
        className="w-full
      h-auto overflow-hidden rounded-xl relative pr-12 flex flex-col gap-2"
      >
        <Heading title={title} />

        <div className="absolute top-2 right-2">
          <HeartButton
            favorites={favorites}
            postId={id}
            currentUser={currentUser}
          />
        </div>

        <p className="text-slate-400 ">{description} </p>

        <div className="text-slate-400 text-sm font-light flex flex-row items-center gap-2">
          <div> Contributed by {user?.name} </div>
        </div>
      </div>
    </>
  );
};

export default PostHead;
