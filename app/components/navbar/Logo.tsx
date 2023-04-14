"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <>
      <Image
        onClick={() => router.push("/")}
        alt="logo"
        className="block cursor-pointer hover:scale-105 transition"
        height="30"
        width="300"
        src="/images/logo.png"
      />
    </>
  );
};

export default Logo;
