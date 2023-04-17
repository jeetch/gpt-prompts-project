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
        className="block sm:hidden cursor-pointer hover:scale-105 transition"
        height="12"
        width="80"
        src="/images/logo-small.png"
      />
      <Image
        onClick={() => router.push("/")}
        alt="logo"
        className=" hidden sm:block cursor-pointer hover:scale-105 transition"
        height="25"
        width="140"
        src="/images/logo-large.png"
      />
    </>
  );
};

export default Logo;
