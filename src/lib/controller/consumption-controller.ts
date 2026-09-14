"use server"
import { ReadConsumptionModel, CreateConsumptionModel, EditConsumptionModel } from "@/models/dashboard/consumption";
import { auth } from "../auth";
import { headers } from "next/headers";
import { postConsumptionRepository, updateConsumptionRepository } from "../repository/consumption-repository";


export async function postConsumptionController(consumption: CreateConsumptionModel,): Promise<void> {

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw Error("User isn't authenticated!")
  }
  postConsumptionRepository(consumption, session.user.id);
}

export async function updateConsumptionController(newConsumption: EditConsumptionModel): Promise<ReadConsumptionModel> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw Error("User isn't authenticated!")
  }

  return updateConsumptionRepository(session.user.id, newConsumption)
}