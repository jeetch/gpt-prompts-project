import getCurrentUser from "./actions/getCurrentUser";
import getPosts, { IListingsParams } from "./actions/getPosts";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import PostCard from "./components/posts/PostCard";
import ClientOnly from "./components/ClientOnly";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const posts = await getPosts(searchParams);

  const currentUser = await getCurrentUser();

  if (posts.length == 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-2 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-4
            gap-8  
            "
        >
          {posts.map((post) => {
            return (
              <PostCard currentUser={currentUser} key={post.id} data={post} />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
