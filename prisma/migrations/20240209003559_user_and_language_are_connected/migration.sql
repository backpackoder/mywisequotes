/*
  Warnings:

  - You are about to drop the column `language` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,code]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Language` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "language",
ADD COLUMN     "languageId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Language_userId_code_key" ON "Language"("userId", "code");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
