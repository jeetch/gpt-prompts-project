import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  category?: string;
}

export default async function getPosts(
  params: IListingsParams
) {
  try {
    const {
      userId,
      category,
    } = params;

    let query: any = {
        userId,
        category,
      };

    

    const posts = await prisma.post.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
          user: true
      }
    });

    const safePosts = posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      user: {
          ...post.user,
          createdAt: post.user.createdAt.toISOString(),
          updatedAt: post.user.updatedAt.toISOString(),
          emailVerified:  
          post.user.emailVerified?.toISOString() || null,
      }
    }));

    return safePosts;
  } catch (error: any) {
    throw new Error(error);
  }
}