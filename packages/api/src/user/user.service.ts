import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCRUDService } from 'src/core/services/baseCRUD.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends BaseCRUDService<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }
}
