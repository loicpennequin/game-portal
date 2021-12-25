import { userRoles } from '../enums';
import { IEntity } from '../interfaces';
import { DateString, Email, Maybe } from '../types';

export interface IUser extends IEntity {
  username: string;
  email: Maybe<Email>;
  tosAcceptedAt: DateString;
  roles: userRoles[];
  isOnline: boolean;
}

export interface ICreateUser {
  username: string;
  email: Email;
  password: string;
  passwordConfirm: string;
  hasAcceptedTos: boolean;
}

export type IUpdateUser = Partial<Omit<IUser, 'tosAcceptedAt'>> &
  Partial<Pick<ICreateUser, 'password' | 'passwordConfirm'>>;
