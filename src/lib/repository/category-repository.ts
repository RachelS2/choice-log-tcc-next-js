// src/lib/catalog.ts

import { prisma } from "@/lib/prisma";
import { CategoryModel, ItemTypeEnum } from "@/models/dashboard/items";


export async function fetchCategoriesRepository(
  userId?: string,
  type?: ItemTypeEnum
): Promise<CategoryModel[]> {
  const categories = await prisma.category.findMany({
    where: {
      OR: userId
        ? [
          { userId: null },
          { userId },
        ]
        : [
          { userId: null },
        ],

      ...(type && {
        type: {
          name: type,
        },
      }),
    },

    select: {
      id: true,
      name: true,
      type: true,
    },

    orderBy: {
      name: "asc",
    },
  });

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    type: category.type.name as ItemTypeEnum,
  }));
}