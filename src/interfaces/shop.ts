export interface ShopItem {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export interface NewItemEntity extends Omit<ShopItem, 'id'> {
  id?: string;
}

export type GetListProductsResponse = ShopItem[];

export type GetOneProductResponse = ShopItem;

export type CreateProductResponse = ShopItem;

export interface GetPaginatedListOfProductsResponse {
  items: ShopItem[];
  pagesCount: number;
}
