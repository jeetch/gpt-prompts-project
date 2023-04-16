import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoritePosts from "@/app/actions/getFavoritePosts";

import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const posts = await getFavoritePosts();
  const currentUser = await getCurrentUser();

  if (posts.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient posts={posts} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
