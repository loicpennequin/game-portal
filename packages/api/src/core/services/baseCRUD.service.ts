import { NotFoundException, Type } from '@nestjs/common';
import {
  Repository,
  DeleteResult,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  getConnection,
} from 'typeorm';
import { Log } from 'src/core/decorators/log.decorator';
import { UUID } from '@gp/shared';
import { BaseEntity } from '../entities/base.entity';

export type OptionsMapperOptions = {
  path?: string;
  type?: Type<BaseEntity>;
};

export type AddRelationOptions = {
  ownerClass: Type<BaseEntity>;
  owner: BaseEntity;
  relationName: string;
  entity: UUID | BaseEntity;
};

export abstract class BaseCRUDService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  @Log()
  findAll(options?: FindManyOptions): Promise<T[]> {
    return this.repository.find(options);
  }

  @Log()
  findById(id: UUID, options: FindOneOptions<T> = {}): Promise<T> {
    return this.findOne({
      where: { id },
      ...options,
    });
  }

  @Log()
  findByIds(ids: UUID[], options: FindManyOptions<T> = {}): Promise<T[]> {
    return this.repository.findByIds(ids, options);
  }

  @Log()
  async findOne(options: FindOneOptions = {}): Promise<T> {
    try {
      return await this.repository.findOneOrFail(options);
    } catch (err) {
      console.log(err);
      throw new NotFoundException();
    }
  }

  @Log()
  delete(id: UUID): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  @Log()
  async create(
    entity: DeepPartial<T>,
    options: FindOneOptions = {},
  ): Promise<T> {
    const result = await this.repository.create(entity).save();

    return this.findById(result.id, options);
  }

  @Log()
  async updateById(
    id: UUID,
    entity: DeepPartial<T>,
    options: FindOneOptions = {},
  ): Promise<T> {
    await this.repository.create({ id, ...entity }).save();

    return this.findById(id, options);
  }

  @Log()
  addToRelation({
    ownerClass,
    owner,
    relationName,
    entity,
  }: AddRelationOptions) {
    return getConnection()
      .createQueryBuilder()
      .relation(ownerClass, relationName)
      .of(owner)
      .add(entity);
  }
}
