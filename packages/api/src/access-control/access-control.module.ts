import { Global, Module } from '@nestjs/common';
import { AccessControlAbilityFactory } from './factories/access-control-ability.factory';

@Global()
@Module({
  providers: [AccessControlAbilityFactory],
  exports: [AccessControlAbilityFactory]
})
export class AccessControlModule {}
