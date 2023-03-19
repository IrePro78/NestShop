import { ShopItem } from '../../shop/shop-item.entity';

export class AddProductDto {
  id: string;
  count: number;
  shopItem: ShopItem;
}
