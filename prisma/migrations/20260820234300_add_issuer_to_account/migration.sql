/*
  Warnings:

  - A unique constraint covering the columns `[issuer,accountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `issuer` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "issuer" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "account_issuer_accountId_uidx" ON "Account"("issuer", "accountId");
