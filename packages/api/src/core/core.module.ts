import { Module, Global } from '@nestjs/common';
import { EncryptionService } from './services/encryption.service';

@Global()
@Module({
  imports: [],
  providers: [EncryptionService],
  exports: [EncryptionService]
})
export class CoreModule {}
