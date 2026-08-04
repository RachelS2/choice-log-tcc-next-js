/*
  Warnings:

  - You are about to drop the column `typeId` on the `ConsumptionInfluence` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[systemName]` on the table `ConsumptionInfluence` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ConsumptionInfluence" DROP CONSTRAINT "ConsumptionInfluence_typeId_fkey";

-- DropIndex
DROP INDEX "ConsumptionInfluence_systemName_typeId_key";

-- DropIndex
DROP INDEX "ConsumptionInfluence_typeId_idx";

-- AlterTable
ALTER TABLE "ConsumptionInfluence" DROP COLUMN "typeId";

-- CreateIndex
CREATE UNIQUE INDEX "ConsumptionInfluence_systemName_key" ON "ConsumptionInfluence"("systemName");
