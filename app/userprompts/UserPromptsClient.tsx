"use client";
import { FC, useCallback, useState } from "react";
import { SafePost, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import PostCard from "../components/posts/PostCard";
import Grid from "../components/Grid";

interface UserPromptsClientProps {
  posts: SafePost[];
  currentUser: SafeUser | null;
}

const UserPromptsClient: FC<UserPromptsClientProps> = ({
  posts,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/posts/${id}`)
        .then(() => {
          toast.success("Prompt deleted!", {
            position: "bottom-center",
            style: {
              borderRadius: "10px",
              background: "#21374a",
              color: "#fff",
            },
          });
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const cards = posts.map((post) => (
    <PostCard
      key={post.id}
      data={post}
      actionId={post.id}
      onAction={onCancel}
      disabled={deletingId == post.id}
      actionLabel="Delete Prompt"
      currentUser={currentUser}
    />
  ));

  return (
    <Container>
      <div className="p-4">
        <Heading title="Prompts" subtitle="List of your submitted prompts" />
        <div
          className="
        pt-8 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-4
        gap-8  
        "
        >
          <Grid posts={cards} />
        </div>
      </div>
    </Container>
  );
};

export default UserPromptsClient;
