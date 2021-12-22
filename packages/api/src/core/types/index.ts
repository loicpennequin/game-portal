import { Response } from 'express';
import { IAuthenticatedRequest } from 'src/app';

export interface IEntityQueryOptions {
  sort?: { key: string; direction: 'ASC' | 'DESC' };
}

export interface ICollectionQueryOptions extends IEntityQueryOptions {
  pagination?: {
    page?: number;
    itemsPerPage?: number;
  };
}
