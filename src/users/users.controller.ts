import {
  Controller,
  UseGuards,
  HttpCode,
  Req,
  Body,
  Post,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign_up')
  signUp(@Body() userData: SignUpDto) {
    return this.usersService.signUp(userData);
  }

  @HttpCode(200)
  @Post('/sign_in')
  signIn(@Body() userData: SignInDto) {
    return this.usersService.signIn(userData);
  }

  @UseGuards(AuthGuard)
  @Get()
  getUserData(@Req() request: Request) {
    const userEmail: string = request['user']['email'];
    return this.usersService.getUserData(userEmail);
  }
}
