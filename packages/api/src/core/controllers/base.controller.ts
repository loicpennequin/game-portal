import { ObjectLiteral } from '@gp/shared';
import { UseInterceptors, UsePipes } from '@nestjs/common';
import { isNil, omitBy } from 'lodash';
import { FindOperator, ILike } from 'typeorm';
import { SerializerInterceptor } from '../interceptors/serializer.interceptor';
import { ValidationPipe } from '../pipes/validation.pipe';

@UsePipes(ValidationPipe)
@UseInterceptors(SerializerInterceptor)
export abstract class BaseController {
  mapQueryToFilters(query: ObjectLiteral): Record<string, FindOperator<string>> {
    return omitBy(
      Object.fromEntries(
        Object.entries(query).map(([k, v]) => [k, v && ILike(`%${v}%`)])
      ),
      isNil
    );
  }
}
