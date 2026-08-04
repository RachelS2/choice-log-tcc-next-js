/*
  Warnings:

  - You are about to drop the column `consumptionDate` on the `Consumption` table. All the data in the column will be lost.
  - You are about to drop the column `consumptionReasonId` on the `Consumption` table. All the data in the column will be lost.
  - You are about to drop the column `influence` on the `Consumption` table. All the data in the column will be lost.
  - You are about to alter the column `details` on the `Consumption` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `address` on the `Consumption` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Consumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `influenceId` to the `Consumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reasonId` to the `Consumption` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemTypeEnum" AS ENUM ('PRODUCT', 'SERVICE');

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Consumption" DROP CONSTRAINT "Consumption_consumptionReasonId_fkey";

-- DropForeignKey
ALTER TABLE "ConsumptionReason" DROP CONSTRAINT "ConsumptionReason_typeId_fkey";

-- DropForeignKey
ALTER TABLE "NegativeAspect" DROP CONSTRAINT "NegativeAspect_typeId_fkey";

-- DropIndex
DROP INDEX "Consumption_consumptionDate_idx";

-- DropIndex
DROP INDEX "Consumption_consumptionReasonId_idx";

-- AlterTable
ALTER TABLE "Consumption" DROP COLUMN "consumptionDate",
DROP COLUMN "consumptionReasonId",
DROP COLUMN "influence",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "influenceId" TEXT NOT NULL,
ADD COLUMN     "reasonId" TEXT NOT NULL,
ALTER COLUMN "details" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "Type";

-- DropEnum
DROP TYPE "ConsumptionInfluence";

-- DropEnum
DROP TYPE "TypeEnum";

-- CreateTable
CREATE TABLE "ItemType" (
    "id" TEXT NOT NULL,
    "name" "ItemTypeEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsumptionInfluence" (
    "id" TEXT NOT NULL,
    "systemName" VARCHAR(30) NOT NULL,
    "friendlyName" VARCHAR(30) NOT NULL,
    "typeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsumptionInfluence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemType_name_key" ON "ItemType"("name");

-- CreateIndex
CREATE INDEX "ConsumptionInfluence_typeId_idx" ON "ConsumptionInfluence"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "ConsumptionInfluence_systemName_typeId_key" ON "ConsumptionInfluence"("systemName", "typeId");

-- CreateIndex
CREATE INDEX "Consumption_reasonId_idx" ON "Consumption"("reasonId");

-- CreateIndex
CREATE INDEX "Consumption_date_idx" ON "Consumption"("date");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ItemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumptionReason" ADD CONSTRAINT "ConsumptionReason_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ItemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumptionInfluence" ADD CONSTRAINT "ConsumptionInfluence_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ItemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NegativeAspect" ADD CONSTRAINT "NegativeAspect_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ItemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_reasonId_fkey" FOREIGN KEY ("reasonId") REFERENCES "ConsumptionReason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_influenceId_fkey" FOREIGN KEY ("influenceId") REFERENCES "ConsumptionInfluence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
