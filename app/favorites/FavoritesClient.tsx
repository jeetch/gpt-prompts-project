import { FC } from "react";
import { SafePost, SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import PostCard from "../components/posts/PostCard";

interface FavoritesClientProps {
  posts: SafePost[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: FC<FavoritesClientProps> = ({ posts, currentUser }) => {
  return (
    <Container>
      <div className="p-4">
        <Heading
          title="Favorites"
          subtitle="List of prompts you have favorited"
        />

        <div
          className="
        pt-4 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-4
        gap-8  
        "
        >
          {posts.map((post) => (
            <PostCard key={post.id} data={post} currentUser={currentUser} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FavoritesClient;
