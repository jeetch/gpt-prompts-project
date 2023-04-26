import { FC } from "react";
import { SafePost, SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import PostCard from "../components/posts/PostCard";
import Grid from "../components/Grid";

interface FavoritesClientProps {
  posts: SafePost[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: FC<FavoritesClientProps> = ({ posts, currentUser }) => {
  const cards = posts.map((post) => (
    <PostCard key={post.id} data={post} currentUser={currentUser} />
  ));

  return (
    <Container>
      <div className="p-4 mt-16">
        <Heading
          title="Favorites"
          subtitle="List of prompts you have favorited"
        />

        <Grid posts={cards} />
      </div>
    </Container>
  );
};

export default FavoritesClient;
