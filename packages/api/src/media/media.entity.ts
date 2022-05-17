import { IsString } from 'class-validator';
import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { Expose } from 'class-transformer';
import { Serializable } from 'src/core/decorators/serializable.decorator';
import { IMedia } from '@gp/shared';

@Entity()
@Serializable()
export class Media extends BaseEntity implements IMedia {
  @Column({ unique: true, type: 'varchar' })
  @Expose()
  @IsString()
  url: string;
}
