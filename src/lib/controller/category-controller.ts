import { CategoryModel, ItemTypeEnum } from "@/models/dashboard/items";


export async function fetchCategoriesController(filterByUser: boolean, type?: ItemTypeEnum): Promise<CategoryModel[]> {
  const params = new URLSearchParams();

  if (type) {
    params.set("type", type);
  }

  params.set("filterByUser", filterByUser ? "true" : "false");


  const query = params.toString();

  const response = await fetch(
    `/api/category${query ? `?${query}` : ""}`
  );

  if (!response.ok) {
    console.error(
      "Failed to fetch categories:",
      response.status,
      response.statusText
    );

    throw new Error("FAILED_TO_FETCH_CATEGORIES");
  }

  return response.json();
}

