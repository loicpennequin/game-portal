import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCRUDService } from 'src/core/services/baseCRUD.service';
import { Repository } from 'typeorm';
import { Media } from './media.entity';

@Injectable()
export class MediaService extends BaseCRUDService<Media> {
  constructor(@InjectRepository(Media) repository: Repository<Media>) {
    super(repository);
  }
}
