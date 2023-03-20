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

  @Delete('/all')
  clearBasket(): Promise<RemoveProductFromBasketResponse> {
    return this.basketService.clearBasket();
  }

  @Delete('/:id')
  removeProductFromBasket(
    @Param('id') id: string,
  ): Promise<RemoveProductFromBasketResponse> {
    return this.basketService.remove(id);
  }

  @Get('/:')
  getBasket(): Promise<GetBasketResponse> {
    return this.basketService.getAll();
  }

  @Get('/total_price')
  getTotalPrice() {
    return this.basketService.getTotalPrice();
  }
}
