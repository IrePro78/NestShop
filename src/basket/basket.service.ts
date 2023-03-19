import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product-dto';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  RemoveProductFromBasketResponse,
} from '../interfaces/basket';
import { ShopService } from '../shop/shop.service';
import { ListProductsInBasketResponse } from '../interfaces/basket';
import { ItemInBasket } from './basket.entity';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {}

  async add(product: AddProductDto): Promise<AddProductToBasketResponse> {
    const { count, id } = product;

    const shopItem = await this.shopService.getOneProduct(id);

    if (
      typeof id !== 'string' ||
      typeof count !== 'number' ||
      id === '' ||
      count <= 0 ||
      !shopItem
    ) {
      return {
        isSuccess: false,
      };
    }
    await this.shopService.addBoughtCounter(id);

    const item = new ItemInBasket();
    item.count = count;
    await item.save();

    item.shopItem = shopItem;

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

  async getAll(): Promise<ListProductsInBasketResponse> {
    return await ItemInBasket.find({ relations: ['shopItem'] });
  }

  async getTotalPrice(): Promise<GetTotalPriceResponse> {
    const items = await this.getAll();
    if (!items.every((item) => this.shopService.hasProduct(item.id))) {
      const alternativeBasket = items.filter((item) =>
        this.shopService.hasProduct(item.id),
      );
      return {
        isSuccess: false,
        alternativeBasket: alternativeBasket,
      };
    }
    return (
      await Promise.all(
        items.map(async (item) => item.shopItem.price * item.count * 1.23),
      )
    ).reduce((acc, curr) => acc + curr, 0);
  }
}
