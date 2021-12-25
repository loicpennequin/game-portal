import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ACCESS_CONTROL_METADATA_KEY } from '../auth.constants';
import {
  AccessControlGuard,
  AccessControlMetadata,
} from '../guards/access-control.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export function AccessControl(options: AccessControlMetadata) {
  return applyDecorators(
    SetMetadata(ACCESS_CONTROL_METADATA_KEY, options),
    UseGuards(JwtAuthGuard, AccessControlGuard),
  );
}
