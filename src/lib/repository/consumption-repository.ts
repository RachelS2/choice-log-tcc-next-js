// src/lib/catalog.ts

import { prisma } from "@/lib/prisma";
import { ConsumptionInfluenceModel, ConsumptionModel, ConsumptionReasonModel, CreateConsumptionModel, NegativeAspectModel } from "@/models/dashboard/consumption";


export async function fetchNegativeAspectsRepository(typeId?: number): Promise<NegativeAspectModel[]> {
  return await prisma.negativeAspect.findMany({
    select: {
      systemName: true,
      friendlyName: true,
      typeId: true,
      id: true,
    },
    where: {
      typeId: typeId
    }
  })
}

export async function fetchConsumptionInfluenceRepository(): Promise<ConsumptionInfluenceModel[]> {
  return await prisma.consumptionInfluence.findMany({
    select: {
      systemName: true,
      friendlyName: true,
      id: true,
    }
  })
}

export async function fetchConsumptionReasonsRepository(typeId?: number): Promise<ConsumptionReasonModel[]> {
  return await prisma.consumptionReason.findMany({
    select: {
      systemName: true,
      friendlyName: true,
      typeId: true,
      id: true,
    },
    where: {
      typeId: typeId
    }
  })
}

export async function postConsumptionRepository(
  consumption: CreateConsumptionModel,
  userId: string
): Promise<ConsumptionModel> {
  return await prisma.consumption.create({
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
