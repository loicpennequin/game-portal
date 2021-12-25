import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { SilentAuthGuard } from './auth/guards/silent-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new SilentAuthGuard());
  app.enableCors({
    origin(origin, cb) {
      if (process.env.NODE_ENV !== 'production') return cb(null, true);

      if (!origin) return cb(null, true);
      if ([process.env.WEBSITE_URL, process.env.CLIENT_URL].includes(origin))
        return cb(null, true);

      return cb(new Error('CORS'));
    },
    credentials: true,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT || 8000);
}

bootstrap();
