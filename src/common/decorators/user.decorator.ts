import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// this decorator helps us to return the authenticated user attached to the request object after Authentication guard (JwtAuthGuard) is invoked.
export const AuthUser = createParamDecorator(
  (
    data: unknown,
    ctx: ExecutionContext,
  ): { email: string; id: string; name: string } => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
