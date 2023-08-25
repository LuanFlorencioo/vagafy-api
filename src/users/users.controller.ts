import { Controller, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign_up')
  async signUp(@Body() userData: SignUpDto) {
    return this.usersService.signUp(userData);
  }

  @Post('/sign_in')
  async signIn(@Body() userData: SignInDto) {
    return this.usersService.signIn(userData);
  }
}
