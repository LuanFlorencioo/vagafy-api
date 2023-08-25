import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { UsersRepository } from './users.repository';
import { User } from 'src/models/user.model';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userData: SignUpDto): Promise<User> {
    const findUser: User | null = await this.usersRepository.findByEmail(
      userData.email,
    );
    if (findUser) {
      throw new ConflictException('Este endereço de e-mail já foi cadastrado');
    }

    const user = await this.usersRepository.create(userData);
    return plainToInstance(User, user);
  }

  async signIn({ email, password }: SignInDto) {
    const findUser: User | null = await this.usersRepository.findByEmail(email);
    if (!findUser) {
      throw new UnauthorizedException('Credenciais inválida');
    }

    const isSamePassword = bcrypt.compareSync(password, findUser.password);
    if (!isSamePassword) {
      throw new UnauthorizedException('Credenciais inválida');
    }

    const payload = { sub: findUser.id, userEmail: findUser.email };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
