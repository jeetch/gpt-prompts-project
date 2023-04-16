"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CatergoryBoxProps {
  label: string;
  icon: string;
  selected?: boolean;
}

const CatergoryBox: FC<CatergoryBoxProps> = ({ label, icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") == label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center 
      gap-1 p-1 text-xs sm:text-sm sm:p-2 sm:gap-2 md:gap-4
      border bg-sky-900 rounded-full
      hover:text-emerald-300 hover:scale-95 transition cursor-pointer
      ${selected ? "border-emerald-900" : "border-transparent"}
      ${selected ? "text-emerald-300" : "text-neutral-200"}`}
    >
      {icon + " " + label}
    </div>
  );
};

export default CatergoryBox;
