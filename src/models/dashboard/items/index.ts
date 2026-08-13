export type ItemTypeEnum = 'PRODUCT' | 'SERVICE';

export interface CategoryModel {
  id: string;
  name: string;
  type: ItemTypeEnum;
}

export interface ItemDisplayModel {
  id: string;
  friendlyName: string;
  brand: string;
  type: ItemTypeEnum;
  category: string;
  image: string | null;
  experiences: number;
  averageRating: number;
  lastConsumed: string | null;
}

export interface ItemModel {
  categoryId: string;
  friendlyName: string;
  systemName: string;
  brand: string;
  imageUrl: string | null;
}

export interface ItemIdModel extends ItemModel {
  id: string;
}

// categoryId: string;
// friendlyName: string;
// systemName: string;
// brand: string;
// imageUrl: string | null;
// id: string;
// createdAt: Date;
// updatedAt: Date;
// userId: string;