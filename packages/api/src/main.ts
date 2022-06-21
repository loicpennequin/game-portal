import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { SilentAuthGuard } from './auth/guards/silent-auth.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false
    })
  );
  app.use(cookieParser());
  app.useGlobalGuards(new SilentAuthGuard());
  app.enableCors({
    origin(origin, cb) {
      if (process.env.NODE_ENV !== 'production') return cb(null, true);

      if (!origin) return cb(null, true);
      if ([process.env.WEBSITE_URL, process.env.CLIENT_URL].includes(origin))
        return cb(null, true);

      return cb(new Error('CORS'));
    },
    credentials: true
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('Game Portal REST API')
    .setDescription('todo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 8000);
}

bootstrap();
