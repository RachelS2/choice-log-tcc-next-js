"use server"
import { ReadConsumptionModel, CreateConsumptionModel } from "@/models/dashboard/consumption";
import { auth } from "../auth";
import { headers } from "next/headers";
import { postConsumptionRepository } from "../repository/consumption-repository";


export async function postConsumptionController(consumption: CreateConsumptionModel,): Promise<void> {

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw Error("User isn't authenticated!")
  }
  postConsumptionRepository(consumption, session.user.id);
}

