/*
  Warnings:

  - You are about to drop the column `maintancevalue` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Room` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('available', 'occupied', 'mantainance', 'cleaning');

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "maintancevalue",
ADD COLUMN     "maintanceValue" DOUBLE PRECISION,
ALTER COLUMN "extensions" DROP NOT NULL,
ALTER COLUMN "aditionalIds" SET DEFAULT ARRAY[]::INTEGER[],
ALTER COLUMN "total" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "state",
ADD COLUMN     "status" "RoomStatus" NOT NULL DEFAULT 'available';

-- DropEnum
DROP TYPE "RoomStates";
