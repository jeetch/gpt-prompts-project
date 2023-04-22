"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { SafeUser } from "../types";
import { categories } from "./navbar/Categories";

interface CategoryBannerProps {
  currentUser?: SafeUser | null;
}

const CategoryBanner: FC<CategoryBannerProps> = ({ currentUser }) => {
  const params = useSearchParams();
  const category = params?.get("category");

  const categoryObj = categories.find((c) => c.label === category);

  return (
    <>
      <div className="relative  ">
        <div
          className={`text-center px-6 py-2 ${category ? "block" : "hidden"}`}
        >
          <h3 className="text-emerald-400 text-sm mt-2 sm:mb-2 ">
            {categoryObj ? categoryObj.description : ""}
          </h3>
        </div>
      </div>
    </>
  );
};

export default CategoryBanner;
