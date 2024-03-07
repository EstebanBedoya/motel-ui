import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { db } from '@/libs/prisma';
import { privateProcedure, router } from '@/server/trpc';

export const additionalRouter = router({
  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx.session;

      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
      }

      const additional = await db.additionals.create({
        data: {
          name: input.name,
          price: input.price,
        },
      });

      return additional;
    }),

  listAll: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session;

    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
    }

    const additional = await db.additionals.findMany();

    return additional;
  }),
});
