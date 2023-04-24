"use client";
import { FC } from "react";

import Masonry from "react-masonry-css";
interface GridProps {
  posts: JSX.Element[];
}

const Grid: FC<GridProps> = ({ posts }) => {
  const breakpointColumnsObj = {
    default: 4,
    2000: 4,
    1800: 3,
    1200: 2,
    600: 1,
  };

  return (
    <div
      className="
            pt-4 pb-8 px-4 lg:px-8 xl:px-10
            "
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {posts}
      </Masonry>
    </div>
  );
};

export default Grid;
