import { UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { SerializerInterceptor } from 'src/core/interceptors/serializer.interceptor';

@UseInterceptors(SerializerInterceptor)
@UsePipes(ValidationPipe)
export abstract class BaseController {}
