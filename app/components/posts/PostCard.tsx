"use client";

import { FC, useCallback, useMemo, useState } from "react";
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
import ShowMoreText from "react-show-more-text";

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
      position: "top-center",
      icon: "👍",
      style: {
        borderRadius: "10px",
        background: "#21374a",
        color: "#fff",
      },
    });
  };

  const handleGPTCopyClick = () => {
    navigator.clipboard.writeText(data.prompt);
    setCopied(true);

    toast("Prompt copied to clipboard! Navigating to ChatGPT", {
      position: "top-center",
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
    <div className="relative flex flex-col col-span-1 gap-y-2  group border hover:border-emerald-700 border-emerald-900 rounded-md shadow-md hover:shadow-xl p-4">
      <div className="absolute top-2 right-2">
        <HeartButton postId={data.id} currentUser={currentUser} />
      </div>

      <span
        className=" text-emerald-400 text-xs  cursor-pointer  hover:font-semibold"
        onClick={handleClick}
      >
        {getCategoryIcon(data.category)} {data.category}
      </span>

      <div
        className="font-semibold text-neutral-200 text-lg cursor-pointer hover:text-highlight-400 hover:font-bold"
        onClick={() => router.push(`/posts/${data.id}`)}
      >
        {data.title}
      </div>
      {/* <textarea
        className="select-all scrollbar-thin selection:bg-emerald-600/30 scrollbar-thumb-emerald-700 scrollbar-track-sky-900 font-light text-sm font-mono text-neutral-200 w-full bg-sky-900 border
     border-emerald-900 p-2 rounded-md cursor-pointer hover:border-emerald-700 hover:shadow-md h-[200px] focus:outline-none focus:ring focus:ring-emerald-600"
        onClick={() => {}}
      > */}
      <ShowMoreText
        lines={3}
        more="Show more"
        less="Show less"
        className="select-all scrollbar-thin selection:bg-emerald-600/30 scrollbar-thumb-emerald-700 scrollbar-track-sky-900 font-light text-sm font-mono text-neutral-200 w-full bg-sky-900 border
        border-emerald-900 p-2 rounded-md cursor-pointer hover:border-emerald-700 hover:shadow-md h-auto focus:outline-none focus:ring focus:ring-emerald-600"
        anchorClass="show-more-less-clickable"
        expanded={false}
        width={280}
        truncatedEndingComponent={"... "}
      >
        {data.prompt}
      </ShowMoreText>
      {/* </textarea> */}
      <div className="flex flex-row justify-content items-center gap-2">
        <ButtonUi variant="subtle" size="sm" onClick={handleCopyClick}>
          <IoCopy className="mr-2 h-4 w-4" /> Copy to clipboard
        </ButtonUi>
        <ButtonUi variant="ghost" size="sm" onClick={handleGPTCopyClick}>
          <SiOpenai className="mr-2 h-4 w-4" />
          Copy and open ChatGPT
        </ButtonUi>
      </div>

      <div className="text-xs font-light flex flex-row items-center gap-2 text-neutral-400">
        <div> Contributed by {data.user?.name} </div>
      </div>
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
