import {
  Email,
  IUpdateUser,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  UserRole,
  userRoles
} from '@gp/shared';
import { Expose } from 'class-transformer';
import {
  Allow,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  ValidateIf
} from 'class-validator';
import { serializationGroups } from 'src/core/core.constants';
import { ValidationGroups } from 'src/core/decorators/validation-group.decorator';
import { Hash } from '../decorators/hash.decorator';
import { IsUniqueUser } from '../decorators/is-unique-user.decorator';
import { User } from '../entities/user.entity';

@ValidationGroups(async (entity: User, { user }) =>
  [user.id === entity.id && serializationGroups.OWNED].filter(Boolean)
)
export class UpdateUserDto implements IUpdateUser {
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  @IsString()
  @IsUniqueUser()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  @IsUniqueUser()
  email?: Email;

  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  @IsOptional()
  password?: string;

  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  @ValidateIf((object: UpdateUserDto) => !!object.password)
  passwordConfirm?: string;

  @Hash('password')
  @Allow()
  passwordHash?: string;

  @Expose({
    groups: [serializationGroups.ADMIN]
  })
  @IsEnum(userRoles, { each: true })
  @IsOptional()
  roles?: UserRole[];
}
