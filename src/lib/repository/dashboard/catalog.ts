// src/lib/catalog.ts

import { prisma } from "@/lib/prisma";

export async function getCatalogItems() {
  const items = await prisma.item.findMany({
    include: {
      category: true,
      
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
    type: item.category.type.toLowerCase(),
    category: item.category.name,
    image: item.imageUrl,

    experiences: item.consumptions.length,

    averageRating:
      item.consumptions.length === 0
        ? null
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