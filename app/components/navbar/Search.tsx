"use client";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { BsX } from "react-icons/bs";

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const router = useRouter();

  // Use qs.parse to get query parameters
  const searchQuery = params?.get("search");

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      searchModal.onOpen();
      event.stopPropagation();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      searchModal.onClose();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
  });

  const handleClearSearch = () => {
    router.push("/");
  };

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
    relative
    "
    >
      <div className="pr-1 p  flex flex-row items-center justify-between">
        <div
          className={`hidden md:block text-sm hover:font-semibold ${
            searchQuery ? "px-8" : "px-6"
          }`}
        >
          {searchQuery ? searchQuery : "Look for your prompts"}
          {/* Conditionally render search query */}
        </div>
        <div
          className={`block md:hidden text-sm hover:font-semibold ${
            searchQuery ? "px-8" : "px-6"
          }`}
        >
          {searchQuery ? searchQuery : "Search prompts"}
        </div>

        {searchQuery && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleClearSearch();
            }}
            className="absolute p-2 rounded-full text-white cursor-pointer"
          >
            <BsX size={18} />
          </div>
        )}

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
