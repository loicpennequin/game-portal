import { IsEmail, IsOptional } from 'class-validator';
import { BaseQueryFilter } from 'src/core/filters/base-query.filter';
import { Expose, Type } from 'class-transformer';
import { serializationGroups } from 'src/core/core.constants';

export class FindAllUsersQuery {
  @IsOptional()
  @Type(() => BaseQueryFilter)
  username?: BaseQueryFilter;

  @IsOptional()
  @Type(() => BaseQueryFilter)
  @Expose({ groups: [serializationGroups.ADMIN, serializationGroups.OWNED] })
  email?: BaseQueryFilter;
}
