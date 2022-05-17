import {
  gameStatuses,
  GameStatus,
  GAME_MAX_RATING,
  GAME_MIN_RATING,
  IGame,
  UUID
} from '@gp/shared';
import { IsString, IsEnum, Min, Max } from 'class-validator';
import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { serializationGroups } from 'src/core/core.constants';
import { Serializable } from 'src/core/decorators/serializable.decorator';

@Entity()
@Serializable({
  handle(entity: Game, user: User) {
    return { isOwned: user?.id === entity.ownerId };
  }
})
export class Game extends BaseEntity implements IGame {
  @Column({ unique: true, type: 'varchar' })
  @Expose()
  @IsString()
  name: string;

  @Column({ unique: true, type: 'varchar' })
  @Expose()
  @IsString()
  appUrl: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  @Expose()
  @Min(GAME_MIN_RATING)
  @Max(GAME_MAX_RATING)
  rating: number;

  @Expose({
    groups: [serializationGroups.OWNED, serializationGroups.ADMIN]
  })
  @Column({
    type: 'enum',
    enum: gameStatuses,
    default: gameStatuses.PENDING
  })
  @IsEnum(gameStatuses)
  status: GameStatus;

  @ManyToOne(
    () => User,
    user => user.games
  )
  owner: User;

  @RelationId((game: Game) => game.owner)
  ownerId: UUID;
}
