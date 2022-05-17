import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequest } from './friend-request.entity';
import { friendRequestServiceProvider } from './friend-request.providers';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest])],
  exports: [TypeOrmModule, friendRequestServiceProvider],
  controllers: [FriendRequestController],
  providers: [friendRequestServiceProvider]
})
export class FriendRequestModule {}
