import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  RemoveProductFromBasketResponse,
} from '../interfaces/basket';
import { ShopService } from '../shop/shop.service';
import { GetBasketResponse } from '../interfaces/basket';
import { ItemInBasket } from './item-in-basket.entity';
import { UserService } from '../user/user.service';
import { AddProductDto } from './dto/add-product.dto';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService))
    private shopService: ShopService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async add(product: AddProductDto): Promise<AddProductToBasketResponse> {
    const { userId, productId, count } = product;

    const shopItem = await this.shopService.getOneProduct(productId);
    const user = await this.userService.getOneUser(userId);

    if (
      typeof userId !== 'string' ||
      typeof productId !== 'string' ||
      typeof count !== 'number' ||
      userId === '' ||
      productId === '' ||
      count < 1 ||
      !shopItem ||
      !user
    ) {
      return {
        isSuccess: false,
      };
    }
    await this.shopService.addBoughtCounter(productId);

    const item = new ItemInBasket();
    item.count = count;
    await item.save();

    item.shopItem = shopItem;
    item.user = user;

    await item.save();

    return {
      isSuccess: true,
      id: item.id,
    };
  }

  async remove(id: string): Promise<RemoveProductFromBasketResponse> {
    const item = await ItemInBasket.findOneByOrFail({ id: id });

    if (item) {
      await item.remove();
      return {
        isSuccess: true,
      };
    }
    return {
      isSuccess: false,
    };
  }

  async clearBasket(): Promise<RemoveProductFromBasketResponse> {
    await ItemInBasket.delete({});
    return {
      isSuccess: true,
    };
  }

  async getAll(): Promise<GetBasketResponse> {
    return await ItemInBasket.find({ relations: ['shopItem'] });
  }

  async getTotalPrice(): Promise<GetTotalPriceResponse> {
    const items = await this.getAll();
    if (!items.every((item) => this.shopService.hasProduct(item.id))) {
    }
    return null;
  }
}
