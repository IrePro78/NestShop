import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetListProductsResponse, NewItemEntity } from '../interfaces/shop';
import { BasketService } from '../basket/basket.service';
import { ShopItem } from './shop-item.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}

  async getProducts(): Promise<GetListProductsResponse> {
    return await ShopItem.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }

  async getOneProduct(id: string): Promise<ShopItem> {
    return ShopItem.findOneByOrFail({ id });
  }

  async removeProduct(id: string): Promise<DeleteResult> {
    return ShopItem.delete(id);
  }

  async createProduct(obj: NewItemEntity) {
    const newItem = new ShopItem();
    const { name, description, price } = obj;
    newItem.name = name;
    newItem.description = description;
    newItem.price = price;
    return newItem.save();
  }

  async addBoughtCounter(id: string) {
    await ShopItem.update(id, {
      wasEverBought: true,
    });
    const item = await ShopItem.findOneByOrFail({ id });

    item.boughtCounter++;

    await item.save();
  }

  async findProducts(): Promise<GetListProductsResponse> {
    return await ShopItem.find({ order: { price: 'ASC' } });
  }
}
