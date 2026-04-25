-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('PRODUCT', 'SERVICE');

-- CreateEnum
CREATE TYPE "WishListItemPriority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "ConsumptionReason" AS ENUM ('ITEM_REPLACEMENT', 'EFFECTIVENESS_TEST', 'PERSONAL_SATISFACTION', 'SOCIAL_ALIGNMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "ConsumptionInfluence" AS ENUM ('SOCIAL_MEDIA', 'FRIENDS_FAMILY', 'SOCIETY_TREND', 'OWN_RESEARCH', 'IMPULSIVITY', 'EMERGENCY', 'SELLER_INFLUENCE', 'REDUCED_COST', 'MULTIPLE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "ConsumptionNegativeAspects" AS ENUM ('INEFFECTIVE', 'LOW_QUALITY', 'LOW_DURABILITY', 'POOR_DESIGN', 'UNSAFE', 'POOR_CUSTOMER_SERVICE');

-- CreateTable
CREATE TABLE "Item" (
    "friendlyName" TEXT NOT NULL,
    "systemName" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "systemName" TEXT NOT NULL,
    "friendlyName" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WishList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishListItem" (
    "id" TEXT NOT NULL,
    "wishListId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "priority" "WishListItemPriority" NOT NULL,
    "goal" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WishListItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consumption" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "wishListItemId" TEXT,
    "wouldBuyAgain" BOOLEAN,
    "influence" "ConsumptionInfluence" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION,
    "negativeAspects" "ConsumptionNegativeAspects"[],
    "consumptionReason" "ConsumptionReason" NOT NULL,
    "details" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "consumptionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consumption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_systemName_brand_userId_key" ON "Item"("systemName", "brand", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_systemName_userId_key" ON "Category"("systemName", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "WishList_userId_key" ON "WishList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WishListItem_wishListId_itemId_key" ON "WishListItem"("wishListId", "itemId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishListItem" ADD CONSTRAINT "WishListItem_wishListId_fkey" FOREIGN KEY ("wishListId") REFERENCES "WishList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishListItem" ADD CONSTRAINT "WishListItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_wishListItemId_fkey" FOREIGN KEY ("wishListItemId") REFERENCES "WishListItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
