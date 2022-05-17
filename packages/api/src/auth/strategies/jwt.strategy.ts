import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { UUID } from '@gp/shared';
import { IUserService } from 'src/user/interfaces/user-service.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IUserService)
    private userService: IUserService,
    private config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt.accessToken.secret')
    });
  }

  async validate(payload: { sub: UUID }): Promise<User> {
    return this.userService.findById(payload.sub);
  }
}
