/*
  Warnings:

  - The values [ocuppied] on the enum `RoomStates` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `priceTypeId` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the `PriceType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Record` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rateType` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RateType" AS ENUM ('hourly', 'overnight');

-- AlterEnum
BEGIN;
CREATE TYPE "RoomStates_new" AS ENUM ('available', 'occupied', 'mantainance', 'cleaning');
ALTER TABLE "Room" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Room" ALTER COLUMN "state" TYPE "RoomStates_new" USING ("state"::text::"RoomStates_new");
ALTER TYPE "RoomStates" RENAME TO "RoomStates_old";
ALTER TYPE "RoomStates_new" RENAME TO "RoomStates";
DROP TYPE "RoomStates_old";
ALTER TABLE "Room" ALTER COLUMN "state" SET DEFAULT 'available';
COMMIT;

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_priceTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_userId_fkey";

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "priceTypeId",
ADD COLUMN     "rateType" "RateType" NOT NULL;

-- DropTable
DROP TABLE "PriceType";

-- DropTable
DROP TABLE "Record";

-- CreateTable
CREATE TABLE "BaseRecord" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaseRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OcupationRecord" (
    "id" SERIAL NOT NULL,
    "baseRecordId" INTEGER NOT NULL,
    "rateType" "RateType" NOT NULL,
    "extensions" INTEGER NOT NULL,
    "aditionalIds" INTEGER[],
    "total" DOUBLE PRECISION NOT NULL,
    "instructions" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OcupationRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CleaningRecord" (
    "id" SERIAL NOT NULL,
    "baseRecordId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CleaningRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MantainanceRecord" (
    "id" SERIAL NOT NULL,
    "baseRecordId" INTEGER NOT NULL,
    "maintenanceManager" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "details" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MantainanceRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BaseRecord" ADD CONSTRAINT "BaseRecord_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaseRecord" ADD CONSTRAINT "BaseRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OcupationRecord" ADD CONSTRAINT "OcupationRecord_baseRecordId_fkey" FOREIGN KEY ("baseRecordId") REFERENCES "BaseRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleaningRecord" ADD CONSTRAINT "CleaningRecord_baseRecordId_fkey" FOREIGN KEY ("baseRecordId") REFERENCES "BaseRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MantainanceRecord" ADD CONSTRAINT "MantainanceRecord_baseRecordId_fkey" FOREIGN KEY ("baseRecordId") REFERENCES "BaseRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
