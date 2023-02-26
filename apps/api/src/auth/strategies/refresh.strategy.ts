import { JwtPayload } from '@/common/interfaces';
import { JwtConfigService } from '@/config/jwt/config.service';
import { SessionsService } from '@/models/session/session.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private jwtConfigService: JwtConfigService,
    private sessionService: SessionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies.refresh]),
      secretOrKey: jwtConfigService.refresh_secret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: Omit<JwtPayload, 'email'>) {
    const token = request.cookies.refresh;
    const id = payload.sub;
    const sessions = await this.sessionService.findOne(id);
    const isValid = await this.sessionService.verify(sessions, token);

    if (!sessions || !isValid) {
      throw new ForbiddenException();
    }
    return isValid;
  }
}
