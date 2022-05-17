import { IsOptional } from 'class-validator';
import { BaseQueryFilter } from 'src/core/filters/base-query.filter';
import { Expose, Type } from 'class-transformer';
import { serializationGroups } from 'src/core/core.constants';
import { BaseCollectionQuery } from 'src/core/filters/base-collection-query';

export class FindAllGamesQuery extends BaseCollectionQuery {
  @IsOptional()
  @Type(() => BaseQueryFilter)
  name?: BaseQueryFilter;

  @IsOptional()
  @Type(() => BaseQueryFilter)
  rating?: BaseQueryFilter;

  @IsOptional()
  @Type(() => BaseQueryFilter)
  @Expose({ groups: [serializationGroups.ADMIN] })
  status?: BaseQueryFilter;
}
