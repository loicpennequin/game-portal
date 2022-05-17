import { ConfigService } from '@nestjs/config';

export const jwtModuleOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      secret: configService.get('jwt.accessToken.secret'),
      signOptions: {
        expiresIn: configService.get('jwt.accessToken.expiresIn')
      }
    };
  }
};
