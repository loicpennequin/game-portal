import { IUser } from '../user';
import { gameStatus } from '../enums';
import { IEntity } from '../interfaces';

export interface IGame extends IEntity {
  name: string;
  appUrl: string;
  rating: number;
  status: gameStatus;
  owner: IUser;
}

export interface ICreateGameDto {
  name: string;
  appUrl: string;
}
