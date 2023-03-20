import { AddProductDto } from '../basket/dto/add-product.dto';

export type AddProductToBasketResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };

export interface RemoveProductFromBasketResponse {
  isSuccess: boolean;
}

export interface OneItemInBasket {
  id: string;
  count: number;
}

export type GetBasketResponse = OneItemInBasket[];

export type GetTotalPriceResponse = number;
