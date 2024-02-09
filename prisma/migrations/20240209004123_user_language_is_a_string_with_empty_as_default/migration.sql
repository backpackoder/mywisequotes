/*
  Warnings:

  - You are about to drop the column `userId` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_languageId_fkey";

-- DropIndex
DROP INDEX "Language_userId_code_key";

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "languageId",
ADD COLUMN     "language" TEXT NOT NULL DEFAULT '';
