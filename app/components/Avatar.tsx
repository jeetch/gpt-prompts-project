"use client";

import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  src: string | undefined | null;
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="hidden md:block rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
