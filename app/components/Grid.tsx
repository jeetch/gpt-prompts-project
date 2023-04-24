"use client";
import { FC } from "react";

import Masonry from "react-masonry-css";
interface GridProps {
  posts: JSX.Element[];
}

const Grid: FC<GridProps> = ({ posts }) => {
  const breakpointColumnsObj = {
    default: 4,
    1800: 3,
    1500: 2,
    1000: 1,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {posts}
    </Masonry>
  );
};

export default Grid;
