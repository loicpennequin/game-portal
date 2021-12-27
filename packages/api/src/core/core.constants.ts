import { userRoles } from '@gp/shared';

export const IMMUTABLE_ENTITY_PROPERTIES = ['id', 'createdAt', 'updatedAt'];

export const DEFAULT_ITEMS_PER_PAGE = 30;

export const serializationGroups = {
  [userRoles.USER]: userRoles.USER,
  [userRoles.ADMIN]: userRoles.ADMIN,
  OWNED: 'OWNED'
};

export const validationGroups = {
  CREATE: 'create',
  UPDATE: 'update'
};
