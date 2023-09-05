import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/utils/mail.service';
import { UserValidationService } from 'src/utils/user-validation.service';
import { plainToInstance } from 'class-transformer';
import { UsersRepository } from './users.repository';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private mailService: MailService,
    private userValidation: UserValidationService,
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
      throw new UnauthorizedException('Credenciais inválidas');
    }

    this.userValidation.isSamePassword(password, findUser.password);
    const payload = { sub: findUser.id, email: findUser.email };
    const token = await this.jwtService.signAsync(payload);

    return { bearer_token: token };
  }

  async findUser(id: number): Promise<User> {
    try {
      return await this.usersRepository.findById(id);
    } catch {
      throw new NotFoundException('Usuário não existe ou não encontrado');
    }
  }

  async getUser(id: number) {
    const user: User = await this.findUser(id);
    this.userValidation.isNotDisabled(user.is_disabled, user.disabled_at);

    return plainToInstance(User, user);
  }

  async updateUser(id: number, userData: UpdateUserDto) {
    if (userData.email) {
      const alreadyExistEmail = await this.usersRepository.findByEmail(
        userData.email,
      );
      if (alreadyExistEmail) {
        throw new ConflictException(
          'Este endereço de e-mail já foi cadastrado',
        );
      }
    }
    await this.findUser(id);
    const user = await this.usersRepository.update(id, userData);
    this.userValidation.isNotDisabled(user.is_disabled, user.disabled_at);

    return plainToInstance(User, user);
  }

  async ableAuthUser(id: number, password: string) {
    const user: User = await this.findUser(id);
    this.userValidation.isSamePassword(password, user.password);
    this.userValidation.isNotAlreadyAuth(user.is_authenticated);

    const token = await this.usersRepository.updateToken(id, 'A');
    await this.mailService.toAuthenticate(user.email, token);

    return { message: 'Foi enviado um e-mail para confirmar autenticação' };
  }

  async authenticateUser(id: number, token: string) {
    const user: User = await this.findUser(id);
    this.userValidation.isValidToken(token, user.token, 'A');
    await this.usersRepository.authenticate(id);

    return { message: 'Usuário autenticado com sucesso' };
  }

  async ableChangePassUser(id: number, password: string) {
    const user: User = await this.findUser(id);
    this.userValidation.isSamePassword(password, user.password);
    this.userValidation.isAuth(user.is_authenticated);
    this.userValidation.isNotDisabled(user.is_disabled, user.disabled_at);

    const token = await this.usersRepository.updateToken(id, 'P');
    await this.mailService.toPassword(user.email, token);

    return { message: 'Foi enviado um e-mail para alteração de senha' };
  }

  async changePass(id: number, token: string, newPassword: string) {
    const user: User = await this.findUser(id);
    this.userValidation.isAuth(user.is_authenticated);
    this.userValidation.isNotDisabled(user.is_disabled, user.disabled_at);
    this.userValidation.isValidToken(token, user.token, 'P');
    await this.usersRepository.updatePassword(id, newPassword);

    return { message: 'Senha alterada com sucesso' };
  }

  async ableDisableUser(id: number, password: string) {
    const user: User = await this.findUser(id);
    this.userValidation.isSamePassword(password, user.password);
    this.userValidation.isAuth(user.is_authenticated);
    this.userValidation.isNotDisabled(user.is_disabled, user.disabled_at);

    const token = await this.usersRepository.updateToken(id, 'DI');
    await this.mailService.toDisable(user.email, token);

    return { token, message: 'Foi enviado e-mail para desativar a conta' };
  }

  async disableUser(id: number, token: string) {
    const user: User = await this.findUser(id);
    this.userValidation.isAuth(user.is_authenticated);
    this.userValidation.isNotDisabled(user.is_disabled, user.disabled_at);
    this.userValidation.isValidToken(token, user.token, 'DI');
    await this.usersRepository.disable(id, true);

    return { message: 'Usuário desativado com sucesso' };
  }

  async ableRecoverUser(id: number, password: string) {
    const user: User = await this.findUser(id);
    this.userValidation.isSamePassword(password, user.password);
    this.userValidation.isAuth(user.is_authenticated);

    const token = await this.usersRepository.updateToken(id, 'R');
    await this.mailService.toRecover(user.email, token);

    return { token, message: 'Foi enviado e-email para recuperar a conta' };
  }

  async recoverUser(id: number, token: string) {
    const user: User = await this.findUser(id);
    this.userValidation.isAuth(user.is_authenticated);
    this.userValidation.isDisabled(user.is_disabled);
    this.userValidation.isValidToken(token, user.token, 'R');
    await this.usersRepository.disable(id, false);

    return { message: 'Usuário recuperado com sucesso' };
  }

  async ableDeleteUser(id: number, password: string) {
    const user: User = await this.findUser(id);
    this.userValidation.isAuth(user.is_authenticated);
    this.userValidation.isSamePassword(password, user.password);
    this.userValidation.isDisabled(user.is_disabled);

    const token = await this.usersRepository.updateToken(id, 'DE');
    await this.mailService.toDelete(user.email, token);

    return { message: 'Foi enviado e-mail para esclusão da conta' };
  }

  async deleteUser(id: number, token: string) {
    const user: User = await this.findUser(id);
    this.userValidation.isAuth(user.is_authenticated);
    this.userValidation.isDisabled(user.is_disabled);
    this.userValidation.isValidToken(token, user.token, 'DE');

    await this.usersRepository.delete(id);
  }
}
