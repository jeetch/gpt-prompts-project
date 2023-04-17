"use client";
import { FC, useEffect } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import useSearchModal from "@/app/hooks/useSearchModal";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="sticky top-0 w-full bg-sky-950 z-10 shadow-sm">
      <div
        className="
            py-4
            border-b-[1px]
            border-emerald-500
            text-slate-200
            "
      >
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
