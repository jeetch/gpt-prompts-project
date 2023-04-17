import { FC } from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  submit?: boolean;
  user?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({
  onClick,
  label,
  submit = false,
  user = false,
}) => {
  let bodycontent = (
    <div
      onClick={onClick}
      className={`px-4 py-3 hover:bg-emerald-900/20  transition font-semibold ${
        submit ? "text-emerald-500" : "text-white"
      }`}
    >
      {label}
    </div>
  );

  if (user) {
    bodycontent = (
      <div className="px-4 py-3 transition  text-neutral-200 border-b-emerald-500 cursor-default">
        Welcome, {label} 👋
      </div>
    );
  }

  return <>{bodycontent}</>;
};

export default MenuItem;
