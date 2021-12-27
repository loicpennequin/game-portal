import {
  Email,
  ICreateUser,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEXP,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH
} from '@gp/shared';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches
} from 'class-validator';
import { validationGroups } from 'src/core/core.constants';
import { PropertyMatch } from 'src/core/decorators/property-match.decorator';
import { Hash } from '../decorators/hash.decorator';
import { IsUniqueUser } from '../decorators/is-unique-user.decorator';

export class CreateUserDto implements ICreateUser {
  @IsString()
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  @IsUniqueUser()
  username: string;

  @IsEmail()
  @IsUniqueUser()
  email: Email;

  @IsString()
  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  @Matches(PASSWORD_REGEXP)
  password: string;

  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  @PropertyMatch('password')
  passwordConfirm: string;

  @Hash('password')
  passwordHash?: string;

  @IsBoolean({ groups: [validationGroups.CREATE] })
  hasAcceptedTos: boolean;
}
