import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { IAuthService } from './interfaces/auth-service.interface';
import { IUserService } from 'src/user/interfaces/user-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  generateTokens(user: User) {
    const payload = { sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.accessToken.secret'),
        expiresIn: this.configService.get('jwt.accessToken.expiresIn')
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.refreshToken.secret'),
        expiresIn: this.configService.get('jwt.refreshToken.expiresIn')
      })
    };
  }

  async login(authLoginDto: LoginDto) {
    const user = await this.validateUser(authLoginDto);
    const tokens = await this.generateTokens(user);

    await this.userService.updateById(user.id, {
      refreshTokenHash: await bcrypt.hash(tokens.refreshToken, 10)
    });

    return tokens;
  }

  logout(user: User) {
    return this.userService.updateById(user.id, { refreshTokenHash: null });
  }

  private async validateUser(authLoginDto: LoginDto): Promise<User> {
    const { email, password } = authLoginDto;
    const user = await this.userService.findOne({ where: { email } });

    const isValid = await user?.validatePassword(password);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
