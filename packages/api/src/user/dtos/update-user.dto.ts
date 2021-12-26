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
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { serializationGroups } from 'src/core/core.constants';

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
  @IsOptional()
  passwordConfirm?: string;

  @Expose({
    groups: [serializationGroups.ADMIN]
  })
  @IsEnum(userRoles, { each: true })
  @IsOptional()
  roles?: userRoles[];
}
