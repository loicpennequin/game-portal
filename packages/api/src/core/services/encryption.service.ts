import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { Log } from '../decorators/log.decorator';

@Injectable()
export class EncryptionService {
  private readonly saltRounds = 12;

  @Log()
  hash(password: string): Promise<string> {
    return hash(password, this.saltRounds);
  }

  @Log()
  compare(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
