import { ObjectLiteral } from '@gp/shared';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { ClassTransformOptions, classToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/user/entities/user.entity';
import { serializationGroups, SERIALIZER_METADATA_KEY } from '../core.constants';
import { isObject } from 'src/core/utils/assertions';
import { Reflector } from '@nestjs/core';

export type SerializeOptions = ClassTransformOptions & { user?: User };

export type SerializationPolicyHandlerCallback = (
  entity: any,
  user: User
) => { isOwned: boolean };

export interface ISerializationPolicyHandler {
  handle?: SerializationPolicyHandlerCallback;
}

export type SerializationPolicyHandler =
  | ISerializationPolicyHandler
  | SerializationPolicyHandlerCallback;

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  protected defaultOptions: ClassTransformOptions = {
    strategy: 'excludeAll',
    excludeExtraneousValues: true
  };

  constructor(protected readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const options = {
      ...this.defaultOptions,
      groups: request.user?.roles ?? [],
      user: request.user
    };

    return next.handle().pipe(
      map((res: any | Array<any>) => {
        return this.serialize(res, options);
      })
    );
  }

  private getSerializeOptions<E = any>({
    entity,
    options
  }: {
    entity: E;
    options: SerializeOptions;
  }) {
    const handler = this.reflector.get(SERIALIZER_METADATA_KEY, entity.constructor);

    const args = [entity, options.user];
    const { isOwned } = handler.handle ? handler.handle(...args) : handler(args);

    return {
      ...options,
      groups: isOwned
        ? options.groups.concat(serializationGroups.OWNED)
        : options.groups
    };
  }

  private serializeCollection(
    collection: Array<ObjectLiteral>,
    options: SerializeOptions
  ) {
    return collection.map(entity => this.serialize(entity, options));
  }

  private serialize(
    entity: ObjectLiteral | Array<ObjectLiteral>,
    options: SerializeOptions
  ): ObjectLiteral | Array<ObjectLiteral> {
    if (!isObject(entity)) return entity;

    if (Array.isArray(entity)) {
      return this.serializeCollection(entity, options);
    }

    const { user, ...serializeOptions } = this.getSerializeOptions({
      entity,
      options
    });
    return classToPlain(entity, serializeOptions);
  }
}
