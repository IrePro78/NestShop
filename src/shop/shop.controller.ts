import { Controller, Get, Inject } from '@nestjs/common';
import { GetListProductsResponse } from '../interfaces/shop';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}
  @Get('/')
  getProducts(): GetListProductsResponse {
    return this.shopService.getProducts();
  }
}
