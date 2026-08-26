"use server"
import { ConsumptionModel, CreateConsumptionModel } from "@/models/dashboard/consumption";
import { auth } from "../auth";
import { headers } from "next/headers";
import { postConsumptionRepository } from "../repository/consumption-repository";


export async function postConsumptionController(consumption: CreateConsumptionModel,): Promise<ConsumptionModel> {

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw Error("User isn't authenticated!")
  }
  return postConsumptionRepository(consumption, session.user.id);
}

