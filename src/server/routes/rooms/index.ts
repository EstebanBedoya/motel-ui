import { z } from 'zod';
import { Additionals, RateType, RoomStatus } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { db } from '@/libs/prisma';
import { privateProcedure, router } from '@/server/trpc';

export const roomsRouter = router({
  create: privateProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        type: z.string(),
        state: z.enum(['available', 'occupied', 'maintenance', 'cleaning']),
        shortPrice: z.object({
          weekday: z.number(),
          weekend: z.number(),
        }),
        longPrice: z.object({
          weekday: z.number(),
          weekend: z.number(),
        }),
        additional: z.array(z.number()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx.session;

      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
      }

      const room = await db.room.create({
        data: {
          id: input.id,
          name: input.name,
          type: input.type,
          status: input.state as RoomStatus,
        },
      });

      await db.price.create({
        data: {
          roomId: room.id,
          rateType: 'hourly',
          weekday: input.shortPrice.weekday,
          weekend: input.shortPrice.weekend,
        },
      });

      await db.price.create({
        data: {
          roomId: room.id,
          rateType: 'overnight',
          weekday: input.longPrice.weekday,
          weekend: input.longPrice.weekend,
        },
      });

      if (input.additional?.length) {
        await db.additionalRoom.createMany({
          data: input.additional.map((additionalId) => ({
            additionalId,
            roomId: room.id,
          })),
        });
      }

      return room;
    }),

  listAll: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session;

    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
    }

    const rooms = await db.room.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return rooms;
  }),

  getById: privateProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const { user } = ctx.session;

    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
    }

    const room = await db.room.findUnique({
      where: {
        id: input,
      },
    });

    if (!room) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Room not found' });
    }

    const pricesHourly = await db.price.findFirst({
      select: {
        rateType: true,
        weekday: true,
        weekend: true,
        special: true,
      },
      where: {
        roomId: room.id,
        rateType: RateType.hourly,
      },
    });

    const pricesOvernight = await db.price.findFirst({
      select: {
        rateType: true,
        weekday: true,
        weekend: true,
        special: true,
      },
      where: {
        roomId: room.id,
        rateType: RateType.overnight,
      },
    });

    if (!pricesHourly || !pricesOvernight) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Prices not found' });
    }

    const additional = await db.additionalRoom.findMany({
      where: {
        roomId: room.id,
      },
      select: {
        additional: true,
      },
    });

    const roomResponse = {
      ...room,
      prices: {
        hourly: pricesHourly,
        overnight: pricesOvernight,
      },
      additional: additional.map((add: Additionals) => add.additional),
    };

    return roomResponse;
  }),

  updateState: privateProcedure
    .input(
      z.object({
        roomId: z.number(),
        newState: z
          .enum(['available', 'occupied', 'maintenance', 'cleaning'])
          .optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx.session;

      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
      }

      const nextState = {
        available: RoomStatus.occupied,
        occupied: RoomStatus.cleaning,
        cleaning: RoomStatus.available,
      };

      const room = await db.room.findUnique({
        where: {
          id: input.roomId,
        },
      });

      const newState = input.newState ?? nextState[room.state as keyof typeof nextState];

      const roomUpdated = await db.room.update({
        where: {
          id: input.roomId,
        },
        data: {
          status: newState as RoomStatus,
        },
      });

      return roomUpdated;
    }),
});
