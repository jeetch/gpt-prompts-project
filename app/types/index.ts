import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<
Listing,
"createdAt"
> &{
    createdAt: string;
}

export type SafeReservation = Omit<
Reservation,
"createdAt" | "startDate" | "endDate" | "listing"
> &{
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
}


export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerfied"
> &{
    createdAt: string;
    updatedAt: string;
    emailVerfied: string | null;
}