"use client";
import { FC } from "react";
import PostCategory from "./PostCategory";
import { ButtonUi } from "../ButtonUi";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { SiOpenai } from "react-icons/si";

interface PostInfoProps {
  prompt: string;
  category:
    | {
        icon: string;
        label: string;
        description: string;
      }
    | undefined;
}

const PostInfo: FC<PostInfoProps> = ({ prompt, category }) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(prompt);

    toast("Prompt copied to clipboard!", {
      position: "bottom-right",
      icon: "👍",
      style: {
        borderRadius: "10px",
        background: "#21374a",
        color: "#fff",
      },
    });
  };

  const handleGPTCopyClick = () => {
    navigator.clipboard.writeText(prompt);

    toast("Prompt copied to clipboard! Navigating to ChatGPT", {
      position: "bottom-right",
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

  return (
    <div className=" col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        {category && (
          <PostCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
        )}
        <textarea
          className="select-all scrollbar-thin selection:bg-emerald-600/30 scrollbar-thumb-emerald-700 scrollbar-track-sky-900 font-light text-sm font-mono text-neutral-200 w-full bg-sky-900 border
     border-emerald-900 p-2 rounded-md cursor-pointer hover:shadow-md h-[200px] focus:outline-none focus:ring focus:ring-emerald-600"
          onClick={() => {}}
        >
          {prompt}
        </textarea>

        <div className="flex flex-row justify-content items-center gap-2">
          <ButtonUi variant="subtle" size="sm" onClick={handleCopyClick}>
            <IoCopy className="mr-2 h-4 w-4" /> Copy to clipboard
          </ButtonUi>
          <ButtonUi variant="ghost" size="sm" onClick={handleGPTCopyClick}>
            <SiOpenai className="mr-2 h-4 w-4" />
            Copy and open ChatGPT
          </ButtonUi>
        </div>
      </div>
    </div>
  );
};

export default PostInfo;