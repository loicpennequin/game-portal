import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCRUDService } from 'src/core/services/baseCRUD.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Maybe, UUID } from '@gp/shared';

@Injectable()
export class UserService extends BaseCRUDService<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: UUID
  ): Promise<Maybe<User>> {
    const user = await this.findById(userId);

    if (!user || !user.refreshTokenHash) return null;

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash
    );

    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }
}
