"use client";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="
      hover:scale-105
          border-[1px]
    border-slate-600
    w-full
    md:w-1/3
    py-1
    rounded-full
    shadow-sm
    hover:shadow-md
    transition
    cursor-pointer
    "
    >
      <div className="pr-1 flex flex-row items-center justify-between">
        <div className="hidden sm:block text-sm font-semibold px-6">
          Look for your prompts
        </div>
        <div className="block sm:hidden text-sm font-semibold px-6">
          Search prompts
        </div>

        <div className="p-1  bg-emerald-500 rounded-full text-white">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
