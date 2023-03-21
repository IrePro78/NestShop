import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { BasketService } from './basket.service';
import {
  AddProductToBasketResponse,
  GetBasketResponse,
  GetBasketStatsResponse,
  GetTotalPriceResponse,
  RemoveProductFromBasketResponse,
} from '../interfaces/basket';

@Controller('basket')
export class BasketController {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}

  @Post('/')
  addToBasket(
    @Body() item: AddProductDto,
  ): Promise<AddProductToBasketResponse> {
    return this.basketService.add(item);
  }

  @Delete('/all/:userId')
  clearBasket(
    @Param('userId') userId: string,
  ): Promise<RemoveProductFromBasketResponse> {
    return this.basketService.clearBasket(userId);
  }

  @Delete('/:ItemInBasketId/:userId')
  removeProductFromBasket(
    @Param('ItemInBasketId') ItemInBasketId: string,
    @Param('userId') userId: string,
  ): Promise<RemoveProductFromBasketResponse> {
    return this.basketService.remove(userId, ItemInBasketId);
  }

  @Get('/admin')
  getBasketForAdmin(): Promise<GetBasketResponse> {
    return this.basketService.getAllForAdmin();
  }

  @Get('/stats')
  getStats(): Promise<GetBasketStatsResponse> {
    return this.basketService.getStats();
  }

  @Get('/:userId')
  getBasketForUser(
    @Param('userId') userId: string,
  ): Promise<GetBasketResponse> {
    return this.basketService.getAllForUser(userId);
  }

  @Get('/total_price/:userId')
  getTotalPrice(
    @Param('userId') userId: string,
  ): Promise<GetTotalPriceResponse> {
    return this.basketService.getTotalPrice(userId);
  }
}
