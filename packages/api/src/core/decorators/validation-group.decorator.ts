import { applyDecorators, SetMetadata } from '@nestjs/common';
import { VALIDATION_GROUPS_METADATA_KEY } from '../core.constants';
import { ValidationGroupsHandler } from '../pipes/validation.pipe';

export function ValidationGroups(options: ValidationGroupsHandler) {
  return applyDecorators(SetMetadata(VALIDATION_GROUPS_METADATA_KEY, options));
}
