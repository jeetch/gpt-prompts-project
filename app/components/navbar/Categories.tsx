"use client";

import { FC } from "react";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import CatergoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

interface CategoriesProps {}

export const categories = [
  {
    label: "🗒️ All",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "🎓 Education & Tutoring",
    icon: GiWindmill,
    description: "This property is has windmills!",
  },
  {
    label: "💪 Health and Wellness",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "🏠 Home and Property",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "🏋️ Sports and Fitness",
    icon: TbPool,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activies!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];

const Categories: FC<CategoriesProps> = ({}) => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();
  const isMainPage = pathName == "/";
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="block md:flex pt-4 flex-row items-center justify-center gap-2 flex-wrap">
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
