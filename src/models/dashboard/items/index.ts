export type ItemTypeEnum = 'PRODUCT' | 'SERVICE';

export interface CategoryModel {
  id: string;
  name: string;
  type: ItemTypeEnum;
}

export interface ItemModel {
  categoryId: string;
  friendlyName: string;
  systemName: string;
  brand: string;
  imageUrl: string | null;
}

export interface ItemDisplayModel extends ItemModel {
  id: string;
  type: ItemTypeEnum;
  category: string;
  experiences: number;
  averageRating: number;
  lastConsumed: string | null;
  totalSpent: number;

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