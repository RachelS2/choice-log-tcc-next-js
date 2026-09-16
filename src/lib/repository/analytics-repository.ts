// src/lib/catalog.ts

import { prisma } from "@/lib/prisma";


export async function fetchTotalExperiencesRepository(userId: string) {
    return await prisma.consumption.count({ where: { userId: userId } })
}

export async function fetchMostSpentCategoryRepository(userId: string) {
    return await prisma.consumption.count({ where: { userId: userId } })
}