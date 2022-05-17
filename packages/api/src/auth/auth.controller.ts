import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME } from './auth.constants';
import { LoginDto } from './dtos/login.dto';
import { JwtRefreshGuard } from './guards/refresh.guard';
import { IAuthService } from './interfaces/auth-service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,
    private readonly configService: ConfigService
  ) {}

  private get cookieOptions() {
    return {
      path: this.configService.get('cookie.path'),
      secure: this.configService.get('cookie.secure'),
      sameSite: this.configService.get('cookie.sameSite'),
      maxAge: this.configService.get('cookie.maxAge'),
      httpOnly: this.configService.get('cookie.httpOnly')
    };
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() authLoginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.login(authLoginDto);

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, this.cookieOptions);

    return { accessToken };
  }

  @HttpCode(204)
  @Get('/logout')
  async logout(
    @Req() req,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    await this.authService.logout(req.user);
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  async refresh(
    @Req() req,
    @Res({ passthrough: true }) res: Response
  ): Promise<any> {
    const { accessToken, refreshToken } = this.authService.generateTokens(req.user);

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, this.cookieOptions);

    return { accessToken };
  }
}
