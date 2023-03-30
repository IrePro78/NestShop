import { MyTimeoutInterceptor } from './my-timeout.interceptor';

describe('MyTimeoutInterceptor', () => {
  it('should be defined', () => {
    expect(new MyTimeoutInterceptor()).toBeDefined();
  });
});
