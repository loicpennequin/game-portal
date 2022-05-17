import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsUniqueUserConstraint } from './decorators/is-unique-user.decorator';
import { UpdateUserPolicy } from './policies/update-user.policy';
import { GameModule } from 'src/game/game.module';
import { FriendRequestModule } from 'src/friend-request/friend-request.module';
import { userServiceProvider } from './providers/user-service.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GameModule, FriendRequestModule],
  exports: [TypeOrmModule, userServiceProvider],
  controllers: [UserController],
  providers: [userServiceProvider, UpdateUserPolicy, IsUniqueUserConstraint]
})
export class UserModule {}
