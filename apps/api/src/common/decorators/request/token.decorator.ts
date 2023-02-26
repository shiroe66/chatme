import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const GetToken = createParamDecorator(
  (data: 'access' | 'refresh', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (data === 'access') {
      const token = request.headers.authorization.split(' ')[1];
      return token;
    }
    if (data === 'refresh') {
      const token = request.cookies.Refresh;
      return token;
    }
    return null;
  },
);
