import { FC } from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  submit?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ onClick, label, submit = false }) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 hover:bg-emerald-900/20  transition font-semibold ${
        submit ? "text-emerald-500" : "text-white"
      }`}
    >
      {label}
    </div>
  );
};

export default MenuItem;
