export type ItemTypeEnum = 'PRODUCT' | 'SERVICE';

export interface CategoryModel {
  id: string;
  name: string;
  itemTypeId: number;
}

export interface CatalogViewItemModel {
  id: string;
  name: string;
  brand: string;
  type: 'product' | 'service';
  category: string;
  image: string | null;
  experiences: number;
  averageRating: number;
  lastConsumed: string;
}

export interface ItemModel {
  categoryId: string;
  friendlyName: string;
  systemName: string;
  brand: string;
  imageUrl?: string;
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