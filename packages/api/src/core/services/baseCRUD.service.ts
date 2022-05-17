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
import { DEFAULT_ITEMS_PER_PAGE } from '../core.constants';
import { ICrudService } from '../interfaces/crud-service.interface';

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

export abstract class BaseCRUDService<T extends BaseEntity>
  implements ICrudService<T> {
  constructor(protected readonly repository: Repository<T>) {}

  private parseFindOneOptions(options: FindOneOptions<T>): TypeormFindOneOptions<T> {
    const { relations = [], ...rest } = options;
    let { where = [] } = options;

    const filters = Object.fromEntries(
      Object.entries(rest)
        .map(([key, val]) => {
          if (!(val instanceof BaseQueryFilter)) return null;

          return [
            key,
            Raw(val.toWhereConditions(), val.toWhereConditionsVariables())
          ];
        })
        .filter(Boolean)
    );

    where = Array.isArray(where) ? where : [where];

    return {
      relations,
      where: where ? where.map(condition => ({ ...condition, ...filters })) : filters
    };
  }

  private parseFindManyOptions(
    options: FindManyOptions<T>
  ): TypeormFindManyOptions<T> {
    const { sort, page = 1, itemsPerPage = DEFAULT_ITEMS_PER_PAGE } = options;
    return {
      ...this.parseFindOneOptions(options),
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      order: sort as any
    };
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    const parsedOptions = this.parseFindManyOptions(options);

    return this.repository.find(parsedOptions);
  }

  findById(id: UUID, options: FindOneOptions<T> = {}): Promise<T> {
    return this.findOne(
      merge({}, options, {
        where: { id }
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

  addToRelation({ owner, relationName, entity }: RelationOptions) {
    return getConnection()
      .createQueryBuilder()
      .relation(this.repository.target, relationName)
      .of(owner)
      .add(entity);
  }
}
