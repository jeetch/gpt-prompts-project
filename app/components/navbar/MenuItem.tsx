"use client";

import { FC } from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-slate-600 transition font-semibold"
    >
      {label}
    </div>
  );
};

export default MenuItem;
