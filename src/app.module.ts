import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './shop/shop.module';
import { BasketModule } from './basket/basket.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user',
      password: 'user123',
      database: 'shopNest',
      entities: ['dist/**/**.entity{.ts,.js}'],
      bigNumberStrings: false,
      logging: true,
      synchronize: true,
    }),
    ShopModule,
    BasketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
