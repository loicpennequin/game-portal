import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import { Config } from '~~/src/generated/injectables';
import { FIFTEEN_MINUTES_IN_SECONDS } from '~~/src/utils/time-helpers';

type Injected = {
  config: Config;
};

export default ({ config }: Injected) => {
  const SALT_ROUNDS = 10;

  return {
    generateOneTimePassword(email: string) {
      const password = crypto.randomBytes(20).toString('hex');

      return {
        toHash: () => {
          return hash(password, SALT_ROUNDS);
        },

        toJwt() {
          return jwt.sign({ email, password }, config.jwtSecret, {
            expiresIn: FIFTEEN_MINUTES_IN_SECONDS
          });
        }
      };
    },

    generateJWT: (userId: string) => {
      return jwt.sign({ sub: userId }, config.jwtSecret, {
        expiresIn: FIFTEEN_MINUTES_IN_SECONDS
      });
    },

    verifyJwt(token: string) {
      return jwt.verify(token, config.jwtSecret);
    },

    generateRefreshToken: () => {
      return jwt.sign(
        { sub: crypto.randomBytes(20).toString('hex') },
        config.refreshTokenSecret,
        {
          expiresIn: 7 * 24 * 60 * 60 // 1 week,
        }
      );
    },

    hash(str: string) {
      return hash(str, SALT_ROUNDS);
    },

    compare(str: string, hashed: string) {
      return compare(str, hashed);
    }
  };
};
