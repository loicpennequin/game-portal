import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  userRoles,
  IUser,
  Email,
} from '@gp/shared';
import { Length, IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity implements IUser {
  @Column({ unique: true, type: 'varchar' })
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  @IsString()
  username: string;

  @Column({ unique: true, type: 'varchar', nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: Email;

  @IsNotEmpty()
  @Column('varchar')
  passwordHash: string;

  @Column({ type: 'timestamp' })
  tosAcceptedAt: Date;

  @Column({
    type: 'enum',
    enum: userRoles,
    default: [userRoles.USER],
    array: true,
  })
  @IsEnum(userRoles, { each: true })
  roles: userRoles[];
}
