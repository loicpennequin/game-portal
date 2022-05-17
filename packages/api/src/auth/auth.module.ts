import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { authServiceProvider } from './providers';
import { jwtModuleOptions } from './configs/jwt-module.config';

@Module({
  imports: [UserModule, PassportModule, JwtModule.registerAsync(jwtModuleOptions)],
  exports: [authServiceProvider],
  providers: [authServiceProvider, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
