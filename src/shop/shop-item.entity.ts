import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItemDetails } from './shop-item-details.entity';
import { ShopItemInterface } from '../interfaces/shop';
import { ItemInBasket } from '../basket/item-in-basket.entity';

@Entity()
export class ShopItem extends BaseEntity implements ShopItemInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 1000 })
  description: string;

  @Column({ type: 'float', precision: 6, scale: 2 })
  price: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: 0 })
  boughtCounter: number;

  @Column({ default: false })
  wasEverBought: boolean;

  @OneToOne((type) => ShopItemDetails)
  @JoinColumn()
  details: ShopItemDetails;

  @OneToMany((type) => ItemInBasket, (entity) => entity.shopItem)
  itemsInBasket: ItemInBasket[];

  // @ManyToOne((type) => ShopItem, (entity) => entity.subShopItems)
  // mainShopItem: ShopItem;
  //
  // @OneToMany((type) => ShopItem, (entity) => entity.mainShopItem)
  // subShopItems: ShopItem[];

  // @ManyToMany((type) => ShopSet, (entity) => entity.items)
  // @JoinTable()
  // sets: ShopSet[];
}
