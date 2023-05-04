"use client";
import { FC, useEffect } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import Banner from "../Banner";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <>
      <div
        className="
        w-full bg-none z-20 shadow-sm
            py-4
            border-b
            border-emerald-500/20
            text-slate-200
            top-0 fixed
            backdrop-blur-sm
            
            "
      >
        <Container>
          <div className="sm:sticky flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </>
  );
};

export default Navbar;
