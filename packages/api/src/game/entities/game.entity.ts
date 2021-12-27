import {
  gameStatus,
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

@Entity()
export class Game extends BaseEntity implements IGame {
  @Expose()
  @Column({ unique: true, type: 'varchar' })
  @IsString()
  name: string;

  @Expose()
  @Column({ unique: true, type: 'varchar' })
  @IsString()
  appUrl: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  @Min(GAME_MIN_RATING)
  @Max(GAME_MAX_RATING)
  rating: number;

  @Column({
    type: 'enum',
    enum: gameStatus,
    default: gameStatus.PENDING
  })
  @IsEnum(gameStatus)
  status: gameStatus;

  @ManyToOne(
    () => User,
    user => user.games
  )
  owner: User;

  @RelationId((game: Game) => game.owner)
  ownerId: UUID;

  isOwnedByCurrentUser(userId: UUID) {
    return userId === this.ownerId;
  }
}
