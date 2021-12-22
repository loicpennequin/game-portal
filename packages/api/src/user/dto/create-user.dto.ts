import { Email, ICreateUser } from '@gp/shared';

export class CreateUserDto implements ICreateUser {
  username: string;

  email: Email;

  password: string;

  passwordConfirm: string;

  tosAcceptedAt: Date;
}
