import {
  Email,
  ICreateUser,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '@gp/shared';
import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto implements ICreateUser {
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  @IsString()
  username: string;

  @IsEmail()
  email: Email;

  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  password: string;

  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  passwordConfirm: string;

  @IsBoolean()
  hasAcceptedTos: boolean;
}
