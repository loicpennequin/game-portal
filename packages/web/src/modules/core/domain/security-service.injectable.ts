import crypto from 'crypto';
import { hash, compare } from 'bcrypt';

export default () => {
  const SALT_ROUNDS = 10;

  return {
    generateRandomString(length: number = 20) {
      return crypto.randomBytes(length).toString('hex');
    },

    hash(str: string) {
      return hash(str, SALT_ROUNDS);
    },

    compare(str: string, hashed: string) {
      return compare(str, hashed);
    }
  };
};
