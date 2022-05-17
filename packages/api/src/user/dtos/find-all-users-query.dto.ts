import { IsIn, IsOptional } from 'class-validator';
import { BaseQueryFilter } from 'src/core/filters/base-query.filter';
import { Expose, Type } from 'class-transformer';
import { serializationGroups } from 'src/core/core.constants';
import { BaseCollectionQuery } from 'src/core/filters/base-collection-query';

export class FindAllUsersQuery extends BaseCollectionQuery {
  @IsOptional()
  @Type(() => BaseQueryFilter)
  username?: BaseQueryFilter;

  @IsOptional()
  @Type(() => BaseQueryFilter)
  @Expose({ groups: [serializationGroups.ADMIN, serializationGroups.OWNED] })
  email?: BaseQueryFilter;

  @IsOptional()
  @IsIn([], { each: true })
  relations?: string[] = [];
}
