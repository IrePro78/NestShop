import { PasswordProtectGuard } from './password-protect.guard';

describe('PasswordProtectGuard', () => {
  it('should be defined', () => {
    expect(new PasswordProtectGuard()).toBeDefined();
  });
});
