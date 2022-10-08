import { User } from '@prisma/client';
import { Maybe } from '~~/src/utils/types';

export type Session = Maybe<User>;
