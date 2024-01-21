/*
  Warnings:

  - Made the column `createdById` on table `Author` required. This step will fail if there are existing NULL values in that column.
  - Made the column `englishName` on table `Tag` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "createdById" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "englishName" SET NOT NULL;
