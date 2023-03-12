import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopController } from './shop/shop.controller';
import { BasketController } from './basket/basket.controller';
import { BasketService } from './basket/basket.service';
import { ShopService } from './shop/shop.service';

@Module({
  imports: [],
  controllers: [AppController, ShopController, BasketController],
  providers: [AppService, BasketService, ShopService],
})
export class AppModule {}
