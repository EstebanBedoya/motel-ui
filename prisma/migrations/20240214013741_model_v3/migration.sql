/*
  Warnings:

  - You are about to drop the `BaseRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CleaningRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MantainanceRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OcupationRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('occupied', 'mantainance', 'cleaning');

-- DropForeignKey
ALTER TABLE "BaseRecord" DROP CONSTRAINT "BaseRecord_roomId_fkey";

-- DropForeignKey
ALTER TABLE "BaseRecord" DROP CONSTRAINT "BaseRecord_userId_fkey";

-- DropForeignKey
ALTER TABLE "CleaningRecord" DROP CONSTRAINT "CleaningRecord_baseRecordId_fkey";

-- DropForeignKey
ALTER TABLE "MantainanceRecord" DROP CONSTRAINT "MantainanceRecord_baseRecordId_fkey";

-- DropForeignKey
ALTER TABLE "OcupationRecord" DROP CONSTRAINT "OcupationRecord_baseRecordId_fkey";

-- DropTable
DROP TABLE "BaseRecord";

-- DropTable
DROP TABLE "CleaningRecord";

-- DropTable
DROP TABLE "MantainanceRecord";

-- DropTable
DROP TABLE "OcupationRecord";

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rateType" "RateType" NOT NULL,
    "recordType" "RecordType" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "extensions" INTEGER NOT NULL,
    "aditionalIds" INTEGER[],
    "total" DOUBLE PRECISION NOT NULL,
    "instructions" TEXT,
    "maintenanceManager" TEXT,
    "phoneNumber" TEXT,
    "maintancevalue" DOUBLE PRECISION,
    "maintanceDetails" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
