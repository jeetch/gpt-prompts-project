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
        className="block cursor-pointer hover:scale-110 transition"
        height="50"
        width="50"
        src="/images/logo.png"
      />
    </>
  );
};

export default Logo;
