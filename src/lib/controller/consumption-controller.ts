"use server"
import { ReadConsumptionModel, CreateConsumptionModel, EditConsumptionModel } from "@/models/dashboard/consumption";
import { auth } from "../auth";
import { headers } from "next/headers";
import { postConsumptionRepository, deleteConsumptionRepository, updateConsumptionRepository } from "../repository/consumption-repository";
import { PostItemModel, PostItemResponseModel } from "@/models/dashboard/items";
import { postItemRepository } from "../repository/item-repository";


export async function postConsumptionController(consumption: CreateConsumptionModel,): Promise<void> {

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw Error("User isn't authenticated!")
  }
  postConsumptionRepository(consumption, session.user.id);
}

export async function postItemController(itemToPost: PostItemModel): Promise<PostItemResponseModel> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw Error("User isn't authenticated!")
  }
  return await postItemRepository(itemToPost, session.user.id);

}

export async function updateConsumptionController(newConsumption: EditConsumptionModel): Promise<ReadConsumptionModel> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw Error("User isn't authenticated!")
  }


  return updateConsumptionRepository(session.user.id, newConsumption)
}

export async function deleteConsumptionController(consumption: EditConsumptionModel) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw Error("User isn't authenticated!")
  }


  return deleteConsumptionRepository(session.user.id, consumption)
}