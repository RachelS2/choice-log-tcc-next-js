/*
  Warnings:

  - You are about to drop the column `systemName` on the `ConsumptionInfluence` table. All the data in the column will be lost.
  - You are about to drop the column `systemName` on the `ConsumptionReason` table. All the data in the column will be lost.
  - You are about to drop the column `systemName` on the `NegativeAspect` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[friendlyName]` on the table `ConsumptionInfluence` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[friendlyName,typeId]` on the table `ConsumptionReason` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[friendlyName,typeId]` on the table `NegativeAspect` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ConsumptionInfluence_systemName_key";

-- DropIndex
DROP INDEX "ConsumptionReason_systemName_typeId_key";

-- DropIndex
DROP INDEX "NegativeAspect_systemName_typeId_key";

-- AlterTable
ALTER TABLE "ConsumptionInfluence" DROP COLUMN "systemName";

-- AlterTable
ALTER TABLE "ConsumptionReason" DROP COLUMN "systemName";

-- AlterTable
ALTER TABLE "NegativeAspect" DROP COLUMN "systemName";

-- CreateIndex
CREATE UNIQUE INDEX "ConsumptionInfluence_friendlyName_key" ON "ConsumptionInfluence"("friendlyName");

-- CreateIndex
CREATE UNIQUE INDEX "ConsumptionReason_friendlyName_typeId_key" ON "ConsumptionReason"("friendlyName", "typeId");

-- CreateIndex
CREATE UNIQUE INDEX "NegativeAspect_friendlyName_typeId_key" ON "NegativeAspect"("friendlyName", "typeId");
