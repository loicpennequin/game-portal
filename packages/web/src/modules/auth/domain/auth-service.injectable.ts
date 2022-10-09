import { TRPCError } from '@trpc/server';
import { JwtPayload } from 'jsonwebtoken';
import { Db, EncryptionService } from '~~/src/generated/injectables';

type Injected = {
  db: Db;
  encryptionService: EncryptionService;
};

export default ({ db, encryptionService }: Injected) => {
  return {
    async getOneTimePasswordByEmail(email: string) {
      const otp = encryptionService.generateOneTimePassword(email);
      const hash = await otp.toHash();
      await db.user.upsert({
        where: { email },
        create: {
          email,
          oneTimePassword: hash
        },
        update: {
          oneTimePassword: hash
        }
      });

      return otp;
    },

    async signInWithOneTimePassword(jwt: string) {
      const payload = encryptionService.verifyJwt(jwt) as JwtPayload;
      const { email, password } = payload;

      const user = await db.user.findUnique({ where: { email } });
      const isValid =
        user &&
        user.oneTimePassword &&
        (await encryptionService.compare(password, user.oneTimePassword));

      if (!isValid) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const tokens = {
        accessToken: encryptionService.generateJWT(user.id),
        refreshToken: encryptionService.generateRefreshToken()
      };

      await db.user.update({
        where: { email },
        data: { oneTimePassword: null, refreshToken: tokens.refreshToken }
      });

      return tokens;
    },

    async signInWithDiscordId(discordId: string) {
      const user = await db.user.findUnique({ where: { discordId } });
      if (!user) throw new TRPCError({ code: 'NOT_FOUND' });

      const tokens = {
        accessToken: encryptionService.generateJWT(user.id),
        refreshToken: encryptionService.generateRefreshToken()
      };

      await db.user.update({
        where: { discordId },
        data: { refreshToken: tokens.refreshToken }
      });
      return tokens;
    },

    async refreshJWT(refreshToken: string) {
      const user = await db.user.findUnique({ where: { refreshToken } });
      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      try {
        encryptionService.verifyRefreshToken(refreshToken);
      } catch {
        await db.user.update({
          where: { id: user.id },
          data: { refreshToken: null }
        });

        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const tokens = {
        accessToken: encryptionService.generateJWT(user.id),
        refreshToken: encryptionService.generateRefreshToken()
      };

      await db.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken }
      });

      return tokens;
    },

    logout(userId: string) {
      return db.user.update({
        where: {
          id: userId
        },
        data: {
          refreshToken: null
        }
      });
    }
  };
};
