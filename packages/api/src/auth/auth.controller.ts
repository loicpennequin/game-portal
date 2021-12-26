import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME } from './auth.constants';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { JwtRefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() authLoginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.login(authLoginDto);

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken);

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

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken);

    return { accessToken };
  }
}
