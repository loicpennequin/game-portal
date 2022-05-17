import { UUID, Maybe } from '@gp/shared';
import { ICrudService } from 'src/core/interfaces/crud-service.interface';
import { User } from '../entities/user.entity';

export interface IUserService extends ICrudService<User> {
  getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: UUID
  ): Promise<Maybe<User>>;
}

export const IUserService = Symbol('userService');
