// src/lib/catalog.ts

import { prisma } from "@/lib/prisma";
import { ItemDisplayModel, CategoryModel, ItemTypeEnum } from "@/models/dashboard/items";
import { ItemModel } from "@/models/dashboard/items";

export async function fetchCatalogItemsRepository(categoryType?: ItemTypeEnum): Promise<ItemDisplayModel[]> {
  const items = await prisma.item.findMany({
    where: categoryType
      ? {
        category: {
          type: {
            name: categoryType,
          },
        },
      }
      : undefined,
    include: {
      category: {
        select: {
          type: true,
          name: true,
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
    type: item.category.type.name as ItemTypeEnum,
    category: item.category.name,
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


export async function postItemRepository({
  item,
  userId,
}: {
  item: ItemModel;
  userId: string;
}) {
  return await prisma.item.create({
    data: {
      friendlyName: item.friendlyName,
      systemName: item.systemName,
      brand: item.brand,
      category: {
        connect: {
          id: item.categoryId,
        },
      },
      imageUrl: item.imageUrl,
      user: {
        connect: {
          id: userId,
        },
      },

    },
  });
}

export async function deleteItemRepository({
  itemId,
}: {
  itemId: string;
}) {
  return await prisma.item.delete({
    where: {
      id: itemId,
    },
  });
}