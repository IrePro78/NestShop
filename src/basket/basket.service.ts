import { Inject, Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product-dto';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  RemoveProductFromBasketResponse,
} from '../interfaces/basket';
import { ShopService } from '../shop/shop.service';
import { ListProductsInBasketResponse } from '../interfaces/basket';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  add(item: AddProductDto): AddProductToBasketResponse {
    const { name, count } = item;
    const { items } = this;

    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      name === '' ||
      count <= 0
      //   ||
      // !this.shopService.hasProduct(name)
    ) {
      return {
        isSuccess: false,
      };
    }
    items.push(item);
    return {
      isSuccess: true,
      index: this.items.length - 1,
    };
  }

  remove(index: number): RemoveProductFromBasketResponse {
    const { items } = this;
    if (index < 0 || index >= items.length) {
      return {
        isSuccess: false,
      };
    }
    items.splice(index, 1);
    return {
      isSuccess: true,
    };
  }

  list(): ListProductsInBasketResponse {
    return this.items;
  }

  getTotalPrice(): GetTotalPriceResponse {
    if (!this.items.every((item) => this.shopService.hasProduct(item.name))) {
      const alternativeBasket = this.items.filter((item) =>
        this.shopService.hasProduct(item.name),
      );
      return {
        isSuccess: false,
        alternativeBasket: alternativeBasket,
      };
    }
    return this.items
      .map(
        (item) =>
          this.shopService.getPriceOfProduct(item.name) * item.count * 1.23,
      )
      .reduce((acc, curr) => acc + curr, 0);
  }
}
