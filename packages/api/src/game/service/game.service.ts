import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCRUDService } from 'src/core/services/baseCRUD.service';
import { Repository } from 'typeorm';
import { Game } from '../entities/game.entity';

@Injectable()
export class GameService extends BaseCRUDService<Game> {
  constructor(@InjectRepository(Game) repository: Repository<Game>) {
    super(repository);
  }
}
