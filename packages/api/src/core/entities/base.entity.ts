import {
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Type } from 'class-transformer';
import { DateString, UUID } from '@gp/shared';
import { validateOrReject } from 'class-validator';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @CreateDateColumn()
  createdAt: DateString;

  @UpdateDateColumn()
  updatedAt: DateString;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this, { skipMissingProperties: true });
  }
}
