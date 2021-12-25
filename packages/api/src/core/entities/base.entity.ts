import {
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { DateString, UUID } from '@gp/shared';
import { validateOrReject } from 'class-validator';
import { Expose } from 'class-transformer';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Expose()
  @CreateDateColumn()
  createdAt: DateString;

  @Expose()
  @UpdateDateColumn()
  updatedAt: DateString;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this, { skipMissingProperties: true });
  }

  abstract isOwnedByCurrentUser(userId: UUID);
}
