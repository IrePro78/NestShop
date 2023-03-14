import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  CreateProductResponse,
  GetListProductsResponse,
  NewItemEntity,
} from '../interfaces/shop';
import { BasketService } from '../basket/basket.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>,
  ) {}

  async getProducts(): Promise<GetListProductsResponse> {
    return await this.shopItemRepository.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }

  async getOnetProduct(id: string): Promise<ShopItem> {
    return await this.shopItemRepository.findOneByOrFail({ id: id });
  }

  async removeProduct(id: string): Promise<DeleteResult> {
    return await this.shopItemRepository.delete(id);
  }

  async createProduct(obj: NewItemEntity) {
    const newItem = new ShopItem();
    const { name, description, price } = obj;
    newItem.name = name;
    newItem.description = description;
    newItem.price = price;
    return await this.shopItemRepository.save(newItem);
  }
}
