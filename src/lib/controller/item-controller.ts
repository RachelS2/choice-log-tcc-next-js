import { ItemModel } from "@/models/dashboard/items";

export async function postItemController(item: ItemModel) {
  const response = await fetch("/api/item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("UNIQUE_CONSTRAINT_VIOLATION");
    }

    if (response.status === 401) {
      throw new Error("UNAUTHORIZED");
    }

    throw new Error("FAILED_TO_CREATE_ITEM");
  }

  return response.json();
}

import { ItemDisplayModel, ItemTypeEnum } from "@/models/dashboard/items";

export async function getCatalogItemsController(type?: ItemTypeEnum): Promise<ItemDisplayModel[]> {
  const params = new URLSearchParams();

  if (type) {
    params.set("type", type);
  }

  const response = await fetch(
    `/api/item${params.toString() ? `?${params.toString()}` : ""}`
  );

  if (!response.ok) {
    throw new Error("FAILED_TO_FETCH_CATALOG");
  }

  return response.json();
}

