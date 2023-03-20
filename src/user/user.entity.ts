import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RegisterUserResponse } from '../interfaces/user';
import { ItemInBasket } from '../basket/item-in-basket.entity';

@Entity()
export class User extends BaseEntity implements RegisterUserResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  email: string;

  @OneToMany((type) => ItemInBasket, (entity) => entity.user)
  itemsInBasket: ItemInBasket[];
}
