import { IUser } from '../user';
import { FriendRequestStatus } from '../enums';
import { IEntity } from '../interfaces';
import { UUID } from '../types';

export interface IFriendRequest extends IEntity {
  from: IUser;
  fromId: UUID;
  to: IUser;
  toId: UUID;
  status: FriendRequestStatus;
}

export interface ICreateFriendRequestDto {
  to: UUID;
}
