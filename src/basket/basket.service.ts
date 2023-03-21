import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  AddProductToBasketResponse,
  GetBasketResponse,
  GetBasketStatsResponse,
  GetTotalPriceResponse,
  RemoveProductFromBasketResponse,
} from '../interfaces/basket';
import { ShopService } from '../shop/shop.service';
import { ItemInBasket } from './item-in-basket.entity';
import { UserService } from '../user/user.service';
import { AddProductDto } from './dto/add-product.dto';
import { DataSource } from 'typeorm';
import { of } from 'rxjs';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService))
    private shopService: ShopService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private readonly dataSource: DataSource,
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

  async remove(
    userId: string,
    itemInBasketId: string,
  ): Promise<RemoveProductFromBasketResponse> {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found');
    }
    const item = await ItemInBasket.findOneOrFail({
      where: {
        id: itemInBasketId,
        user: {
          id: userId,
        },
      },
    });

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

  async clearBasket(userId: string): Promise<RemoveProductFromBasketResponse> {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await ItemInBasket.delete({
      user: {
        id: userId,
      },
    });
    return {
      isSuccess: true,
    };
  }

  async getAllForUser(userId: string): Promise<GetBasketResponse> {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return await ItemInBasket.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['shopItem'],
    });
  }

  async getAllForAdmin(): Promise<GetBasketResponse> {
    return await ItemInBasket.find({
      relations: ['shopItem', 'user'],
    });
  }

  async getTotalPrice(userId: string): Promise<GetTotalPriceResponse> {
    const items = await this.getAllForUser(userId);
    console.log(items);

    if (!items.every((item) => this.shopService.hasProduct(item.id))) {
    }
    return (
      await Promise.all(
        items.map(async (item) => item.shopItem.price * item.count * 1.23),
      )
    ).reduce((acc, curr) => acc + curr, 0);
  }

  async getStats(): Promise<GetBasketStatsResponse> {
    const { itemInBasketAvgPrice } = await this.dataSource
      .createQueryBuilder()
      .select('AVG(shopItem.price)', 'itemInBasketAvgPrice')
      .from(ItemInBasket, 'itemInBasket')
      .leftJoinAndSelect('itemInBasket.shopItem', 'shopItem')
      .getRawOne();

    const allItemsInBasket = await this.getAllForAdmin();

    const baskets: {
      [userId: string]: number;
    } = {};

    for (const oneItemInBasket of allItemsInBasket) {
      baskets[oneItemInBasket.user.id] = baskets[oneItemInBasket.user.id] || 0;

      baskets[oneItemInBasket.user.id] +=
        oneItemInBasket.shopItem.price * oneItemInBasket.count * 1.23;
    }

    const basketValues = Object.values(baskets);

    const basketAvgTotalPrice =
      basketValues.reduce((prev, curr) => prev + curr, 0) / basketValues.length;
    return {
      itemInBasketAvgPrice,
      basketAvgTotalPrice,
    };
  }
}
