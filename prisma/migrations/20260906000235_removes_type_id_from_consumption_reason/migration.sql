/*
  Warnings:

  - You are about to drop the column `typeId` on the `ConsumptionReason` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[friendlyName]` on the table `ConsumptionReason` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ConsumptionReason" DROP CONSTRAINT "ConsumptionReason_typeId_fkey";

-- DropIndex
DROP INDEX "ConsumptionReason_friendlyName_typeId_key";

-- DropIndex
DROP INDEX "ConsumptionReason_typeId_idx";

-- AlterTable
ALTER TABLE "ConsumptionReason" DROP COLUMN "typeId";

-- CreateIndex
CREATE UNIQUE INDEX "ConsumptionReason_friendlyName_key" ON "ConsumptionReason"("friendlyName");
