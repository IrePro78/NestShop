import { AddProductDto } from '../basket/dto/add-product-dto';

export interface ShopItem {
  name: string;
  description: string;
  price: number;
}

export type GetListProductsResponse = ShopItem[];
