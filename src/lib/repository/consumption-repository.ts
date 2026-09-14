// src/lib/catalog.ts

import { prisma } from "@/lib/prisma";
import { ConsumptionInfluenceModel, ReadConsumptionModel, ConsumptionReasonModel, CreateConsumptionModel, NegativeAspectModel, EditConsumptionModel } from "@/models/dashboard/consumption";


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

export async function fetchConsumptionReasonsRepository(id?: number): Promise<ConsumptionReasonModel[]> {
  return await prisma.consumptionReason.findMany({
    select: {
      friendlyName: true,
      id: true,
    },
    where: {
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
  userId: string, consumptionId?: string,
): Promise<ReadConsumptionModel[]> {
  const consumptions = await prisma.consumption.findMany({
    where: {
      userId: userId,
      id: consumptionId,
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
                  id: true,
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
    wouldBuyAgain: consumption.wouldBuyAgain ?? false,

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
      typeId: consumption.item.category.type.id,
      imageUrl: consumption.item.imageUrl,
    },

    reason: consumption.reason,
    influence: consumption.influence,

    negativeAspects: consumption.negativeAspects.map(
      ({ negativeAspect }) => negativeAspect
    ),
  }));
}

export async function updateConsumptionRepository(
  userId: string,
  newConsumption: EditConsumptionModel
): Promise<ReadConsumptionModel> {
  const {
    consumptionId,
    negativeAspectIds,
    price,
    rating,
    date,
    wouldBuyAgain,
    reasonId,
    influenceId,
    address,
    details,
  } = newConsumption;

  const updatedConsumption =
    await prisma.consumption.update({
      where: {
        id: consumptionId,
        userId,
      },

      data: {
        price,
        rating,
        date,
        wouldBuyAgain,
        reasonId,
        influenceId,
        address,
        details,

        negativeAspects: {
          deleteMany: {},
          createMany: {
            data: negativeAspectIds.map(
              (negativeAspectId) => ({
                negativeAspectId,
              })
            ),
          },
        },
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
                    id: true,
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
    });

  if (updatedConsumption.wouldBuyAgain == null) {
    throw Error("Would Buy Again should have been informed.")
  }

  return {
    id: updatedConsumption.id,
    date: updatedConsumption.date,
    address: updatedConsumption.address,
    rating: updatedConsumption.rating,
    details: updatedConsumption.details,
    price: updatedConsumption.price,
    wouldBuyAgain: updatedConsumption.wouldBuyAgain ?? false,

    createdAt: updatedConsumption.createdAt,
    updatedAt: updatedConsumption.updatedAt,
    wishListItemId: updatedConsumption.wishListItemId,

    item: {
      id: updatedConsumption.item.id,
      friendlyName: updatedConsumption.item.friendlyName,
      categoryName: updatedConsumption.item.category.name,
      categoryId: updatedConsumption.item.categoryId,
      brand: updatedConsumption.item.brand,
      type: updatedConsumption.item.category.type.name,
      typeId: updatedConsumption.item.category.type.id,
      imageUrl: updatedConsumption.item.imageUrl,
    },

    reason: updatedConsumption.reason,
    influence: updatedConsumption.influence,

    negativeAspects: updatedConsumption.negativeAspects.map(
      ({ negativeAspect }) => negativeAspect
    ),
  }
}

