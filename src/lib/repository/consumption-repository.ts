// src/lib/catalog.ts

import { prisma } from "@/lib/prisma";
import { ConsumptionInfluenceModel, ReadConsumptionModel, ConsumptionReasonModel, CreateConsumptionModel, NegativeAspectModel } from "@/models/dashboard/consumption";


export async function fetchNegativeAspectsRepository(typeId?: number, id?: number): Promise<NegativeAspectModel[]> {
  return await prisma.negativeAspect.findMany({
    select: {
      friendlyName: true,
      typeId: true,
      id: true,
    },
    where: {
      typeId: typeId,
      id: id
    }
  })
}

export async function fetchConsumptionInfluenceRepository(id?: number): Promise<ConsumptionInfluenceModel[]> {
  return await prisma.consumptionInfluence.findMany({
    select: {
      friendlyName: true,
      id: true,
    },
    where: {
      id: id
    }
  })
}

export async function fetchConsumptionReasonsRepository(typeId?: number, id?: number): Promise<ConsumptionReasonModel[]> {
  return await prisma.consumptionReason.findMany({
    select: {
      friendlyName: true,
      typeId: true,
      id: true,
    },
    where: {
      typeId: typeId,
      id: id
    }
  })
}

export async function postConsumptionRepository(
  consumption: CreateConsumptionModel,
  userId: string
): Promise<void> {
  await prisma.consumption.create({
    data: {
      itemId: consumption.itemId,
      date: consumption.date,
      address: consumption.address,
      rating: consumption.rating,
      details: consumption.details,
      reasonId: consumption.reasonId,
      influenceId: consumption.influenceId,
      price: consumption.price,
      wouldBuyAgain: consumption.wouldBuyAgain,

      userId,

      negativeAspects: {
        createMany: {
          data: consumption.negativeAspects.map((negativeAspectId) => ({
            negativeAspectId,
          })),
        },
      },
    },
  });

}

export async function fetchConsumptionRepository(
  userId: string
): Promise<ReadConsumptionModel[]> {
  const consumptions = await prisma.consumption.findMany({
    where: {
      userId,
    },

    select: {
      id: true,
      date: true,
      address: true,
      rating: true,
      details: true,
      price: true,
      wouldBuyAgain: true,
      createdAt: true,
      updatedAt: true,
      wishListItemId: true,

      item: {
        select: {
          id: true,
          friendlyName: true,
          brand: true,
          imageUrl: true,
          categoryId: true,
          category: {
            select: {
              name: true,
              type: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },

      reason: {
        select: {
          id: true,
          friendlyName: true,
          typeId: true,
        },
      },

      influence: {
        select: {
          id: true,
          friendlyName: true,
        },
      },

      negativeAspects: {
        select: {
          negativeAspect: {
            select: {
              id: true,
              friendlyName: true,
              typeId: true,
            },
          },
        },
      },
    },

    orderBy: {
      date: "desc",
    },
  });

  return consumptions.map((consumption) => ({
    id: consumption.id,
    date: consumption.date,
    address: consumption.address,
    rating: consumption.rating,
    details: consumption.details,
    price: consumption.price,
    wouldBuyAgain: consumption.wouldBuyAgain,

    createdAt: consumption.createdAt,
    updatedAt: consumption.updatedAt,
    wishListItemId: consumption.wishListItemId,

    item: {
      id: consumption.item.id,
      friendlyName: consumption.item.friendlyName,
      categoryName: consumption.item.category.name,
      categoryId: consumption.item.categoryId,
      brand: consumption.item.brand,
      type: consumption.item.category.type.name,
      imageUrl: consumption.item.imageUrl,
    },

    reason: consumption.reason,
    influence: consumption.influence,

    negativeAspects: consumption.negativeAspects.map(
      ({ negativeAspect }) => negativeAspect
    ),
  }));
}