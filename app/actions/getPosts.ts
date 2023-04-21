import prisma from "@/app/libs/prismadb";

export interface IPostParams {
  userId?: string;
  category?: string;
  search?: string; // Add search parameter
}

export default async function getPosts(
  params: IPostParams
) {
  try {
    const {
      userId,
      category,
      search, 
    } = params;

    let query: any = {
      userId,
      category,
    };

    if (search) {
      query = {
        ...query,
        OR: [
          { category: { contains: search, mode: "insensitive" } },
          { title: { contains: search, mode: "insensitive" } },
          { prompt: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    const posts = await prisma.post.findMany({
      where: query,
      orderBy: {
        favorites: 'desc'
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