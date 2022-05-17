import { UUID } from '@gp/shared';
import {
  BaseEntity,
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions
} from 'typeorm';

export type RelationOptions = {
  owner: UUID | BaseEntity;
  relationName: string;
  entity: UUID | BaseEntity;
};

export interface ICrudService<T> {
  findAll(options?: FindManyOptions<T>): Promise<T[]>;

  findById(id: UUID, options?: FindOneOptions<T>): Promise<T>;

  findByIds(ids: UUID[], options?: FindManyOptions<T>): Promise<T[]>;

  findOne(options?: FindOneOptions<T>): Promise<T>;

  count(options: FindManyOptions<T>): Promise<number>;

  delete(id: UUID): Promise<DeleteResult>;

  create(entity: DeepPartial<T>): Promise<T>;

  updateById(id: UUID, entity: DeepPartial<T>): Promise<T>;

  addToRelation({ owner, relationName, entity }: RelationOptions): Promise<void>;
}
