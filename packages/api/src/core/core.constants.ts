import { userRoles } from '@gp/shared';

export const IMMUTABLE_ENTITY_PROPERTIES = ['id', 'createdAt', 'updatedAt'];

export const DEFAULT_ITEMS_PER_PAGE = 30;

export const serializationGroups = {
  USER: userRoles.USER,
  ADMIN: userRoles.ADMIN,
  OWNED: 'OWNED'
};

export const validationGroups = {
  CREATE: 'create',
  UPDATE: 'update'
};

export const SERIALIZER_METADATA_KEY = 'Serializer';
export const VALIDATION_GROUPS_METADATA_KEY = 'Validator';
