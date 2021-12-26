import {
  Email,
  IUpdateUser,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  userRoles
} from '@gp/shared';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  ValidateIf
} from 'class-validator';
import { serializationGroups } from 'src/core/core.constants';
import { Hash } from '../decorators/hash.decorator';

export class UpdateUserDto implements IUpdateUser {
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: Email;

  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  @IsOptional()
  password?: string;

  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  @ValidateIf((object: UpdateUserDto) => !!object.password)
  passwordConfirm?: string;

  @Hash('password')
  passwordHash?: string;

  @Expose({
    groups: [serializationGroups.ADMIN]
  })
  @IsEnum(userRoles, { each: true })
  @IsOptional()
  roles?: userRoles[];
}
