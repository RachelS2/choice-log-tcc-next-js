/*
  Warnings:

  - The primary key for the `ConsumptionInfluence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ConsumptionInfluence` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ConsumptionNegativeAspect` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ConsumptionReason` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ConsumptionReason` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ItemType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ItemType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `NegativeAspect` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `NegativeAspect` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `typeId` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `influenceId` on the `Consumption` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `reasonId` on the `Consumption` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `negativeAspectId` on the `ConsumptionNegativeAspect` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `typeId` on the `ConsumptionReason` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `typeId` on the `NegativeAspect` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Consumption" DROP CONSTRAINT "Consumption_influenceId_fkey";

-- DropForeignKey
ALTER TABLE "Consumption" DROP CONSTRAINT "Consumption_reasonId_fkey";

-- DropForeignKey
ALTER TABLE "ConsumptionNegativeAspect" DROP CONSTRAINT "ConsumptionNegativeAspect_negativeAspectId_fkey";

-- DropForeignKey
ALTER TABLE "ConsumptionReason" DROP CONSTRAINT "ConsumptionReason_typeId_fkey";

-- DropForeignKey
ALTER TABLE "NegativeAspect" DROP CONSTRAINT "NegativeAspect_typeId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "typeId",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Consumption" DROP COLUMN "influenceId",
ADD COLUMN     "influenceId" INTEGER NOT NULL,
DROP COLUMN "reasonId",
ADD COLUMN     "reasonId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ConsumptionInfluence" DROP CONSTRAINT "ConsumptionInfluence_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ConsumptionInfluence_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ConsumptionNegativeAspect" DROP CONSTRAINT "ConsumptionNegativeAspect_pkey",
DROP COLUMN "negativeAspectId",
ADD COLUMN     "negativeAspectId" INTEGER NOT NULL,
ADD CONSTRAINT "ConsumptionNegativeAspect_pkey" PRIMARY KEY ("consumptionId", "negativeAspectId");

-- AlterTable
ALTER TABLE "ConsumptionReason" DROP CONSTRAINT "ConsumptionReason_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "typeId",
ADD COLUMN     "typeId" INTEGER NOT NULL,
ADD CONSTRAINT "ConsumptionReason_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ItemType" DROP CONSTRAINT "ItemType_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ItemType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "NegativeAspect" DROP CONSTRAINT "NegativeAspect_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "typeId",
ADD COLUMN     "typeId" INTEGER NOT NULL,
ADD CONSTRAINT "NegativeAspect_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Category_typeId_idx" ON "Category"("typeId");

-- CreateIndex
CREATE INDEX "Consumption_reasonId_idx" ON "Consumption"("reasonId");

-- CreateIndex
CREATE INDEX "ConsumptionNegativeAspect_negativeAspectId_idx" ON "ConsumptionNegativeAspect"("negativeAspectId");

-- CreateIndex
CREATE INDEX "ConsumptionReason_typeId_idx" ON "ConsumptionReason"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "ConsumptionReason_systemName_typeId_key" ON "ConsumptionReason"("systemName", "typeId");

-- CreateIndex
CREATE INDEX "NegativeAspect_typeId_idx" ON "NegativeAspect"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "NegativeAspect_systemName_typeId_key" ON "NegativeAspect"("systemName", "typeId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ItemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumptionReason" ADD CONSTRAINT "ConsumptionReason_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ItemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NegativeAspect" ADD CONSTRAINT "NegativeAspect_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ItemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_reasonId_fkey" FOREIGN KEY ("reasonId") REFERENCES "ConsumptionReason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_influenceId_fkey" FOREIGN KEY ("influenceId") REFERENCES "ConsumptionInfluence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumptionNegativeAspect" ADD CONSTRAINT "ConsumptionNegativeAspect_negativeAspectId_fkey" FOREIGN KEY ("negativeAspectId") REFERENCES "NegativeAspect"("id") ON DELETE CASCADE ON UPDATE CASCADE;
