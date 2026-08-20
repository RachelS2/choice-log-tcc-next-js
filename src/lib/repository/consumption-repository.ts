// src/lib/catalog.ts

import { prisma } from "@/lib/prisma";
import { ConsumptionReasonModel, NegativeAspectModel } from "@/models/dashboard/consumption";


export async function fetchNegativeAspectsRepository(typeId?: number) : Promise<NegativeAspectModel[]> {
  return await prisma.negativeAspect.findMany({
    select: {
      systemName: true, 
      friendlyName: true,
      typeId: true,
      id: true,
    }, 
    where: {
      typeId : typeId
    }
  })
}



export async function fetchConsumptionReasonsRepository(typeId?: number) : Promise<ConsumptionReasonModel[]> {
  return await prisma.consumptionReason.findMany({
    select: {
      systemName: true, 
      friendlyName: true,
      typeId: true,
      id: true,
    }, 
    where: {
      typeId : typeId
    }
  })
}
