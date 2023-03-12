import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { AddProductDto } from './dto/add-product-dto';
import { BasketService } from './basket.service';
import { RemoveProductFromBasketResponse } from '../interfaces/basket';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Post('/')
  addToBasket(@Body() item: AddProductDto) {
    return this.basketService.add(item);
  }

  @Delete('/:index')
  removeProductFromBasket(
    @Param('index') index: number,
  ): RemoveProductFromBasketResponse {
    return this.basketService.remove(index);
  }

  @Get('/')
  getListProductInBasket() {
    return this.basketService.list();
  }

  @Get('/total_price')
  getTotalPrice() {
    return this.basketService.getTotalPrice();
  }
}
