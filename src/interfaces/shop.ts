export interface ShopItemInterface {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export type GetListProductsResponse = ShopItemInterface[];

export type GetOneProductResponse = ShopItemInterface;

export type CreateProductResponse = ShopItemInterface;

export interface GetPaginatedListOfProductsResponse {
  items: ShopItemInterface[];
  pagesCount: number;
}
