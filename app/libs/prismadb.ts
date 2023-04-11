import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient()

// Imports prisma client as a global object so it does not get affected
// by hot-reloading prisma
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;