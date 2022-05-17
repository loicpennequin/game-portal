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

export type ICreateGame = Pick<IGame, 'name' | 'appUrl'>;
export type IUpdateGame = Pick<IGame, 'name' | 'appUrl' | 'status'>;
