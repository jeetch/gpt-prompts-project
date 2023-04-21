"use client";

import { FC } from "react";
import Container from "../Container";
import CatergoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface CategoriesProps {}

export const categories = [
  {
    label: "Fun",
    icon: "🎉",
    description: "This property is has windmills!",
  },
  {
    label: "Education and Tutoring",
    icon: "🎓",
    description: "This property is has windmills!",
  },
  {
    label: "Writing",
    icon: "",
    description: "This property is modern!",
  },
  {
    label: "Home and Property",
    icon: "🏠",
    description: "This property is in the countryside!",
  },
  {
    label: "Sports and Fitness",
    icon: "🏋️",
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Coding and Programming",
    icon: "💻",
    description: "This property is on an island!",
  },
  {
    label: "Cooking and Recipes",
    icon: "🍳",
    description: "This property is near a lake!",
  },
];

const Categories: FC<CategoriesProps> = ({}) => {
  const router = useRouter();
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();
  const isMainPage = pathName == "/";
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="flex flex-wrap justify-center p-5 items-center  gap-2 ">
        <div
          onClick={() => router.push("/")}
          className={`text-xs sm:text-sm p-1 px-2 sm:p-2 sm:gap-2  md:gap-4
      border bg-sky-900 rounded-full text-neutral-200
      hover:text-emerald-300 hover:scale-95 transition cursor-pointer border-transparent`}
        >
          {"✔️ All"}
        </div>

        {categories.map((item) => (
          <CatergoryBox
            key={item.label}
            label={item.label}
            selected={category == item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
