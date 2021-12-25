import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME } from './auth.constants';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() authLoginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      authLoginDto,
    );

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken);

    return { accessToken };
  }
}
