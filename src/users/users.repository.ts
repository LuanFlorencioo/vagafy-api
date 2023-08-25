import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/models/user.model';
import { SignUpDto } from './dto/sign-up.dto';
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

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }
}
