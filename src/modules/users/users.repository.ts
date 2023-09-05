import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(userData: SignUpDto): Promise<User> {
    const { password } = userData;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });

    return user;
  }

  async update(id: number, userData: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        is_authenticated: userData.email ? false : true,
      },
    });

    return user;
  }

  async updateToken(id: number, endsWith: string) {
    const charLength: number = endsWith.length;
    const randomNumbers: string = `${Math.random()}`;
    const numberSliced: string = randomNumbers.slice(2, 6 - charLength);
    const token: string = numberSliced + endsWith;

    await this.prisma.user.update({
      where: { id },
      data: { token },
    });

    return token;
  }

  async authenticate(id: number) {
    await this.prisma.user.update({
      where: { id },
      data: {
        is_authenticated: true,
        token: null,
      },
    });
  }

  async updatePassword(id: number, newPassword: string) {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        token: null,
      },
    });
  }

  async disable(id: number, is_disabled: boolean) {
    await this.prisma.user.update({
      where: { id },
      data: {
        is_disabled,
        disabled_at: new Date(),
        token: null,
      },
    });
  }

  async delete(id: number) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
