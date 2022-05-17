import {
  UUID,
  IFriendRequest,
  friendRequestStatuses,
  FriendRequestStatus
} from '@gp/shared';
import { IsEnum } from 'class-validator';
import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { serializationGroups } from 'src/core/core.constants';
import { Serializable } from 'src/core/decorators/serializable.decorator';

@Entity()
@Serializable({
  handle(entity: FriendRequest, user: User) {
    return { isOwned: [entity.fromId, entity.toId].includes(user?.id) };
  }
})
export class FriendRequest extends BaseEntity implements IFriendRequest {
  @Expose({
    groups: [serializationGroups.OWNED, serializationGroups.ADMIN]
  })
  @Column({
    type: 'enum',
    enum: friendRequestStatuses,
    default: friendRequestStatuses.PENDING
  })
  @IsEnum(friendRequestStatuses)
  status: FriendRequestStatus;

  @Expose()
  @ManyToOne(
    () => User,
    user => user.sentFriendRequests
  )
  from: User;

  @Expose()
  @RelationId((friendRequest: FriendRequest) => friendRequest.from)
  fromId: UUID;

  @Expose()
  @ManyToOne(
    () => User,
    user => user.receivedFriendRequests
  )
  to: User;

  @Expose()
  @RelationId((friendRequest: FriendRequest) => friendRequest.to)
  toId: UUID;
}
