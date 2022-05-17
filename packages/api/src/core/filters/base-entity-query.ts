import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';
import { DEFAULT_ITEMS_PER_PAGE } from '../core.constants';
import { BaseQueryFilter } from './base-query.filter';

type Sort = Record<string, 'DESC' | 'ASC'>;

export class BaseEntityQuery {
  @IsOptional()
  @IsArray()
  relations?: string[] = [];
}
