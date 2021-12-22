import { IUser } from '../user';
import { friendRequestStatus } from '../enums';
import { IEntity } from '../interfaces';
import { UUID } from '../types';

export interface IFriendRequest extends IEntity {
  from: IUser;
  to: IUser;
  status: friendRequestStatus;
}

export interface ICreateFriendRequestDto {
  to: UUID;
}
