import { Email, IUpdateUser } from '@gp/shared';

export class UpdateUserDto implements IUpdateUser {
  username?: string;

  email?: Email;

  password: string;

  passwordConfirm: string;
}
