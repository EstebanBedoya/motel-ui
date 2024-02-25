import { z } from 'zod';
import { RateType, RecordType, RoomStatus } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { db } from '@/libs/prisma';
import { privateProcedure, router } from '@/server/trpc';

export const recordsRouter = router({
  checkInRoom: privateProcedure
    .input(
      z.object({
        roomId: z.number(),
        rateType: z.enum([RateType.hourly, RateType.overnight]),
        instructions: z.string().optional(),
        additional: z.array(z.number()).optional(),
        isWeekDay: z.boolean(),
        checkIn: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { user: userSession } = ctx.session;

      if (!userSession) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
      }

      const user = await db.user.findFirst({
        where: {
          email: userSession.email as string,
        },
      });

      const additional = await db.additionals.findMany({
        select: {
          price: true,
        },
        where: {
          id: {
            in: input.additional,
          },
        },
      });

      const totalAdditional = additional.reduce(
        (acc: number, current: { price: number }) => acc + current.price,
        0,
      );

      const roomPrice = await db.price.findFirst({
        select: {
          weekday: true,
          weekend: true,
        },
        where: {
          roomId: input.roomId,
          rateType: input.rateType,
        },
      });

      const price = input.isWeekDay ? roomPrice.weekday : roomPrice.weekend;

      const total = price + totalAdditional;

      const record = await db.record.create({
        data: {
          roomId: input.roomId,
          userId: user.id,
          recordType: RecordType.occupied,
          rateType: input.rateType as RateType,
          startTime: input.checkIn,
          endTime: new Date(),
          instructions: input.instructions,
          aditionalIds: input.additional,
          priceRate: price,
          total,
        },
      });

      await db.room.update({
        where: {
          id: input.roomId,
        },
        data: {
          status: RoomStatus.occupied,
          temporalRecordId: record.id,
        },
      });

      return record;
    }),

  checkOutRoom: privateProcedure
    .input(
      z.object({
        roomId: z.number(),
        endTime: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { user: userSession } = ctx.session;

      if (!userSession) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
      }

      const room = await db.room.findFirst({
        select: {
          temporalRecordId: true,
        },
        where: {
          id: input.roomId,
        },
      });

      const lastRecord = await db.record.findFirst({
        where: {
          id: room.temporalRecordId,
          recordType: RecordType.occupied,
        },
      });

      await db.record.update({
        where: {
          id: lastRecord.id,
        },
        data: {
          endTime: input.endTime,
        },
      });

      const cleaningRecord = await db.record.create({
        data: {
          roomId: input.roomId,
          userId: lastRecord.userId,
          recordType: RecordType.cleaning,
          startTime: input.endTime,
          endTime: new Date(),
          instructions: 'Room cleaning',
        },
      });

      await db.room.update({
        where: {
          id: input.roomId,
        },
        data: {
          status: RoomStatus.cleaning,
          temporalRecordId: cleaningRecord.id,
        },
      });
    }),

  addExtension: privateProcedure
    .input(
      z.object({
        roomId: z.number(),
        additional: z.array(z.number()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { user: userSession } = ctx.session;

      if (!userSession) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
      }

      const additional = await db.additionals.findMany({
        select: {
          price: true,
        },
        where: {
          id: {
            in: input.additional,
          },
        },
      });

      const totalAdditional = additional.reduce(
        (acc: number, current: { price: number }) => acc + current.price,
        0,
      );

      const room = await db.room.findFirst({
        select: {
          temporalRecordId: true,
        },
        where: {
          id: input.roomId,
        },
      });

      const recordUpdated = await db.record.update({
        where: {
          id: room.temporalRecordId,
        },
        data: {
          aditionalIds: {
            push: input.additional,
          },
          total: {
            increment: totalAdditional,
          },
        },
      });

      return recordUpdated;
    }),

  endCleaning: privateProcedure
    .input(
      z.object({
        roomId: z.number(),
        endTime: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      const room = await db.room.findFirst({
        select: {
          temporalRecordId: true,
        },
        where: {
          id: input.roomId,
        },
      });

      const lastRecord = await db.record.findFirst({
        where: {
          id: room.temporalRecordId,
          recordType: RecordType.cleaning,
        },
      });

      await db.record.update({
        where: {
          id: lastRecord.id,
        },
        data: {
          endTime: input.endTime,
        },
      });

      await db.room.update({
        where: {
          id: input.roomId,
        },
        data: {
          status: RoomStatus.available,
          temporalRecordId: null,
        },
      });
    }),

  startMaintenance: privateProcedure
    .input(
      z.object({
        roomId: z.number(),
        startTime: z.date(),
        maintenanceManager: z.string().optional(),
        phoneNumber: z.string().optional(),
        maintenanceValue: z.number().optional(),
        maintenanceDetails: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { user: userSession } = ctx.session;

      if (!userSession) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
      }

      const user = await db.user.findFirst({
        where: {
          email: userSession.email as string,
        },
      });

      const record = await db.record.create({
        data: {
          roomId: input.roomId,
          recordType: RecordType.maintenance,
          userId: user.id,
          startTime: input.startTime,
          endTime: new Date(),
          instructions: 'Room maintenance',
          maintenanceManager: input.maintenanceManager,
          phoneNumber: input.phoneNumber,
          maintenanceValue: input.maintenanceValue,
          maintenanceDetails: input.maintenanceDetails,
        },
      });

      await db.room.update({
        where: {
          id: input.roomId,
        },
        data: {
          status: RoomStatus.maintenance,
          temporalRecordId: record.id,
        },
      });
    }),

  endMaintenance: privateProcedure
    .input(
      z.object({
        roomId: z.number(),
        endTime: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { user: userSession } = ctx.session;

      if (!userSession) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
      }

      const room = await db.room.findFirst({
        select: {
          temporalRecordId: true,
        },
        where: {
          id: input.roomId,
        },
      });

      const lastRecord = await db.record.findFirst({
        where: {
          id: room.temporalRecordId,
          recordType: RecordType.maintenance,
        },
      });

      await db.record.update({
        where: {
          id: lastRecord.id,
        },
        data: {
          endTime: input.endTime,
        },
      });

      await db.room.update({
        where: {
          id: input.roomId,
        },
        data: {
          status: RoomStatus.available,
          temporalRecordId: null,
        },
      });
    }),

  getRecord: privateProcedure
    .input(
      z.object({
        roomId: z.number(),
        recordType: z.enum([
          RecordType.occupied,
          RecordType.cleaning,
          RecordType.maintenance,
        ]),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { user: userSession } = ctx.session;

      if (!userSession) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
      }

      const record = await db.record.findFirst({
        where: {
          roomId: input.roomId,
          recordType: input.recordType,
        },
        orderBy: {
          createAt: 'desc',
        },
      });

      return record;
    }),
});
