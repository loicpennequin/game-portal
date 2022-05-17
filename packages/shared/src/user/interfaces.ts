import { IMedia } from 'src/media';
import { UserRole } from '../enums';
import { IEntity } from '../interfaces';
import { DateString, Email, Maybe } from '../types';

type UserEditableFields = {
  username: string;
  email: Maybe<Email>;
  roles: UserRole[];
};

type PasswordFields = {
  password: string;
  passwordConfirm: string;
};

export interface IUser extends IEntity, UserEditableFields {
  tosAcceptedAt: DateString;
  avatar: Maybe<IMedia>;
  isOnline: boolean;
}

export interface ICreateUser extends PasswordFields {
  username: string;
  email: Email;
  hasAcceptedTos: boolean;
}

export type IUpdateUser = Partial<UserEditableFields> &
  Partial<PasswordFields> & {
    avatar?: Blob;
  };
