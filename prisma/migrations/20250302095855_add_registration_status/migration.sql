/*
  Warnings:

  - You are about to drop the column `isApproved` on the `Registration` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('REGISTERED', 'WAITLISTED', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "isApproved",
ADD COLUMN     "status" "RegistrationStatus" NOT NULL DEFAULT 'REGISTERED',
ADD COLUMN     "waitlistPosition" INTEGER;
