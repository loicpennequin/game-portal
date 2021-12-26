import { NotFoundException, Type } from '@nestjs/common';
import {
  Repository,
  DeleteResult,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  getConnection
} from 'typeorm';
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

  findAll(options?: FindManyOptions): Promise<T[]> {
    return this.repository.find(options);
  }

  findById(id: UUID, options: FindOneOptions<T> = {}): Promise<T> {
    return this.findOne({
      where: { id },
      ...options
    });
  }

  findByIds(ids: UUID[], options: FindManyOptions<T> = {}): Promise<T[]> {
    return this.repository.findByIds(ids, options);
  }

  async findOne(options: FindOneOptions = {}): Promise<T> {
    try {
      return await this.repository.findOneOrFail(options);
    } catch (err) {
      console.log(err);
      throw new NotFoundException();
    }
  }

  count(options: FindManyOptions<T>) {
    return this.repository.count(options);
  }

  delete(id: UUID): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async create(entity: DeepPartial<T>, options: FindOneOptions = {}): Promise<T> {
    const result = await this.repository.create(entity).save();

    return this.findById(result.id, options);
  }

  async updateById(
    id: UUID,
    entity: DeepPartial<T>,
    options: FindOneOptions = {}
  ): Promise<T> {
    await this.repository.create({ id, ...entity }).save();

    return this.findById(id, options);
  }

  addToRelation({ ownerClass, owner, relationName, entity }: AddRelationOptions) {
    return getConnection()
      .createQueryBuilder()
      .relation(ownerClass, relationName)
      .of(owner)
      .add(entity);
  }
}
