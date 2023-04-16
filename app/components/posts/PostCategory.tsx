"use client";

import { FC } from "react";
import { IconType } from "react-icons";

interface PostCategoryProps {
  icon: string;
  label: string;
  description: string;
}

const PostCategory: FC<PostCategoryProps> = ({ icon, label, description }) => {
  return (
    <div
      className="flex flex-col items-end  justify-right gap-2 p-0 rounded-full
          text-emerald-300  transition cursor-pointer font-medium text-sm"
    >
      {icon} {label}
    </div>
  );
};

export default PostCategory;
