import { Provider } from '@nestjs/common';
import { GameService } from '../service/game.service';
import { IGameService } from '../interface/game-service.interface';

export const gameServiceProvider: Provider = {
  provide: IGameService,
  useClass: GameService
};
