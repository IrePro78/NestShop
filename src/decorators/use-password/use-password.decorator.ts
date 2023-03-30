import { SetMetadata } from '@nestjs/common';

export const UsePassword = (pass: string) => SetMetadata('key-password', pass);
