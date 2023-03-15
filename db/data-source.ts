import { DataSource, DataSourceOptions } from 'typeorm';
import { ShopItem } from '../src/shop/shop-item.entity';
import { Basket } from '../src/basket/basket.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3308,
  username: 'root',
  password: 'root123',
  database: 'shopNest',
  // entities: ['dist/**/*.entity.js'],
  entities: [ShopItem, Basket],
  bigNumberStrings: false,
  logging: true,
  synchronize: true,
  migrations: ['dist/db/migrations/*.js'],
};
export const dataSource = new DataSource(dataSourceOptions);
