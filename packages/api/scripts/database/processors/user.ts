import { IProcessor } from 'typeorm-fixtures-cli';
import { hashSync } from 'bcrypt';

export default class UserProcessor implements IProcessor<any> {
  preProcess(name: string, object: any): any {
    return { ...object, passwordHash: hashSync('azerty', 10) };
  }
}
