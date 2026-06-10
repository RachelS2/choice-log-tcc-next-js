/*
  Warnings:

  - You are about to drop the column `friendlyName` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `systemName` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,userId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_systemName_userId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "friendlyName",
DROP COLUMN "systemName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "incomeRange" SET DEFAULT 'PREFER_NOT_TO_SAY';

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_userId_key" ON "Category"("name", "userId");
