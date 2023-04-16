import Image from "next/image";
import { FC } from "react";
import { SafeUser } from "@/app/types";

interface AvatarProps {
  src: string | undefined | null;
  currentUser?: SafeUser | null;
}

const Avatar: FC<AvatarProps> = ({ src, currentUser }) => {
  let avatarSrc = src || "/images/placeholder.jpg";

  if (!src && currentUser) {
    avatarSrc = "/images/placeholder-loggedin.jpg";
  }

  return (
    <Image
      className="hidden md:block rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={avatarSrc}
    />
  );
};

export default Avatar;
