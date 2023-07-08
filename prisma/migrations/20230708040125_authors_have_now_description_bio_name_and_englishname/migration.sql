/*
  Warnings:

  - A unique constraint covering the columns `[englishName]` on the table `Author` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "englishName" TEXT;

-- AlterTable
ALTER TABLE "AuthorTranslation" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "description" TEXT,
ALTER COLUMN "isOriginal" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Author_englishName_key" ON "Author"("englishName");
