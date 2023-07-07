/*
  Warnings:

  - You are about to drop the column `updatedById` on the `Quote` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_updatedById_fkey";

-- DropIndex
DROP INDEX "TagTranslation_name_key";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "updatedById";

-- CreateTable
CREATE TABLE "_updatedQuotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_updatedQuotes_AB_unique" ON "_updatedQuotes"("A", "B");

-- CreateIndex
CREATE INDEX "_updatedQuotes_B_index" ON "_updatedQuotes"("B");

-- AddForeignKey
ALTER TABLE "_updatedQuotes" ADD CONSTRAINT "_updatedQuotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_updatedQuotes" ADD CONSTRAINT "_updatedQuotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
