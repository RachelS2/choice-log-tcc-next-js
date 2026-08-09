import { fetchCategories } from "@/lib/repository/catalog-repository";
import { CategoryModel, ItemTypeEnum } from "@/models/dashboard/items";

export async function getCategories(
  type?: ItemTypeEnum
): Promise<CategoryModel[]> {
  return await fetchCategories(type);
}