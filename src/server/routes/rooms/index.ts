import { publicProcedure, router } from "@/server/trpc";
import { db } from "@/libs/prisma";
import { z } from "zod";
import { RoomStates } from "@prisma/client";

export const roomsRouter = router({
  listAll: publicProcedure.query(async () => {
    const rooms = await db.room.findMany();
    return rooms;
  }),
  create: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        type: z.string(),
        state: z.enum(["available", "occupied", "maintenance", "cleaning"]),
      })
    )
    .mutation(async ({ input }) => {
        const room = await db.room.create({
            data: {
                id: input.id,
                name: input.name,
                type: input.type,
                state: input.state as RoomStates,
            },
        });

        return room;
    }),
});
