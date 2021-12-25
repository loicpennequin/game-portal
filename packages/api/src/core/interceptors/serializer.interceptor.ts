import { ObjectLiteral } from '@gp/shared';
import {
  CallHandler,
  ClassSerializerInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';
import { isFunction } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/user/entities/user.entity';
import { isObject } from '../utils/assertions';

export class SerializerInterceptor extends ClassSerializerInterceptor {
  protected defaultOptions: ClassTransformOptions = { strategy: 'excludeAll' };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextOptions = this.getContextOptions(context);
    const request = context.switchToHttp().getRequest();

    const options = {
      ...this.defaultOptions,
      ...contextOptions,
      groups: request.user?.roles || [],
      user: request.user,
    };
    return next.handle().pipe(
      map((res: any | Array<any>) => {
        return this.serialize(res, options);
      }),
    );
  }

  serialize(
    response: ObjectLiteral | Array<ObjectLiteral>,
    options: ClassTransformOptions & { user?: User },
  ): ObjectLiteral | Array<ObjectLiteral> {
    if (!isObject(response)) {
      return response;
    }

    const getOptions = entity => {
      if (isFunction(entity.isOwnedByBurrentUser)) return options;
      if (entity.isOwnedByCurrentUser(options.user)) return options;

      return {
        ...options,
        groups: [...options.groups, 'owned'],
      };
    };

    return Array.isArray(response)
      ? response.map(item => this.transformToPlain(item, getOptions(item)))
      : this.transformToPlain(response, getOptions(response));
  }
}
