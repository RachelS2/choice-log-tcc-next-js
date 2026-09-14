export type ItemTypeEnum = 'PRODUCT' | 'SERVICE';

export interface CategoryModel {
  id: string;
  name: string;
  type: ItemTypeEnum;
}

export interface BasicItemModel {
  id: string;
  friendlyName: string;
  categoryName: string;
  categoryId: string;
  brand: string;
  type: ItemTypeEnum;
  typeId: number;
  imageUrl: string | null;
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
  typeId: number;
  experiences: number;
  // averageRating: number;
  lastConsumed: string | null;
  totalSpent: number;
  categoryName: string;
  updatedAt: Date;

}

export interface ItemTypeModel {
  id: number;
  name: ItemTypeEnum;
}