import { IGame } from '@gp/shared';
import { ICrudService } from 'src/core/interfaces/crud-service.interface';

export type IGameService = ICrudService<IGame>;

export const IGameService = Symbol('gameService');
