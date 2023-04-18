"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

interface SearchHeaderProps {}

const SearchHeader: FC<SearchHeaderProps> = ({}) => {
  const params = useSearchParams();
  const router = useRouter();
  const searchQuery = params?.get("search");

  return (
    <div
      className={`text-center pb-2 text-sm text-neutral-400 ${
        searchQuery ? "block" : "hidden"
      }`}
    >
      {searchQuery
        ? "You searched for : " + searchQuery
        : "Look for your prompts"}
    </div>
  );
};

export default SearchHeader;
