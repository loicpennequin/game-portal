import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsUniqueUserConstraint } from './decorators/is-unique-user.decorator';
import { UpdateUserPolicy } from './policies/update-user.policy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UserService],
  controllers: [UserController],
  providers: [UserService, UpdateUserPolicy, IsUniqueUserConstraint]
})
export class UserModule {}
