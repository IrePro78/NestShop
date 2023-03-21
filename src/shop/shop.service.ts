import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  GetListProductsResponse,
  GetPaginatedListOfProductsResponse,
  ShopItemInterface,
} from '../interfaces/shop';

import { BasketService } from '../basket/basket.service';
import { ShopItem } from './shop-item.entity';
import { ShopItemDetails } from './shop-item-details.entity';
import { DataSource, DeleteResult } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    @Inject(forwardRef(() => UserService))
    private basketService: BasketService,
    private readonly dataSource: DataSource,
  ) {}

  async getProducts(
    currentPage = 1,
  ): Promise<GetPaginatedListOfProductsResponse> {
    const maxPerPage = 4;
    const [items, count] = await ShopItem.findAndCount({
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });
    const pagesCount = Math.ceil(count / maxPerPage);
    // console.log({ count, pagesCount });
    return {
      items,
      pagesCount,
    };
  }

  async hasProduct(id: string): Promise<boolean> {
    return (await this.getProducts()).items.some((item) => item.id === id);
  }

  async getPriceOfProduct(id: string): Promise<number> {
    return (await this.getProducts()).items.find((item) => item.id === id)
      .price;
  }

  async getOneProduct(id: string): Promise<ShopItem> {
    return ShopItem.findOneByOrFail({ id });
  }

  async removeProduct(id: string): Promise<DeleteResult> {
    return ShopItem.delete(id);
  }

  async createProduct(obj: ShopItemInterface) {
    const newItem = new ShopItem();
    const { name, description, price } = obj;
    newItem.name = name;
    newItem.description = description;
    newItem.price = price;
    await newItem.save();

    const details = new ShopItemDetails();
    details.color = 'green';
    details.width = 20;
    await details.save();

    newItem.details = details;

    return newItem;
  }

  async addBoughtCounter(id: string) {
    await ShopItem.update(id, {
      wasEverBought: true,
    });
    const item = await ShopItem.findOneByOrFail({ id });

    item.boughtCounter++;

    await item.save();
  }

  async findProducts(searchTerm: string): Promise<GetListProductsResponse> {
    const { count } = await this.dataSource
      .createQueryBuilder()
      .select('COUNT(item.id)', 'count')
      .from(ShopItem, 'item')
      .getRawOne();
    console.log({ count });

    return await this.dataSource
      .createQueryBuilder()
      .select('item')
      .from(ShopItem, 'item')
      .where('item.description LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      })
      .getMany();
  }
}
