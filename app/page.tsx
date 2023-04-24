import getCurrentUser from "./actions/getCurrentUser";
import getPosts, { IPostParams } from "./actions/getPosts";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import PostCard from "./components/posts/PostCard";
import ClientOnly from "./components/ClientOnly";
import { PageWrapper } from "./components/PageWrapper";
import Grid from "./components/Grid";

interface HomeProps {
  searchParams: IPostParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const posts = await getPosts(searchParams);

  const currentUser = await getCurrentUser();

  const cards = posts.map((post) => {
    return <PostCard currentUser={currentUser} key={post.id} data={post} />;
  });

  if (posts.length == 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PageWrapper>
        <Container>
          <div
            className="
            pt-4 pb-8 px-4 
            "
          >
            <Grid posts={cards} />
          </div>
        </Container>
      </PageWrapper>
    </ClientOnly>
  );
};

export default Home;
