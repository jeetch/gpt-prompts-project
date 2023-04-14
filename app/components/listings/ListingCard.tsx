"use client";

import { FC, useCallback, useMemo, useState } from "react";
import { SafeListing, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { format } from "date-fns";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { ButtonUi } from "../ButtonUi";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { SiOpenai } from "react-icons/si";

interface ListingCardProps {
  data: SafeListing & {
    user: SafeUser;
  };
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(data.description);
    setCopied(true);

    toast("Prompt copied to clipboard!", {
      position: "bottom-right",
      icon: "👍",
      style: {
        borderRadius: "10px",
        background: "#21374a",
        color: "#fff",
      },
    });
    // setTimeout(function () {
    //   window.open("https://chat.openai.com");
    // }, 5000);
  };

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  return (
    <div className="relative flex flex-col col-span-1 gap-y-2  group border hover:border-emerald-700 border-emerald-900 rounded-md shadow-md hover:shadow-xl p-4">
      <div className="absolute top-2 right-2">
        <HeartButton listingId={data.id} currentUser={currentUser} />
      </div>

      <span className=" text-emerald-400 text-xs font-medium ">
        {data.category}
      </span>

      <div
        className="font-semibold text-neutral-200 text-lg cursor-pointer hover:text-highlight-400"
        onClick={() => router.push(`/listings/${data.id}`)}
      >
        {data.title}
      </div>
      <div
        className="font-light text-neutral-200 w-full bg-sky-900 border
     border-emerald-900 p-2 rounded-md cursor-pointer hover:shadow-md h-[80px]"
        onClick={() => router.push(`/listings/${data.id}`)}
      >
        {data.description}
      </div>
      <div className="flex flex-row justify-content items-center gap-2">
        <ButtonUi variant="subtle" size="sm" onClick={handleCopyClick}>
          <IoCopy className="mr-2 h-4 w-4" /> Copy to clipboard
        </ButtonUi>
        <ButtonUi variant="ghost" size="sm" onClick={handleCopyClick}>
          <SiOpenai className="mr-2 h-4 w-4" />
          Copy and open ChatGPT
        </ButtonUi>
      </div>

      <div className="text-xs font-light flex flex-row items-center gap-2 text-neutral-400">
        <div> Contributed by {data.user?.name} </div>
        {/* <Avatar src={data.user?.image} /> */}
      </div>
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  );
};

export default ListingCard;
