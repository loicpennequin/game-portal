import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  userRoles,
  IUser,
  Email,
  DateString,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  UUID
} from '@gp/shared';
import {
  Length,
  IsString,
  IsEnum,
  IsOptional,
  IsEmail,
  IsNotEmpty
} from 'class-validator';
import { BaseEntity } from 'src/core/entities/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Expose } from 'class-transformer';
import { serializationGroups } from 'src/core/core.constants';

@Entity()
export class User extends BaseEntity implements IUser {
  @Expose()
  @Column({ unique: true, type: 'varchar' })
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  @IsString()
  username: string;

  @Expose({
    groups: [serializationGroups.OWNED]
  })
  @Column({ unique: true, type: 'varchar', nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: Email;

  @Column({ type: 'varchar', nullable: false })
  hashedPassword: string;

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
  roles: userRoles[];

  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  @IsOptional()
  password?: string;

  isOwnedByCurrentUser(userId: UUID) {
    return userId === this.id;
  }

  @BeforeInsert()
  acceptTos() {
    this.tosAcceptedAt = new Date().toISOString();
  }

  @BeforeInsert()
  async hashPassword() {
    const saltOrRounds = 12;
    this.hashedPassword = await bcrypt.hash(this.password, saltOrRounds);
  }

  validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.hashedPassword);
  }
}
