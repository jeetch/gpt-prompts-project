import prisma from "@/app/libs/prismadb";

export default async function getPostFavoritesCount(postId: string) {
 try{ const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { favorites: true },
  });

  return post?.favorites || 0;}
  catch {return 0}
}


