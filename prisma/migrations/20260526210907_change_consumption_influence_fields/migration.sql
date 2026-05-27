/*
  Warnings:

  - The values [MULTIPLE,UNKNOWN] on the enum `ConsumptionInfluence` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "IncomeRange" AS ENUM ('UP_TO_1_MINIMUM_WAGE', 'FROM_1_TO_3', 'FROM_3_TO_5', 'FROM_5_TO_10', 'ABOVE_10', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "GoalType" AS ENUM ('MONTHLY_SPENDING_LIMIT', 'WEEKLY_SPENDING_LIMIT', 'TARGET_CATEGORY', 'TARGET_SATISFACTION', 'REDUCE_IMPULSIVITY');

-- AlterEnum
BEGIN;
CREATE TYPE "ConsumptionInfluence_new" AS ENUM ('SOCIAL_MEDIA', 'FRIENDS_FAMILY', 'SOCIETY_TREND', 'OWN_RESEARCH', 'IMPULSIVITY', 'EMERGENCY', 'SELLER_INFLUENCE', 'REDUCED_COST', 'OTHER');
ALTER TABLE "Consumption" ALTER COLUMN "influence" TYPE "ConsumptionInfluence_new" USING ("influence"::text::"ConsumptionInfluence_new");
ALTER TYPE "ConsumptionInfluence" RENAME TO "ConsumptionInfluence_old";
ALTER TYPE "ConsumptionInfluence_new" RENAME TO "ConsumptionInfluence";
DROP TYPE "public"."ConsumptionInfluence_old";
COMMIT;

-- AlterEnum
ALTER TYPE "ConsumptionNegativeAspects" ADD VALUE 'OTHER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "incomeRange" "IncomeRange";

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT,
    "spendingLimit" DOUBLE PRECISION NOT NULL,
    "periodInDays" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
