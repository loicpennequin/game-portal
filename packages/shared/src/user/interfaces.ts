import { userRoles } from '../enums';
import { IEntity } from '../interfaces';
import { Email, Maybe } from '../types';

export interface IUser extends IEntity {
  username: string;
  email: Maybe<Email>;
  tosAcceptedAt: Date;
  roles: userRoles[];
}

export interface ICreateUser {
  username: string;
  email: Email;
  password: string;
  passwordConfirm: string;
  tosAcceptedAt: Date;
}

export type IUpdateUser = Partial<Omit<IUser, 'tosAcceptedAt'>> &
  Pick<ICreateUser, 'password' | 'passwordConfirm'>;
