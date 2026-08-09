// src/lib/catalog.ts

import { prisma } from "@/lib/prisma";
import { CatalogViewItemModel } from "@/models/dashboard/items";
import { ItemModel } from "@/models/dashboard/items";

export async function fetchCatalogItems(): Promise<CatalogViewItemModel[]> {
  const items = await prisma.item.findMany({
    include: {
      category: {
        include: {
          type: {
            select: {
              name: true,
            },
          },
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
    name: item.friendlyName,
    brand: item.brand,
    type: item.category.type.name as 'product' | 'service',
    category: item.category.name,
    image: item.imageUrl,

    experiences: item.consumptions.length,

    averageRating:
      item.consumptions.length === 0
        ? 0
        : Number(
          (
            item.consumptions.reduce(
              (sum, c) => sum + c.rating,
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