import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./prisma/client";

const globalForprisma= globalThis as unknown as{
    prisma:PrismaClient | undefined
}// this is to avoid creating multiple instances of PrismaClient in development mode, which can lead to issues with hot reloading.(AND SAVE RESOURCES and will not create multiple connections to the database when reloading the application in development mode.)


export const prisma= globalForprisma.prisma ?? new PrismaClient({
    adapter:new PrismaPg({connectionString:process.env.DATABASE_URL})
})// This is to ensure that we only create a new instance of PrismaClient if one does not already exist in the global scope.

if (process.env.NODE_ENV !=="production") {globalForprisma.prisma=prisma}