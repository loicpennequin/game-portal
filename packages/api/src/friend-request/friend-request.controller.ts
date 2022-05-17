import { Controller, Inject } from '@nestjs/common';
import { IFriendRequestService } from './friend-request.interfaces';

@Controller('friend_requests')
export class FriendRequestController {
  constructor(
    @Inject(IFriendRequestService)
    private readonly friendRequestService: IFriendRequestService
  ) {}
}
