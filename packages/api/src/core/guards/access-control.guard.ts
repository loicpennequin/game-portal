import { CanActivate, ExecutionContext, Injectable, Type } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { ACCESS_CONTROL_METADATA_KEY } from '../core.constants';
import { PolicyHandler } from '../decorators/access-control.decorator';
import { AccessControlAbilityFactory } from '../factories/access-control-ability.factory';

@Injectable()
export class AccessControlGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private acAbilityFactory: AccessControlAbilityFactory,
    private moduleRef: ModuleRef
  ) {}

  private getHandlers(context: ExecutionContext) {
    const metadata =
      this.reflector.get<Type<PolicyHandler>[]>(
        ACCESS_CONTROL_METADATA_KEY,
        context.getHandler()
      ) || [];

    return metadata.map(handlerClass => this.moduleRef.get(handlerClass));
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const policyHandlers = this.getHandlers(context);

    const ability = this.acAbilityFactory.createForUser(request, ...policyHandlers);

    return policyHandlers.every(handler => handler.handle(ability, request));
  }
}
