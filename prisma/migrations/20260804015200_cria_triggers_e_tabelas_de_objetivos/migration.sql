/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `consumptionReason` on the `Consumption` table. All the data in the column will be lost.
  - You are about to drop the column `negativeAspects` on the `Consumption` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `periodInDays` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `spendingLimit` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Item` table. All the data in the column will be lost.
  - You are about to alter the column `friendlyName` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `systemName` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `brand` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to drop the column `goal` on the `WishListItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[systemName,userId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friendlyName` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `systemName` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consumptionReasonId` to the `Consumption` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeEnum" AS ENUM ('PRODUCT', 'SERVICE');

-- DropIndex
DROP INDEX "Category_name_userId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "friendlyName" VARCHAR(30) NOT NULL,
ADD COLUMN     "systemName" VARCHAR(30) NOT NULL,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Consumption" DROP COLUMN "consumptionReason",
DROP COLUMN "negativeAspects",
ADD COLUMN     "consumptionReasonId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "isActive",
DROP COLUMN "periodInDays",
DROP COLUMN "spendingLimit",
ADD COLUMN     "finalDate" TIMESTAMP(3),
ADD COLUMN     "initialDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "type",
ALTER COLUMN "friendlyName" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "systemName" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "brand" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "WishListItem" DROP COLUMN "goal",
ADD COLUMN     "note" VARCHAR(300);

-- DropEnum
DROP TYPE "ConsumptionNegativeAspects";

-- DropEnum
DROP TYPE "ConsumptionReason";

-- DropEnum
DROP TYPE "GoalType";

-- DropEnum
DROP TYPE "ItemType";

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "name" "TypeEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsumptionReason" (
    "id" TEXT NOT NULL,
    "systemName" VARCHAR(30) NOT NULL,
    "friendlyName" VARCHAR(30) NOT NULL,
    "typeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsumptionReason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NegativeAspect" (
    "id" TEXT NOT NULL,
    "systemName" VARCHAR(30) NOT NULL,
    "friendlyName" VARCHAR(30) NOT NULL,
    "typeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NegativeAspect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsumptionNegativeAspect" (
    "consumptionId" TEXT NOT NULL,
    "negativeAspectId" TEXT NOT NULL,

    CONSTRAINT "ConsumptionNegativeAspect_pkey" PRIMARY KEY ("consumptionId","negativeAspectId")
);

-- CreateTable
CREATE TABLE "SpendingGoal" (
    "goalId" TEXT NOT NULL,
    "spendingLimit" DOUBLE PRECISION NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "SpendingGoal_pkey" PRIMARY KEY ("goalId")
);

-- CreateTable
CREATE TABLE "SatisfactionGoal" (
    "goalId" TEXT NOT NULL,
    "targetRating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SatisfactionGoal_pkey" PRIMARY KEY ("goalId")
);

-- CreateTable
CREATE TABLE "ImpulsivityGoal" (
    "goalId" TEXT NOT NULL,
    "targetDecreasePercentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ImpulsivityGoal_pkey" PRIMARY KEY ("goalId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE INDEX "ConsumptionReason_typeId_idx" ON "ConsumptionReason"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "ConsumptionReason_systemName_typeId_key" ON "ConsumptionReason"("systemName", "typeId");

-- CreateIndex
CREATE INDEX "NegativeAspect_typeId_idx" ON "NegativeAspect"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "NegativeAspect_systemName_typeId_key" ON "NegativeAspect"("systemName", "typeId");

-- CreateIndex
CREATE INDEX "ConsumptionNegativeAspect_negativeAspectId_idx" ON "ConsumptionNegativeAspect"("negativeAspectId");

-- CreateIndex
CREATE INDEX "Category_typeId_idx" ON "Category"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_systemName_userId_key" ON "Category"("systemName", "userId");

-- CreateIndex
CREATE INDEX "Consumption_itemId_idx" ON "Consumption"("itemId");

-- CreateIndex
CREATE INDEX "Consumption_userId_idx" ON "Consumption"("userId");

-- CreateIndex
CREATE INDEX "Consumption_consumptionReasonId_idx" ON "Consumption"("consumptionReasonId");

-- CreateIndex
CREATE INDEX "Consumption_consumptionDate_idx" ON "Consumption"("consumptionDate");

-- CreateIndex
CREATE INDEX "Item_categoryId_idx" ON "Item"("categoryId");

-- CreateIndex
CREATE INDEX "Item_userId_idx" ON "Item"("userId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumptionReason" ADD CONSTRAINT "ConsumptionReason_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NegativeAspect" ADD CONSTRAINT "NegativeAspect_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_consumptionReasonId_fkey" FOREIGN KEY ("consumptionReasonId") REFERENCES "ConsumptionReason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumptionNegativeAspect" ADD CONSTRAINT "ConsumptionNegativeAspect_consumptionId_fkey" FOREIGN KEY ("consumptionId") REFERENCES "Consumption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumptionNegativeAspect" ADD CONSTRAINT "ConsumptionNegativeAspect_negativeAspectId_fkey" FOREIGN KEY ("negativeAspectId") REFERENCES "NegativeAspect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpendingGoal" ADD CONSTRAINT "SpendingGoal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpendingGoal" ADD CONSTRAINT "SpendingGoal_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SatisfactionGoal" ADD CONSTRAINT "SatisfactionGoal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImpulsivityGoal" ADD CONSTRAINT "ImpulsivityGoal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
