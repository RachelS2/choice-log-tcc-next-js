import { ItemModel } from "@/models/dashboard/items";

export async function postItem(item: ItemModel) {
  const response = await fetch("/api/items", {
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