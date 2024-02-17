import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prismaClientSingleton = () => new PrismaClient();

const prisma = globalThis.prisma ?? prismaClientSingleton();

export const db = prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
