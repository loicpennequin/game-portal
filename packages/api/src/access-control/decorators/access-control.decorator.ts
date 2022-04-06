import { applyDecorators, SetMetadata, Type, UseGuards } from '@nestjs/common';
import { ACCESS_CONTROL_METADATA_KEY } from '../access-control.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AppAbility } from '../factories/access-control-ability.factory';
import { AccessControlGuard } from '../guards/access-control.guard';
import { MaybeAuthenticatedRequest } from 'src/core/pipes/validation.pipe';

export interface IPolicyHandler {
  register?(options: any): void;
  handle(ability: AppAbility, request: MaybeAuthenticatedRequest): boolean;
}

export type PolicyHandler = IPolicyHandler;

export function AccessControl(...policyHandlers: Type<PolicyHandler>[]) {
  return applyDecorators(
    SetMetadata(ACCESS_CONTROL_METADATA_KEY, policyHandlers),
    UseGuards(JwtAuthGuard, AccessControlGuard)
  );
}
