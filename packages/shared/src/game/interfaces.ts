import { GameStatus } from '../enums';
import { IEntity } from '../interfaces';
import { UUID } from '../types';

export interface IGame extends IEntity {
  name: string;
  appUrl: string;
  rating: number;
  status: GameStatus;
  ownerId: UUID;
}

export interface ICreateGameDto {
  name: string;
  appUrl: string;
}
