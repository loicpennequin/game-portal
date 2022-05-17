import { Module, Global } from '@nestjs/common';
import { AccessControlAbilityFactory } from './factories/access-control-ability.factory';
import { SerializerInterceptor } from './interceptors/serializer.interceptor';

@Global()
@Module({
  providers: [SerializerInterceptor, AccessControlAbilityFactory],
  exports: [AccessControlAbilityFactory]
})
export class CoreModule {}
