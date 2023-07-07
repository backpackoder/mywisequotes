/*
  Warnings:

  - Made the column `code` on table `Language` required. This step will fail if there are existing NULL values in that column.
  - Made the column `englishName` on table `Language` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nativeName` on table `Language` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Language" ALTER COLUMN "code" SET NOT NULL,
ALTER COLUMN "englishName" SET NOT NULL,
ALTER COLUMN "nativeName" SET NOT NULL;
