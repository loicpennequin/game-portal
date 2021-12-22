/* eslint-disable max-classes-per-file */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { BaseCRUDService } from './baseCRUD.service';

class TestEntity extends BaseEntity {
  foo: boolean;
}
export class TestService extends BaseCRUDService<TestEntity> {
  constructor(
    @InjectRepository(TestEntity)
    repository: Repository<TestEntity>,
  ) {
    super(repository);
  }
}

async function setup() {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      TestService,
      {
        provide: getRepositoryToken(TestEntity),
        useClass: Repository,
      },
    ],
  }).compile();

  const service = module.get<TestService>(TestService);
  const repository = module.get<Repository<TestEntity>>(
    getRepositoryToken(TestEntity),
  );

  return { module, service, repository };
}

describe('findAll', () => {
  it('should return all results', async () => {
    const { repository, service } = await setup();
    jest
      .spyOn(repository, 'find')
      .mockResolvedValueOnce([{ foo: true } as TestEntity]);
    const result = await service.findAll();

    expect(result).toBeArray();
    expect(result.length).toBe(1);
    expect(result[0]).toContainKeys(['foo']);
  });
});

describe('findOne', () => {
  it('should return the found result', async () => {
    const { repository, service } = await setup();
    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValueOnce({ foo: true } as TestEntity);
    const result = await service.findOne();

    expect(result).toContainKeys(['foo']);
  });

  it('should throw a NotFoundException if no entity is found', async () => {
    const { repository, service } = await setup();
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
    expect(service.findOne()).rejects.toThrow(NotFoundException);
  });
});
