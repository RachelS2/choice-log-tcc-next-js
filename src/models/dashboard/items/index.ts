export type ItemTypeEnum = 'PRODUCT' | 'SERVICE';

export interface CategoryModel {
  id: string;
  name: string;
  type: ItemTypeEnum;
}

export interface PostItemModel {
  categoryId: string;
  friendlyName: string;
  systemName: string;
  brand: string;
  imageUrl: string | null;
}

export interface CreateUpdateItemModel extends PostItemModel {
  id: string;
  type: ItemTypeEnum;
  experiences: number;
  averageRating: number;
  lastConsumed: string | null;
  totalSpent: number;
  categoryName: string;

}