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
}

const PostHead: FC<PostHeadProps> = ({
  title,
  user,
  id,
  currentUser,
  favorites,
}) => {
  return (
    <>
      <div
        className="w-full
      h-auto overflow-hidden rounded-xl relative pr-12"
      >
        <Heading title={title} />
        <div className="text-neutral-400 text-xl font-semibold flex flex-row items-center gap-2">
          <div> Contributed by {user?.name} </div>
        </div>
        <div className="absolute top-2 right-2">
          <HeartButton
            favorites={favorites}
            postId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
};

export default PostHead;
