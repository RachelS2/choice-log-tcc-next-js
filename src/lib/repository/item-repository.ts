// src/lib/catalog.ts

import { prisma } from "@/lib/prisma";
import { CreateUpdateItemModel, CategoryModel, ItemTypeEnum, BasicItemModel } from "@/models/dashboard/items";
import { PostItemModel } from "@/models/dashboard/items";
import { toSystemName } from "../utils";
import { Prisma } from "../../../generated/prisma";



export async function fetchItemBasicInfoRepository(userId?: string, categoryType?: ItemTypeEnum, itemId?: string): Promise<BasicItemModel[]> {
  const where: Prisma.ItemWhereInput = {};

  if (userId) {
    where.userId = userId;
  }

  if (itemId) {
    where.id = itemId;
  }

  if (categoryType) {
    where.category = {
      type: {
        name: categoryType,
      },
    };
  }

  const items = await prisma.item.findMany({
    where,
    include: {
      category: {
        select: {
          type: true,
          name: true,
          id: true,
        },
      },
    },
  });

  return items.map((item) => ({
    id: item.id,
    friendlyName: item.friendlyName,
    categoryName: item.category.name,
    categoryId: item.category.id,
    brand: item.brand,
    type: item.category.type.name as ItemTypeEnum,
    category: item.category.name,
    imageUrl: item.imageUrl,
  }));
}
export async function fetchItemResumeRepository(userId?: string, categoryType?: ItemTypeEnum, itemId?: string): Promise<CreateUpdateItemModel[]> {
  const where: Prisma.ItemWhereInput = {};

  if (userId) {
    where.userId = userId;
  }

  if (itemId) {
    where.id = itemId;
  }

  if (categoryType) {
    where.category = {
      type: {
        name: categoryType,
      },
    };
  }

  const items = await prisma.item.findMany({
    where,
    include: {
      category: {
        select: {
          type: true,
          name: true,
          id: true,
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
    categoryName: item.category.name,
    categoryId: item.category.id,
    brand: item.brand,
    type: item.category.type.name as ItemTypeEnum,
    category: item.category.name,
    imageUrl: item.imageUrl,

    experiences: item.consumptions.length,

    totalSpent: item.consumptions.reduce(
      (sum, c) => sum + (c.price ?? 0),
      0
    ),

    averageRating:
      item.consumptions.length === 0
        ? 0
        : Number(
          (
            item.consumptions.reduce(
              (sum, c) => sum + (c.rating ?? 0),
              0
            ) / item.consumptions.length
          ).toFixed(1)
        ),

    lastConsumed:
      item.consumptions[0]?.createdAt
        .toISOString()
        .split("T")[0] ?? null,
  }));
}


export async function postItemRepository({
  item,
  userId,
}: {
  item: PostItemModel;
  userId: string;
}): Promise<CreateUpdateItemModel> {
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

    include: {
      category: {
        include: {
          type: true,
        },
      },
    },
  });

  return {
    id: createdItem.id,
    friendlyName: createdItem.friendlyName,
    systemName: createdItem.systemName,
    brand: createdItem.brand,

    categoryId: createdItem.category.id,
    imageUrl: createdItem.imageUrl,

    type: createdItem.category.type.name as ItemTypeEnum,

    experiences: 0,
    averageRating: 0,
    lastConsumed: null,
    totalSpent: 0,

    categoryName: createdItem.category.name,
  };
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

export async function updateItemRepository({
  item
}: {
  item: CreateUpdateItemModel;
}) {
  await prisma.item.update({
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
  });

  const items: CreateUpdateItemModel[] = await fetchItemResumeRepository(undefined, undefined, item.id);
  return items[0];
}