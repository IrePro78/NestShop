import { Injectable } from '@nestjs/common';
import { GetListProductsResponse } from '../interfaces/shop';

@Injectable()
export class ShopService {
  getProducts(): GetListProductsResponse {
    return [
      {
        name: 'Ogórek',
        description: 'gruntowy',
        price: 7,
      },
      {
        name: 'Pomidor',
        description: 'malinowy słodki',
        price: 12,
      },
      {
        name: 'Seler',
        description: 'naciowy',
        price: 6.5,
      },
    ];
  }

  hasProduct(name: string): boolean {
    return this.getProducts().some((item) => item.name === name);
  }

  getPriceOfProduct(name: string): number {
    return this.getProducts().find((item) => item.name === name).price;
  }
}
