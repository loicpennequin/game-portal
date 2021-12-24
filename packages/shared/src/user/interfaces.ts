import { userRoles } from '../enums';
import { IEntity } from '../interfaces';
import { DateString, Email, Maybe } from '../types';

export interface IUser extends IEntity {
  username: string;
  email: Maybe<Email>;
  tosAcceptedAt: DateString;
  roles: userRoles[];
}

export interface ICreateUser {
  username: string;
  email: Email;
  password: string;
  passwordConfirm: string;
  tosAcceptedAt: DateString;
}

export type IUpdateUser = Partial<Omit<IUser, 'tosAcceptedAt'>> &
  Partial<Pick<ICreateUser, 'password' | 'passwordConfirm'>>;
