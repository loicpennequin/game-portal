import {
  IUpdateGame,
  GAMENAME_MAX_LENGTH,
  GAMENAME_MIN_LENGTH,
  GameStatus,
  gameStatuses
} from '@gp/shared';
import { Expose } from 'class-transformer';
import { IsEnum, IsString, Length } from 'class-validator';
import { serializationGroups } from 'src/core/core.constants';
import { IsUniqueGame } from '../decorators/is-unique-game.decorator';

export class UpdateGameDto implements IUpdateGame {
  @IsString()
  @Length(GAMENAME_MIN_LENGTH, GAMENAME_MAX_LENGTH)
  @IsUniqueGame()
  name: string;

  @IsString()
  @IsUniqueGame()
  appUrl: string;

  @Expose({
    groups: [serializationGroups.ADMIN]
  })
  @IsEnum(gameStatuses)
  status: GameStatus;
}
