import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      roomCount, 
      guestCount, 
      bathroomCount, 
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {
        userId,
        category,
        locationValue,
        roomCount: roomCount ? { gte: +roomCount } : undefined,
        guestCount: guestCount ? { gte: +guestCount } : undefined,
        bathroomCount: bathroomCount ? { gte: +bathroomCount } : undefined,
        NOT: startDate && endDate
          ? {
              reservations: {
                some: {
                  OR: [
                    {
                      endDate: { gte: startDate },
                      startDate: { lte: startDate },
                    },
                    {
                      startDate: { lte: endDate },
                      endDate: { gte: endDate },
                    },
                  ],
                },
              },
            }
          : undefined,
      };

    

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
          user: true
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
          ...listing.user,
          createdAt: listing.user.createdAt.toISOString(),
          updatedAt: listing.user.updatedAt.toISOString(),
          emailVerified:  
              listing.user.emailVerified?.toISOString() || null,
      }
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}