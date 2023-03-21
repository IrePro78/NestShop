import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import { RegisterUserResponse } from '../interfaces/user';

@Injectable()
export class UserService {
  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
    const user = new User();

    user.email = newUser.email;
    await user.save();

    return user;
  }

  async getOneUser(id: string): Promise<User> {
    return await User.findOneByOrFail({ id });
  }
}
