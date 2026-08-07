/*
  Warnings:

  - Made the column `rating` on table `Consumption` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Consumption" ALTER COLUMN "rating" SET NOT NULL;
