export type ItemTypeEnum = 'PRODUCT' | 'SERVICE';

export interface CategoryModel {
  id: string;
  name: string;
  type: ItemTypeEnum;
}

export interface PostItemModel {
  categoryId: string;
  friendlyName: string;
  brand: string;
  imageUrl: string | null;
}

export interface UpdatedItemModel extends PostItemModel {
  id: string;
}

export interface BasicItemModel extends UpdatedItemModel {
  categoryName: string;
  typeId: number;
  type: ItemTypeEnum;

}

export interface ItemResumeModel extends PostItemModel {
  id: string;
  systemName: string;
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