import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3308,
  username: 'root',
  password: 'root123',
  database: 'shopNest',
  entities: ['dist/**/*.entity.js'],
  bigNumberStrings: false,
  logging: true,
  synchronize: true,
  migrations: ['dist/db/migrations/*.js'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
