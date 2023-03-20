import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserResponse } from '../interfaces/user';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() user: RegisterDto): Promise<RegisterUserResponse> {
    return await this.userService.register(user);
  }
}
