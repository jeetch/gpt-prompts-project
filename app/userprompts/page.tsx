import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import UserPromptsClient from "./UserPromptsClient";
import getPosts from "../actions/getPosts";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const posts = await getPosts({
    userId: currentUser.id,
  });

  if (posts.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No prompts found"
          subtitle="Looks like you have not sumitted any prompts!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <UserPromptsClient posts={posts} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
