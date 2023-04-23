import { FC } from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  submit?: boolean;
  user?: boolean;
  logout?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({
  onClick,
  label,
  submit = false,
  user = false,
  logout = false,
}) => {
  let bodycontent = (
    <div
      onClick={onClick}
      className={`px-4 py-3 hover:bg-emerald-900/20  transition  ${
        submit ? "text-emerald-500" : "text-white"
      }`}
    >
      {label}
    </div>
  );

  if (user) {
    bodycontent = (
      <div className="px-4 py-3 transition  text-neutral-300  border-b-emerald-500 cursor-default">
        Welcome, {label} 👋
      </div>
    );
  }

  if (logout) {
    bodycontent = (
      <div
        onClick={onClick}
        className={`px-4 py-3 hover:bg-red-900/20  transition  ${
          submit ? "text-red-800" : "text-red-600"
        }`}
      >
        {label}
      </div>
    );
  }

  return <>{bodycontent}</>;
};

export default MenuItem;
