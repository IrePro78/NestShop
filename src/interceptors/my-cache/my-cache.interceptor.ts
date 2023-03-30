import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const method = context.getHandler();

    const cacheData = this.reflector.get<any>('cacheData', method);
    const cachedTime = this.reflector.get<Date>('cacheTime', method);

    if (cacheData) {
      console.log(cacheData);
      return of(cacheData);
    }
    console.log(cacheData && +cachedTime + 1000 > +new Date());
    return next.handle().pipe(
      tap((data) => {
        Reflect.defineMetadata('cacheData', data, method);
        Reflect.defineMetadata('cacheTime', new Date(), method);
      }),
    );
  }
}
