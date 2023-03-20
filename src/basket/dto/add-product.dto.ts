import { ShopItem } from '../../shop/shop-item.entity';

export class AddProductDto {
  productId: string;
  userId: string;
  count: number;
}
