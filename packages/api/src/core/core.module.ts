import { Module, Global } from '@nestjs/common';
import { SerializerInterceptor } from './interceptors/serializer.interceptor';

@Global()
@Module({
  providers: [SerializerInterceptor]
})
export class CoreModule {}
