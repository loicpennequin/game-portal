import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private generateTokens(user: User) {
    const payload = { sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.accessToken.secret'),
        expiresIn: this.configService.get('jwt.accessToken.expiresIn'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.refreshToken.secret'),
        expiresIn: this.configService.get('jwt.refreshToken.expiresIn'),
      }),
    };
  }

  async login(authLoginDto: LoginDto) {
    const user = await this.validateUser(authLoginDto);

    return this.generateTokens(user);
  }

  private async validateUser(authLoginDto: LoginDto): Promise<User> {
    const { email, password } = authLoginDto;
    const user = await this.usersService.findOne({ where: { email } });

    const isValid = await user?.validatePassword(password);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
