"use client";

import useSearchModal from "@/app/hooks/useSearchModal";

import { FC, useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import qs from "query-string";
import { formatISO } from "date-fns";
import { RouteHandlerManager } from "next/dist/server/future/route-handler-managers/route-handler-manager";
import Heading from "../Heading";
import Counter from "../inputs/Counter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Tabs";

interface SearchModalProps {}

const SearchModal: FC<SearchModalProps> = ({}) => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
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
  }, [searchModal, router, params]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="What are you looking for?"
        subtitle="Find the perfect prompt"
      />

      <Tabs defaultValue="category" className="w-full">
        <TabsList>
          <TabsTrigger value="category">Search by category</TabsTrigger>
          <TabsTrigger value="text">Search by text</TabsTrigger>
        </TabsList>
        <TabsContent value="category"></TabsContent>
        <TabsContent value="text">
          <form>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <Modal
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
