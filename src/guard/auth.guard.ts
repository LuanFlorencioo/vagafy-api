import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  getToken(request: Request): string {
    const { authorization } = request.headers;
    if (!authorization) {
      throw new UnauthorizedException(
        'É obrigatório passar um Bearer Token válido',
      );
    }

    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'É obrigatório passar um Bearer Token válido',
      );
    }

    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(
        'Credenciais de autenticação inválidas ou expiradas',
      );
    }

    return true;
  }
}
