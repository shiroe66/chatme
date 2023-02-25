import { JwtPayload } from '@/common/interfaces';
import { JwtConfigService } from '@/config/jwt/config.service';
import { UserService } from '@/models/user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private jwtConfigService: JwtConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfigService.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.email);
    if (!user) {
      throw new ForbiddenException();
    }
    return payload;
  }
}
