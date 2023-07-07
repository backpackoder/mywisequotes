/*
  Warnings:

  - You are about to drop the column `name` on the `Language` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nativeName]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[englishName]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Language_name_key";

-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "wikipediaLink" TEXT;

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "name",
ADD COLUMN     "englishName" TEXT,
ADD COLUMN     "nativeName" TEXT,
ALTER COLUMN "code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "sources" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Language_nativeName_key" ON "Language"("nativeName");

-- CreateIndex
CREATE UNIQUE INDEX "Language_englishName_key" ON "Language"("englishName");
