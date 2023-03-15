import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './shop/shop.module';
import { BasketModule } from './basket/basket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItem } from './shop/shop-item.entity';
import { Basket } from './basket/basket.entity';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ShopModule, BasketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
