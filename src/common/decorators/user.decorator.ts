import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (
    data: unknown,
    ctx: ExecutionContext,
  ): { email: string; id: string; name: string } => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
