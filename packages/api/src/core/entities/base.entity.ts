import {
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Type } from 'class-transformer';
import { UUID } from '@gp/shared';
import { validateOrReject } from 'class-validator';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @CreateDateColumn()
  @Type(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Type(() => Date)
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this, { skipMissingProperties: true });
  }
}
