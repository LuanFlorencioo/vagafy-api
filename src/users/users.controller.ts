import {
  Controller,
  UseGuards,
  HttpCode,
  Body,
  Param,
  Post,
  Get,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { NewPasswordDto, PasswordDto } from './dto/password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  getUser(@User('sub') userId: number) {
    return this.usersService.getUser(userId);
  }

  @UseGuards(AuthGuard)
  @Patch()
  updateUser(@User('sub') userId: number, @Body() userData: UpdateUserDto) {
    return this.usersService.updateUser(userId, userData);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Post('/auth')
  ableAuthUser(@User('sub') userId: number, @Body() { password }: PasswordDto) {
    return this.usersService.ableAuthUser(userId, password);
  }

  @UseGuards(AuthGuard)
  @Put('/auth/:user_token')
  authenticateUser(
    @User('sub') userId: number,
    @Param('user_token') userToken: string,
  ) {
    return this.usersService.authenticateUser(userId, userToken);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Post('/pass')
  ableChangePassUser(
    @User('sub') userId: number,
    @Body() { password }: PasswordDto,
  ) {
    return this.usersService.ableChangePassUser(userId, password);
  }

  @UseGuards(AuthGuard)
  @Put('/pass/:user_token')
  changePass(
    @User('sub') userId: number,
    @Param('user_token') userToken: string,
    @Body() { new_password: newPassword }: NewPasswordDto,
  ) {
    return this.usersService.changePass(userId, userToken, newPassword);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Post('/disable')
  ableDisableUser(
    @User('sub') userId: number,
    @Body() { password }: PasswordDto,
  ) {
    return this.usersService.ableDisableUser(userId, password);
  }

  @UseGuards(AuthGuard)
  @Put('/disable/:user_token')
  disableUser(
    @User('sub') userId: number,
    @Param('user_token') userToken: string,
  ) {
    return this.usersService.disableUser(userId, userToken);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Post('/recover')
  ableRecoverUser(
    @User('sub') userId: number,
    @Body() { password }: PasswordDto,
  ) {
    return this.usersService.ableRecoverUser(userId, password);
  }

  @UseGuards(AuthGuard)
  @Put('/recover/:user_token')
  recoverUser(
    @User('sub') userId: number,
    @Param('user_token') userToken: string,
  ) {
    return this.usersService.recoverUser(userId, userToken);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Post('/delete')
  ableDeleteUser(
    @User('sub') userId: number,
    @Body() { password }: PasswordDto,
  ) {
    return this.usersService.ableDeleteUser(userId, password);
  }

  @HttpCode(204)
  @UseGuards(AuthGuard)
  @Delete('/delete/:user_token')
  deleteUser(
    @User('sub') userId: number,
    @Param('user_token') userToken: string,
  ) {
    return this.usersService.deleteUser(userId, userToken);
  }
}
