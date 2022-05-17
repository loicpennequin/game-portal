import { ICreateGame, GAMENAME_MAX_LENGTH, GAMENAME_MIN_LENGTH } from '@gp/shared';
import { IsString, Length } from 'class-validator';
import { IsUniqueGame } from '../decorators/is-unique-game.decorator';

export class CreateGameDto implements ICreateGame {
  @IsString()
  @Length(GAMENAME_MIN_LENGTH, GAMENAME_MAX_LENGTH)
  @IsUniqueGame()
  name: string;

  @IsString()
  @IsUniqueGame()
  appUrl: string;
}
