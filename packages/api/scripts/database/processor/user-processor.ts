import { User } from 'src/user/entities/user.entity';
import { IProcessor } from 'typeorm-fixtures-cli';
import { hashSync } from 'bcrypt';

export default class UserProcessor implements IProcessor<User> {
  postProcess(name: string, object: { [key: string]: any }): void {
    object.passwordHash = hashSync('azerty', 12);
  }
}
