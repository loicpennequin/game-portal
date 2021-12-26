import { UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { SerializerInterceptor } from 'src/core/interceptors/serializer.interceptor';

@UseInterceptors(SerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export abstract class BaseController {}
