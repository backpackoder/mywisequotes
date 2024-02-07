/*
  Warnings:

  - You are about to drop the column `settingsId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_settingsId_fkey";

-- DropIndex
DROP INDEX "User_settingsId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "settingsId",
ADD COLUMN     "emailUpdates" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en';

-- DropTable
DROP TABLE "UserSettings";
