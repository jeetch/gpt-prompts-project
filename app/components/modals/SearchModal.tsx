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
