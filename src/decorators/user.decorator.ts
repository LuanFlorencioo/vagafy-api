import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const factory = (data: 'sub' | 'email', ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  return data ? user[data] : user;
};

export const User = createParamDecorator(factory);
