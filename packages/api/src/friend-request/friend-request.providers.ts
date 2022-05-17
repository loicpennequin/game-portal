import { Provider } from '@nestjs/common';
import { IFriendRequestService } from './friend-request.interfaces';
import { FriendRequestService } from './friend-request.service';

export const friendRequestServiceProvider: Provider = {
  provide: IFriendRequestService,
  useClass: FriendRequestService
};
