import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import PostClient from "./PostClient";
import getPostById from "@/app/actions/getPostById";

interface IParams {
  postId?: string;
}

const PostPage = async ({ params }: { params: IParams }) => {
  const post = await getPostById(params);
  const currentUser = await getCurrentUser();

  if (!post) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PostClient post={post} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PostPage;
