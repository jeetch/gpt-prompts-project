"use client";
import useSearchModal from "@/app/hooks/useSearchModal";
import { FC, useCallback, useState, useRef, useEffect } from "react"; // Updated imports
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation"; // Corrected import
import qs from "query-string";
import Heading from "../Heading";
import SearchModalContainer from "./SearchModalContainer";
import { BiSearch } from "react-icons/bi";

interface SearchModalProps {}

const SearchModal: FC<SearchModalProps> = ({}) => {
  const router = useRouter();
  const params = useSearchParams(); // Updated to use router.query
  const searchModal = useSearchModal();
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null); // Added useRef for input

  useEffect(() => {
    if (searchModal.isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchModal.isOpen]);

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      search: searchQuery,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    searchModal.onClose();

    router.push(url);
  }, [searchModal, router, params, searchQuery]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <form onSubmit={onSubmit} className="">
        <div className="relative flex flex-col items-center justify-center gap-1 p-1 text-xs sm:text-sm sm:p-2 sm:gap-2 md:gap-4">
          <input
            ref={inputRef} // Added ref to input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSubmit;
            }}
            className="
            p-5 rounded-xl
      w-full
      bg-gray-800
      text-white
      border-2
      border-gray-700
      focus:outline-none
      focus:border-emerald-800
      placeholder-gray-400
    "
            placeholder="Search"
          />
          <button className="absolute right-3 md:right-4 p-2  bg-emerald-500 rounded-full text-white">
            <BiSearch size={18} />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <SearchModalContainer
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Find Your Prompt"
      actionLabel={"Search"}
      body={bodyContent}
    />
  );
};

export default SearchModal;
