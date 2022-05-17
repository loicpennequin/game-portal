import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCRUDService } from 'src/core/services/baseCRUD.service';
import { Repository } from 'typeorm';
import { FriendRequest } from './friend-request.entity';

@Injectable()
export class FriendRequestService extends BaseCRUDService<FriendRequest> {
  constructor(
    @InjectRepository(FriendRequest) repository: Repository<FriendRequest>
  ) {
    super(repository);
  }
}
