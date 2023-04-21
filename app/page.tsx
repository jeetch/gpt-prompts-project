import getCurrentUser from "./actions/getCurrentUser";
import getPosts, { IPostParams } from "./actions/getPosts";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import PostCard from "./components/posts/PostCard";
import ClientOnly from "./components/ClientOnly";
import SearchHeader from "./components/SearchHeader";

interface HomeProps {
  searchParams: IPostParams;
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
            pt-2 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4
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
