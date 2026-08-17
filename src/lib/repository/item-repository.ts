// src/lib/catalog.ts

import { prisma } from "@/lib/prisma";
import { ItemDisplayModel, CategoryModel, ItemTypeEnum } from "@/models/dashboard/items";
import { ItemModel } from "@/models/dashboard/items";
import { toSystemName } from "../utils";

export async function fetchCatalogItemsRepository(categoryType?: ItemTypeEnum, itemId?: string): Promise<ItemDisplayModel[]> {
  const items = await prisma.item.findMany({
    where: (categoryType
      ? {
        category: {
          type: {
            name: categoryType,
          },
        },
      }
      : undefined) && itemId ? {
      id: itemId,
    } : undefined,
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
    systemName: item.systemName,
    categoryId: item.categoryId,
    brand: item.brand,
    type: item.category.type.name as ItemTypeEnum,
    category: item.category.name,
    imageUrl: item.imageUrl,

    experiences: item.consumptions.length,

    totalSpent: item.consumptions.reduce((sum, c) => sum + (c.price ?? 0), 0),
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
}) : Promise<ItemDisplayModel> {
  const createdItem = await prisma.item.create({
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

  const [createdCatalogItem] = await fetchCatalogItemsRepository(
    undefined,
    createdItem.id
  );

  return createdCatalogItem;
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

// src/lib/item.ts

export async function updateItemRepository({
  item
}: {
  item: ItemDisplayModel;
}) {
  return await prisma.item.update({
    where: {
      id: item.id,
    },

    data: {
      friendlyName: item.friendlyName,
      systemName: toSystemName(item.friendlyName),
      brand: item.brand,

      category: {
        connect: {
          id: item.categoryId,
        },
      },
    },

    include: {
      category: {
        include: {
          type: true,
        },
      },
    },
  });
}