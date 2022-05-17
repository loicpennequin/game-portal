import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME } from '../auth.constants';
import { UUID } from '@gp/shared';
import { User } from 'src/user/entities/user.entity';
import { IUserService } from 'src/user/interfaces/user-service.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(configService: ConfigService, private userService: IUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.[REFRESH_TOKEN_COOKIE_NAME];
        }
      ]),
      secretOrKey: configService.get('jwt.refreshToken.secret'),
      passReqToCallback: true
    });
  }

  async validate(request: Request, payload: { sub: UUID }): Promise<User> {
    const refreshToken = request.cookies?.[REFRESH_TOKEN_COOKIE_NAME];

    const user = await this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.sub
    );

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
