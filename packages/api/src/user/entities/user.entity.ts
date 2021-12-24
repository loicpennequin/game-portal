import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  userRoles,
  IUser,
  Email,
  DateString,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@gp/shared';
import {
  Length,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { BaseEntity } from 'src/core/entities/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
  tosAcceptedAt: DateString;

  @Column({
    type: 'enum',
    enum: userRoles,
    default: [userRoles.USER],
    array: true,
  })
  @IsEnum(userRoles, { each: true })
  roles: userRoles[];

  @Column({ type: 'varchar', nullable: false })
  hashedPassword: string;

  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  @IsOptional()
  password?: string;

  @BeforeInsert()
  async hashPassword() {
    const saltOrRounds = 12;
    this.hashedPassword = await bcrypt.hash(this.password, saltOrRounds);
  }

  validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
