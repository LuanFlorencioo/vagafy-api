import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserValidationService {
  constructor() {}

  isAuth(isAuthenticated: boolean) {
    if (!isAuthenticated) {
      throw new UnauthorizedException('Usuário não está autenticado');
    }
  }

  isNotDisabled(isDisable: boolean, disabledAt: Date) {
    if (isDisable) {
      throw new UnauthorizedException(
        `Usuário foi desativado em ${disabledAt.toLocaleString()} (horário de Brasília)`,
      );
    }
  }

  isSamePassword(pass: string, passHashed: string) {
    const isPassValid: boolean = bcrypt.compareSync(pass, passHashed);
    if (!isPassValid) {
      throw new UnauthorizedException('Credencias inválidas');
    }
  }

  isNotAlreadyAuth(isAuthenticated: boolean) {
    if (isAuthenticated) {
      throw new UnauthorizedException(
        'O usuário com este endereço de e-mail já está autenticado',
      );
    }
  }

  isDisabled(isDisable: boolean) {
    if (!isDisable) {
      throw new UnauthorizedException('Usuário precisa estar desativado');
    }
  }

  isValidToken(token: string, tokenOriginal: string, endsWith: string) {
    const isSameToken = token === tokenOriginal;
    const isRightAction = token.slice(-endsWith.length) === endsWith;

    if (!isSameToken || !isRightAction) {
      throw new UnauthorizedException('Token de ação inválido ou vencido');
    }
  }
}
