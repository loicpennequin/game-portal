import { UUID } from './types';

export interface IEntity {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
}
