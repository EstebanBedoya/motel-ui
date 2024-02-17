/*
  Warnings:

  - You are about to drop the column `roomId` on the `Additionals` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Additionals" DROP CONSTRAINT "Additionals_roomId_fkey";

-- AlterTable
ALTER TABLE "Additionals" DROP COLUMN "roomId";
