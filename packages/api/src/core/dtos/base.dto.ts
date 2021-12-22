import { Type } from 'class-transformer';
import { UUID } from '@gp/shared';

export abstract class BaseDto {
  id: UUID;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;
}
