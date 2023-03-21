import { ShopItem } from '../shop/shop-item.entity';
import { User } from '../user/user.entity';

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
  shopItem: ShopItem;
  user: User;
}

export type GetBasketResponse = OneItemInBasket[];

export type GetTotalPriceResponse = number;

export interface GetBasketStatsResponse {
  itemInBasketAvgPrice: number;
  basketAvgTotalPrice: number;
}
