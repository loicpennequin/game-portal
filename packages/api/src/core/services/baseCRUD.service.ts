import { NotFoundException } from '@nestjs/common';
import {
  Repository,
  DeleteResult,
  DeepPartial,
  FindOneOptions as TypeormFindOneOptions,
  FindManyOptions as TypeormFindManyOptions,
  getConnection,
  Raw
} from 'typeorm';
import { UUID } from '@gp/shared';
import { BaseEntity } from '../entities/base.entity';
import { merge } from 'lodash';
import { BaseQueryFilter } from '../filters/base-query.filter';

export type RelationOptions = {
  owner: UUID | BaseEntity;
  relationName: string;
  entity: UUID | BaseEntity;
};

export type FindOneOptions<T> = {
  relations?: TypeormFindOneOptions<T>['relations'];
  [key: string]: any;
};

export type FindManyOptions<T> = FindOneOptions<T> & {
  page?: number;
  itemsPerPage?: number;
  sort?: Record<string, 'ASC' | 'DESC'>;
};

export abstract class BaseCRUDService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  private parseFindOneOptions(options: FindOneOptions<T>): TypeormFindOneOptions<T> {
    const { relations, ...rest } = options;

    const whereConditions = Object.entries(rest)
      .map(([key, val]) => {
        if (!(val instanceof BaseQueryFilter)) return null;

        return [key, Raw(val.toWhereConditions(), val.toWhereConditionsVariables())];
      })
      .filter(Boolean);

    return {
      relations: options.relations,
      where: Object.fromEntries(whereConditions)
    };
  }

  private parseFindManyOptions(
    options: FindManyOptions<T>
  ): TypeormFindManyOptions<T> {
    const { sort, page, itemsPerPage } = options;

    return {
      ...this.parseFindOneOptions(options),
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      order: sort as any
    };
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(this.parseFindManyOptions(options));
  }

  findById(id: UUID, options: FindOneOptions<T> = {}): Promise<T> {
    const idFilter = new BaseQueryFilter();
    idFilter.eq = options.id;

    return this.findOne(
      merge(this.parseFindOneOptions(options), {
        id: idFilter
      })
    );
  }

  findByIds(ids: UUID[], options: FindManyOptions<T> = {}): Promise<T[]> {
    return this.repository.findByIds(ids, options);
  }

  async findOne(options: FindOneOptions<T> = {}): Promise<T> {
    try {
      return await this.repository.findOneOrFail(this.parseFindOneOptions(options));
    } catch (err) {
      console.log(err);
      throw new NotFoundException();
    }
  }

  count(options: FindManyOptions<T>) {
    return this.repository.count(this.parseFindManyOptions(options));
  }

  delete(id: UUID): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const result = await this.repository.create(entity).save();

    return this.findById(result.id);
  }

  async updateById(id: UUID, entity: DeepPartial<T>): Promise<T> {
    await this.repository.create({ id, ...entity }).save();

    return this.findById(id);
  }

  loadRelation({
    owner,
    relationName
  }: {
    owner: UUID | BaseEntity;
    relationName: string;
  }) {
    const query = getConnection()
      .createQueryBuilder()
      .relation(this.repository.target, relationName)
      .of(owner);

    const { relations } = this.repository.metadata;

    const relation = relations.find(
      relation => relation.propertyName === relationName
    );

    return relation.isOneToMany || relation.isManyToMany
      ? query.loadMany()
      : query.loadOne();
  }

  addToRelation({ owner, relationName, entity }: RelationOptions) {
    return getConnection()
      .createQueryBuilder()
      .relation(this.repository.target, relationName)
      .of(owner)
      .add(entity);
  }
}
