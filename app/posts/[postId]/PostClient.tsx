"use client";

import Container from "@/app/components/Container";
import PostHead from "@/app/components/posts/PostHead";
import PostInfo from "@/app/components/posts/PostInfo";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafePost, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { FC, useMemo } from "react";
import { IoChevronBack } from "react-icons/io5";

interface PostClientProps {
  post: SafePost;
  currentUser?: SafeUser | null;
}

const PostClient: FC<PostClientProps> = ({ post, currentUser }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const category = useMemo(() => {
    return categories.find((item) => item.label == post.category);
  }, [post.category]);

  return (
    <Container>
      <button
        type="button"
        onClick={() => router.back()}
        className="mt-4 flex items-center text-slate-400 text-sm hover:text-emerald-500"
      >
        <IoChevronBack />
        Back
      </button>
      <div className="h-auto border hover:border-emerald-700 border-emerald-900 rounded-md shadow-md hover:shadow-xl p-4 max-w-screen-lg mx-auto m-8">
        <PostHead
          favorites={post.favorites}
          title={post.title}
          user={post.user}
          id={post.id}
          currentUser={currentUser}
          description={post.description ?? undefined}
          source={post.source}
        />
        <PostInfo category={category} prompt={post.prompt} />
      </div>
    </Container>
  );
};

export default PostClient;
