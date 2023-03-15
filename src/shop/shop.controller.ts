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
import {
  CreateProductResponse,
  GetListProductsResponse,
  GetOneProductResponse,
} from '../interfaces/shop';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {}

  @Get('/')
  getProducts(): Promise<GetListProductsResponse> {
    return this.shopService.getProducts();
  }

  @Get('/find')
  testFind(): Promise<GetListProductsResponse> {
    return this.shopService.findProducts();
  }

  @Get('/:id')
  async getOneProduct(@Param('id') id: string): Promise<GetOneProductResponse> {
    return await this.shopService.getOneProduct(id);
  }

  @Delete('/:id')
  removeProduct(@Param('id') id: string) {
    return this.shopService.removeProduct(id);
  }

  @Post('/')
  async createNewProduct(@Body() obj: Promise<CreateProductResponse>) {
    return await this.shopService.createProduct(await obj);
  }
}
