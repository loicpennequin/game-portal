import { setCookie } from 'h3';
import { createRouter } from '@/modules/trpc/utils/create-router';
import {
  emailSigninDto,
  tokenSigninDto
} from '@/modules/auth/domain/auth-dtos';
import {
  FIFTEEN_MINUTES_IN_SECONDS,
  ONE_DAY_IN_SECONDS
} from '~~/src/utils/time-helpers';

export default createRouter()
  .mutation('emailSignin', {
    input: emailSigninDto,
    async resolve({ ctx, input }) {
      const { authService, mailService, authEmailTemplates, config } = ctx;
      const otp = await authService.getOneTimePasswordByEmail(input.email);

      mailService.sendMail({
        to: input.email,
        template: authEmailTemplates.emailSignIn({
          link: `${config.appUrl}/auth-callback?token=${otp.toJwt()}`
        })
      });

      return true;
    }
  })
  .mutation('oneTimePasswordSignin', {
    input: tokenSigninDto,
    async resolve({ ctx, input }) {
      const { accessToken, refreshToken } =
        await ctx.authService.signInWithOneTimePassword(input.token);

      setCookie(ctx.event, 'access-token', accessToken, {
        maxAge: FIFTEEN_MINUTES_IN_SECONDS,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      setCookie(ctx.event, 'refresh-token', refreshToken, {
        maxAge: ONE_DAY_IN_SECONDS * 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        httpOnly: true
      });

      return { accessToken };
    }
  });
