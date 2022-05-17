import { Transform, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { DEFAULT_ITEMS_PER_PAGE } from '../core.constants';
import { BaseEntityQuery } from './base-entity-query';
import { BaseQueryFilter } from './base-query.filter';

type Sort = Record<string, 'DESC' | 'ASC'>;

export class BaseCollectionQuery extends BaseEntityQuery {
  @IsOptional()
  @Transform(({ value }) => {
    Object.entries<string>(value).forEach(([k, v]) => {
      value[k] = v.toUpperCase();
    });

    return value;
  })
  sort?: Sort;

  @IsOptional()
  @Type(() => BaseQueryFilter)
  updatedAt?: BaseQueryFilter;

  @IsOptional()
  @Type(() => BaseQueryFilter)
  createdAt?: BaseQueryFilter;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  page?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  itemsPerPage?: number = DEFAULT_ITEMS_PER_PAGE;
}
