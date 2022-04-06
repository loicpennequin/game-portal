import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  UserRole,
  userRoles,
  IUser,
  Email,
  DateString,
  UUID
} from '@gp/shared';
import { Length, IsString, IsEnum, IsEmail, IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'src/core/entities/base.entity';
import { BeforeInsert, Column, Entity, OneToMany, RelationId } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Expose } from 'class-transformer';
import { serializationGroups } from 'src/core/core.constants';
import { Game } from 'src/game/entities/game.entity';
import { SerializableUser } from '../decorators/serializable-user';

@Entity()
@SerializableUser()
export class User extends BaseEntity implements IUser {
  @Expose()
  @Column({ unique: true, type: 'varchar' })
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  @IsString()
  username: string;

  @Expose({
    groups: [serializationGroups.OWNED, serializationGroups.ADMIN]
  })
  @Column({ unique: true, type: 'varchar', nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: Email;

  @Column({ type: 'varchar', nullable: false })
  passwordHash: string;

  @Column({ type: 'varchar', nullable: true })
  refreshTokenHash: string;

  @Expose({
    groups: [serializationGroups.OWNED, serializationGroups.ADMIN]
  })
  @Column({ type: 'timestamp' })
  tosAcceptedAt: DateString;

  @Expose()
  @Column({ type: 'boolean', default: false })
  isOnline: boolean;

  @Expose({
    groups: [serializationGroups.OWNED, serializationGroups.ADMIN]
  })
  @Column({
    type: 'enum',
    enum: userRoles,
    default: [userRoles.USER],
    array: true
  })
  @IsEnum(userRoles, { each: true })
  roles: UserRole[];

  @OneToMany(
    () => Game,
    game => game.owner
  )
  games: Game[];

  @Expose()
  @RelationId((user: User) => user.games)
  gamesIds: UUID[];

  @BeforeInsert()
  acceptTos() {
    this.tosAcceptedAt = new Date().toISOString();
  }

  validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }

  get isUser(): boolean {
    return this.roles.includes(userRoles.USER);
  }

  get isAdmin(): boolean {
    return this.roles.includes(userRoles.ADMIN);
  }
}
