import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ShopModule } from '../shop/shop.module';
import { BasketModule } from '../basket/basket.module';

@Module({
  imports: [forwardRef(() => ShopModule), forwardRef(() => BasketModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
