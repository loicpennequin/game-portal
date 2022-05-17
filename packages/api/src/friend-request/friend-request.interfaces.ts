import { IFriendRequest } from '@gp/shared';
import { ICrudService } from 'src/core/interfaces/crud-service.interface';

export type IFriendRequestService = ICrudService<IFriendRequest>;

export const IFriendRequestService = Symbol('friendRequestService');
