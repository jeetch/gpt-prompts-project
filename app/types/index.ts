import { Post, User } from "@prisma/client";

export type SafePost = Omit<Post, "createdAt"> & {
  createdAt: string;
  user: SafeUser; 
};



export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};