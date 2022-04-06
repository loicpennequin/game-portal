import { applyDecorators } from '@nestjs/common';
import { Serializable } from 'src/core/decorators/serializable.decorator';
import { User } from '../entities/user.entity';

export const SerializableUser = () =>
  applyDecorators(
    Serializable({
      handle(entity: User, user: User) {
        return { isOwned: user?.id === entity.id };
      }
    })
  );
