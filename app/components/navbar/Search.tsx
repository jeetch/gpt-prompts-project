"use client";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      searchModal.onOpen();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
  });

  return (
    <div
      onClick={searchModal.onOpen}
      className="
          border-[1px]
    border-slate-600
    w-full
    sm:w-2/6
    lg:w-1/2
   
    py-1
    rounded-full
    shadow-sm
    hover:shadow-md
    hover:border-emerald-700
    transition
    cursor-pointer
    "
    >
      <div className="pr-1 flex flex-row items-center justify-between">
        <div className="hidden md:block text-sm hover:font-semibold px-6">
          Look for your prompts
        </div>
        <div className="block md:hidden text-sm font-semibold px-6">
          Search prompts
        </div>

        <div className="flex">
          <div className="hidden lg:flex items-center space-x-1 text-xs text-gray-400 scale-75">
            <div className="bg-white/10 p-1 rounded-md ">Ctrl</div>
            <span>+</span>
            <div className="bg-white/10 p-1 rounded-md">K</div>
          </div>
          <div className="p-1  bg-emerald-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
