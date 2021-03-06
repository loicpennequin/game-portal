import { DateString, UUID } from './types';

export interface IEntity {
  id: UUID;
  createdAt: DateString;
  updatedAt: DateString;
}
