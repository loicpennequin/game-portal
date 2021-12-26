import { applyDecorators } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { Expose, Transform } from 'class-transformer';

export const Hash = property =>
  applyDecorators(
    Expose({ toClassOnly: true }),
    Transform(
      ({ obj }) => (obj[property] ? hashSync(obj[property], 10) : undefined),
      {
        toClassOnly: true
      }
    )
  );
