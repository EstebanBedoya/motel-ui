/*
  Warnings:

  - The values [mantainance] on the enum `RecordType` will be removed. If these variants are still used in the database, this will fail.
  - The values [mantainance] on the enum `RoomStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `maintanceDetails` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `maintanceValue` on the `Record` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RecordType_new" AS ENUM ('occupied', 'maintenance', 'cleaning');
ALTER TABLE "Record" ALTER COLUMN "recordType" TYPE "RecordType_new" USING ("recordType"::text::"RecordType_new");
ALTER TYPE "RecordType" RENAME TO "RecordType_old";
ALTER TYPE "RecordType_new" RENAME TO "RecordType";
DROP TYPE "RecordType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "RoomStatus_new" AS ENUM ('available', 'occupied', 'maintenance', 'cleaning');
ALTER TABLE "Room" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Room" ALTER COLUMN "status" TYPE "RoomStatus_new" USING ("status"::text::"RoomStatus_new");
ALTER TYPE "RoomStatus" RENAME TO "RoomStatus_old";
ALTER TYPE "RoomStatus_new" RENAME TO "RoomStatus";
DROP TYPE "RoomStatus_old";
ALTER TABLE "Room" ALTER COLUMN "status" SET DEFAULT 'available';
COMMIT;

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "maintanceDetails",
DROP COLUMN "maintanceValue",
ADD COLUMN     "maintenanceDetails" TEXT,
ADD COLUMN     "maintenanceValue" DOUBLE PRECISION,
ALTER COLUMN "rateType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "temporalRecordId" INTEGER;
