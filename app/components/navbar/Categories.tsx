"use client";

import { FC } from "react";
import Container from "../Container";
import CatergoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface CategoriesProps {}

export const categories = [
  {
    label: "Business and Marketing",
    icon: "💼",
    description:
      "Explore prompts related to business strategies, marketing campaigns, and industry insights",
  },
  {
    label: "Literature and Writing",
    icon: "📚",
    description:
      "Explore prompts related to literature, writing techniques, and author insights",
  },
  {
    label: "Education and Research",
    icon: "📝",
    description:
      "Explore prompts related to literature, writing techniques, and author insights",
  },

  {
    label: "Conversation and Language",
    icon: "💬",
    description:
      "Explore prompts related to improving language skills and engaging in stimulating conversations",
  },
  {
    label: "Movies",
    icon: "🎥",
    description:
      "Explore prompts related to movies, TV shows, actors, and all things entertainment",
  },
  {
    label: "Spiritual",
    icon: "🙏",
    description:
      "Explore prompts related to spirituality, mindfulness, and the world of beliefs and practices",
  },
  {
    label: "Cooking",
    icon: "🍽️",
    description:
      "Explore prompts related to sharing recipes, cooking tips, and indulging in culinary discussions",
  },
  {
    label: "Music",
    icon: "🎵",
    description:
      "Explore prompts related to your favorite artists, genres, and the impact of music in our lives",
  },
  {
    label: "Programming",
    icon: "💻",
    description:
      "Explore prompts related to coding, programming languages, and software development",
  },
  {
    label: "Personal Development",
    icon: "🌟",
    description:
      "Explore prompts related to personal growth, skill development, and self-improvement",
  },
  {
    label: "Career",
    icon: "🎓",
    description:
      "Explore prompts related to career growth, job opportunities, and professional networking",
  },
  {
    label: "Others",
    icon: "🔍",
    description:
      "Explore prompts related to various other topics and interests",
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
      <div className="flex flex-wrap justify-center sm:p-4 px-2 items-center  gap-2 mt-20 sm:mt-16">
        <div
          onClick={() => router.push("/")}
          className={`text-xs sm:text-sm p-1 px-2 sm:p-2 sm:gap-2  md:gap-4
      border bg-sky-900 rounded-full text-neutral-200
      hover:text-emerald-300 hover:scale-95 transition cursor-pointer border-transparent`}
        >
          {"✅ All"}
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
