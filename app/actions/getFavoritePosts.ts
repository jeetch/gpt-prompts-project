import getCurrentUser from "./getCurrentUser";
import prisma from '@/app/libs/prismadb';


export default async function getFavoritePosts() {
    try{
        const currentUser = await getCurrentUser();

        if(!currentUser){ return[] };

        const favorites = await prisma.post.findMany({
            where: {
              id: {
                in: [...(currentUser.favoriteIds || [])]
              }
            },
            include: {
                user: true
            }
        })

        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString(),
            user: {
                ...favorite.user,
                createdAt: favorite.user.createdAt.toISOString(),
                updatedAt: favorite.user.updatedAt.toISOString(),
                emailVerified:  
                favorite.user.emailVerified?.toISOString() || null,
            }
        }))

        return safeFavorites


    } catch (error: any) {
        throw new Error(error)
    }

    
} 