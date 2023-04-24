"use client";

import { FC, useCallback, useState } from "react";
import { SafePost, SafeUser } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { ButtonUi } from "../ButtonUi";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { SiOpenai } from "react-icons/si";
import { categories } from "../navbar/Categories";
import qs from "query-string";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";

interface PostCardProps {
  data: SafePost & {
    user: SafeUser;
  };
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const PostCard: FC<PostCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(data.prompt);
    setCopied(true);

    toast("Prompt copied to clipboard!", {
      position: "bottom-center",
      icon: "👍",
      style: {
        borderRadius: "10px",
        background: "#21374a",
        color: "#fff",
      },
    });
  };

  const readingTime = require("reading-time");

  const stats = readingTime(data.prompt);
  const n_words = stats.words + " words";

  const handleGPTCopyClick = () => {
    navigator.clipboard.writeText(data.prompt);
    setCopied(true);

    toast("Prompt copied to clipboard! Navigating to ChatGPT", {
      position: "bottom-center",
      icon: "👍",
      style: {
        borderRadius: "10px",
        background: "#21374a",
        color: "#fff",
      },
    });
    setTimeout(() => {
      window.open("https://chat.openai.com/", "_blank");
    }, 1000);
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

  const getCategoryIcon = (categoryLabel: string) => {
    const category = categories.find((cat) => cat.label === categoryLabel);
    return category ? category.icon : "";
  };

  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: data.category,
    };

    if (params?.get("category") == data.category) {
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
  }, [data.category, params, router]);

  return (
    <div className="h-fit relative flex flex-col col-span-1 gap-y-2   group border hover:border-emerald-700 border-emerald-900 rounded-md shadow-md hover:shadow-xl p-4">
      <div className="absolute top-2 right-2 scale-75 ">
        <HeartButton
          postId={data.id}
          favorites={data.favorites}
          currentUser={currentUser}
        />
      </div>
      {/* Category Label */}
      <span
        className=" text-emerald-400 text-xs  cursor-pointer  hover:font-semibold"
        onClick={handleClick}
      >
        {getCategoryIcon(data.category)} {data.category}
      </span>
      {/* Title */}
      <div
        className="font-semibold text-neutral-200 text-lg cursor-pointer hover:underline hover:decoration-emerald-500 hover:underline-offset-4"
        onClick={() => router.push(`/posts/${data.id}`)}
      >
        {data.title}
      </div>
      {/* Description */}
      <p
        className="text-slate-400 text-sm hover:cursor-pointer"
        onClick={() => router.push(`/posts/${data.id}`)}
      >
        {data?.description}{" "}
        <a className="text-slate-400 text-xs font-light ">{n_words}</a>
      </p>

      {/* Prompt */}
      {/* <ShowMoreText
        lines={1}
        more="Show"
        less="Show less"
        className="select-text cursor-text scrollbar-thin selection:bg-emerald-600/30 scrollbar-thumb-emerald-700 scrollbar-track-sky-900 font-light text-sm font-mono  w-full bg-slate-800 border
        border-none text-slate-400 p-2 rounded-md hover:border-emerald-700 hover:shadow-md focus:outline-none focus:ring focus:ring-emerald-600"
        anchorClass="show-more-less-clickable"
        expanded={false}
        width={280}
        truncatedEndingComponent={"... "}
      >
        {data.prompt}
      </ShowMoreText> */}
      {/* Buttons */}
      <div className="flex flex-row justify-content items-center gap-2">
        <ButtonUi
          variant="subtle"
          size="sm"
          onClick={() => router.push(`/posts/${data.id}`)}
        >
          <AiFillEdit className="mr-2 h-4 w-4" /> Edit
        </ButtonUi>
        <ButtonUi variant="ghost" size="sm" onClick={handleCopyClick}>
          <IoCopy className="mr-2 h-4 w-4" /> Copy
        </ButtonUi>
        <ButtonUi variant="ghost" size="sm" onClick={handleGPTCopyClick}>
          <SiOpenai className="mr-2 h-4 w-4" />
          Copy and open ChatGPT
        </ButtonUi>
      </div>
      {/* Footer */}
      <div className="text-xs font-light flex flex-row justify-start  items-center gap-2 text-slate-400">
        <div> Contributed by {data.user?.name} </div>
        {data.source ? (
          <Link
            href={data.source}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            source
          </Link>
        ) : (
          ""
        )}
      </div>
      {/* Delete Button */}
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
          deletePrompt
          // icon={MdDeleteOutline}
        />
      )}
    </div>
  );
};

export default PostCard;
