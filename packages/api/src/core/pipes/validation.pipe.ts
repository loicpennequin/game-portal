import {
  ArgumentMetadata,
  Inject,
  Type,
  ValidationPipe as NestValidationPipe
} from '@nestjs/common';
import { ModuleRef, Reflector, REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { VALIDATION_GROUPS_METADATA_KEY } from '../core.constants';

export type MaybeAuthenticatedRequest = Request & { user?: User };
export type ValidationGroupsHandlerCallback<T = unknown> = (
  entity: T,
  request: MaybeAuthenticatedRequest
) => Promise<string[]>;

export interface IValidationGroupsHandler<T = unknown> {
  handle?: ValidationGroupsHandlerCallback<T>;
}

export type ValidationGroupsHandler =
  | Type<IValidationGroupsHandler>
  | ValidationGroupsHandlerCallback;

export class ValidationPipe extends NestValidationPipe {
  constructor(
    protected readonly moduleRef: ModuleRef,
    protected readonly reflector: Reflector,
    @Inject(REQUEST) protected request: MaybeAuthenticatedRequest
  ) {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {}
    });
  }

  private getHandler(
    handlerOrModuleRef: ValidationGroupsHandler
  ): ValidationGroupsHandlerCallback {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const ref = this.moduleRef.get(handlerOrModuleRef);

      return ref.handle;
    } catch {
      return handlerOrModuleRef as ValidationGroupsHandlerCallback;
    }
  }

  private async getValidationGroups(value: any, metadata: ArgumentMetadata) {
    this.transformOptions.groups = this.request.user?.roles ?? [];

    const handler = this.reflector.get<ValidationGroupsHandler>(
      VALIDATION_GROUPS_METADATA_KEY,
      metadata.metatype
    );

    if (handler) {
      const groups = await this.getHandler(handler)(value, this.request);
      this.transformOptions.groups.push(...groups);
    }
  }

  public async transform(value: any, metadata: ArgumentMetadata) {
    await this.getValidationGroups(value, metadata);

    return super.transform(value, metadata);
  }
}
