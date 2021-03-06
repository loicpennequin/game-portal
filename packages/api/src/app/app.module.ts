import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { configModuleOptions } from './configs/configModule.options';
// import { AppGateway } from './app.gateway';

import { CoreModule } from 'src/core/core.module';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { GameModule } from 'src/game/game.module';
import { FriendRequestModule } from 'src/friend-request/friend-request.module';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({ verboseMemoryLeak: true }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    ConfigModule.forRoot(configModuleOptions),
    DatabaseModule,
    CoreModule,
    AuthModule,
    UserModule,
    GameModule,
    MediaModule,
    FriendRequestModule
  ]
})
export class AppModule {}
