/*
  Warnings:

  - Made the column `englishName` on table `Author` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "AuthorTranslation_name_key";

-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "englishName" SET NOT NULL;
