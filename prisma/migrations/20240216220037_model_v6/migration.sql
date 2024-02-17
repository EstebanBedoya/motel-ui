/*
  Warnings:

  - You are about to drop the `Aditionals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Aditionals" DROP CONSTRAINT "Aditionals_roomId_fkey";

-- DropTable
DROP TABLE "Aditionals";

-- CreateTable
CREATE TABLE "Additionals" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Additionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalRoom" (
    "roomId" INTEGER NOT NULL,
    "additionalId" INTEGER NOT NULL,

    CONSTRAINT "AdditionalRoom_pkey" PRIMARY KEY ("roomId","additionalId")
);

-- AddForeignKey
ALTER TABLE "Additionals" ADD CONSTRAINT "Additionals_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalRoom" ADD CONSTRAINT "AdditionalRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalRoom" ADD CONSTRAINT "AdditionalRoom_additionalId_fkey" FOREIGN KEY ("additionalId") REFERENCES "Additionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
