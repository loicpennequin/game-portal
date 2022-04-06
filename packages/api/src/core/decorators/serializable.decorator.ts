import { applyDecorators, SetMetadata } from '@nestjs/common';
import { SerializationPolicyHandler } from '../interceptors/serializer.interceptor';
import { SERIALIZER_METADATA_KEY } from '../core.constants';

export function Serializable(options: SerializationPolicyHandler) {
  return applyDecorators(SetMetadata(SERIALIZER_METADATA_KEY, options));
}
