import { ConfigModuleOptions } from '@nestjs/config';

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: '.env.local',
  isGlobal: true,
  load: [
    () => ({
      port: parseInt(process.env.PORT, 10) || 8000,

      database: {
        port: parseInt(process.env.DB_PORT, 10),
        host: process.env.DB_HOST,
        type: process.env.DB_TYPE,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },

      jwt: {
        accessToken: {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn:
            process.env.NODE_ENV === 'development' ? 60 * 60 * 48 : 60 * 60 * 2,
        },
        refreshToken: {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        },
      },

      cookie: {
        path: '/',
        secure: false,
        sameSite: true,
        maxAge: 604800000,
        httpOnly: true,
      },
    }),
  ],
};
