// src/lib/catalog.ts

import { prisma } from "@/lib/prisma";
import { ItemDisplayModel, CategoryModel, ItemTypeEnum } from "@/models/dashboard/items";
import { ItemModel } from "@/models/dashboard/items";


export async function fetchCategoriesRepository(
  type?: ItemTypeEnum
): Promise<CategoryModel[]> {
  const categories = await prisma.category.findMany({
    where: type
      ? {
        type,
      }
      : undefined,
    select: {
      id: true,
      friendlyName: true,
      type: true,
    },
    orderBy: {
      friendlyName: "asc",
    },
  });

  return categories.map((category) => ({
    id: category.id,
    friendlyName: category.friendlyName,
    type: category.type as ItemTypeEnum,
  }));
}

export async function fetchCatalogItemsRepository(categoryType?: ItemTypeEnum): Promise<ItemDisplayModel[]> {
  const items = await prisma.item.findMany({
    where: categoryType.
      ? {
        category,
      }
      : undefined,
    include: {
      category: {
        select: {
          type: true,
          friendlyName: true,
        },
      },

      consumptions: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return items.map((item) => ({
    id: item.id,
    friendlyName: item.friendlyName,
    brand: item.brand,
    type: item.type,
    category: item.category.friendlyName,
    image: item.imageUrl,

    experiences: item.consumptions.length,

    averageRating:
      item.consumptions.length === 0
        ? 0
        : Number(
          (
            item.consumptions.reduce(
              (sum, c) => sum + (c.rating === null ? 0 : c.rating),
              0
            ) / item.consumptions.length
          ).toFixed(1)
        ),

    lastConsumed:
      item.consumptions[0]?.createdAt.toISOString().split("T")[0] ?? null,
  }));
}


export async function insertItem({
  item,
  userId,
}: {
  item: ItemModel;
  userId: string;
}): Promise<{
  id: string;
  friendlyName: string;
  systemName: string;
  brand: string;
  categoryId: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}> {
  return await prisma.item.create({
    data: {
      friendlyName: item.friendlyName,
      systemName: item.systemName,
      brand: item.brand,
      categoryId: item.categoryId,
      imageUrl: item.imageUrl,
      userId: userId,

    },
  });
}