import { Constructor, UserRole } from '@gp/shared';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  accessControlPolicies,
  ACCESS_CONTROL_METADATA_KEY
} from '../auth.constants';

export type AccessControlMetadata = {
  roles?: {
    [k in UserRole]?: accessControlPolicies;
  };
  isOwn?: (req: any) => boolean | Promise<boolean>;
  bodyDtoClass?: Constructor<any>;
};

@Injectable()
export class AccessControlGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.user) return false;

    const { roles = {}, isOwn } = this.reflector.getAllAndOverride<
      AccessControlMetadata
    >(ACCESS_CONTROL_METADATA_KEY, [context.getHandler(), context.getClass()]);

    const isOwnResource = (await isOwn?.(req)) ?? false;
    if (!isOwnResource && Object.keys(roles).length === 0) return true;

    const { user } = req;

    return Object.entries(roles).some(([role, policy]) => {
      if (!user.roles.includes(role)) return false;

      return policy === accessControlPolicies.OWN ? isOwnResource : true;
    });
  }
}
