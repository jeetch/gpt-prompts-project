import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  postId: string;
  currentUser?: SafeUser | null
}

const useFavorite = ({ postId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(postId);
  }, [currentUser, postId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {

      console.log("Hello0o0!")
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${postId}`);
      } else {
        console.log("Hello!")
        request = () => axios.post(`/api/favorites/${postId}`);
      }

      await request();
      router.refresh();

      {(hasFavorited) ? 
      toast("💔 Prompt un-favorited", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
          background: "#21374a",
          color: "#fff",
        },
      })
       : 
      toast("❤️ Prompt favorited!", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
          background: "#21374a",
          color: "#fff",
        },
      })
      }
      
    } catch (error) {
      toast("😓 Something went wrong", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
          background: "#21374a",
          color: "#fff",
        },
      });
      
    }
  }, 
  [
    currentUser, 
    hasFavorited, 
    postId, 
    loginModal,
    router
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;