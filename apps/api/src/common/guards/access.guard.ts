import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import type { Observable } from 'rxjs';
import { PUBLIC_KEY } from '../decorators/metadata';

@Injectable()
export class AccessGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(ctx: ExecutionContext): Promise<boolean> | Observable<boolean> | boolean {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, ctx.getHandler());
    if (isPublic) {
      return true;
    }
    return super.canActivate(ctx);
  }
}
