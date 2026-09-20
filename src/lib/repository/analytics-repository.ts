// src/lib/catalog.ts

import { prisma } from "@/lib/prisma";
import { AnalyticsConsumptionModel, AnalyticsFiltersModel } from "@/models/dashboard/analytics";


export async function fetchTotalExperiencesRepository(userId: string): Promise<number> {
  return await prisma.consumption.count({ where: { userId: userId } })
}



export async function fetchAnalyticsConsumptionsRepository(
  userId: string,
  filters?: AnalyticsFiltersModel
): Promise<AnalyticsConsumptionModel[]> {
  const consumptions = await prisma.consumption.findMany({
    where: {
      userId,
    },
    select: {
      price: true,
      rating: true,
      wouldBuyAgain: true,
      date: true,

      item: {
        select: {

          category: {
            select: {
              id: true,
              name: true,
              type: true,
            },
          },
        },
      },

      influence: {
        select: {
          id: true,
          friendlyName: true,
        },
      },
    },
  });

  return consumptions.map((consumption) => ({
    date: consumption.date,
    price: Number(consumption.price),
    rating: consumption.rating,
    wouldBuyAgain: consumption.wouldBuyAgain,

    type: consumption.item.category.type.name,

    category: {
      id: consumption.item.category.id,
      name: consumption.item.category.name,
    },

    influence: {
      id: consumption.influence.id,
      friendlyName: consumption.influence.friendlyName,
    },
  }));
}