import { getCookie, setCookie } from 'h3';
import { TRPCError } from '@trpc/server';
import { createRouter } from '@/modules/trpc/utils/create-router';
import {
  emailSigninDto,
  tokenSigninDto
} from '@/modules/auth/domain/auth-dtos';

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
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      setCookie(ctx.event, 'refresh-token', refreshToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        httpOnly: true
      });

      return { accessToken };
    }
  })
  .mutation('refreshJwt', {
    async resolve({ ctx }) {
      const refreshTokenCookie = getCookie(ctx.event, 'refresh-token');
      if (!refreshTokenCookie) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const { accessToken, refreshToken } = await ctx.authService.refreshJWT(
        refreshTokenCookie
      );

      setCookie(ctx.event, 'access-token', accessToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      setCookie(ctx.event, 'refresh-token', refreshToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        httpOnly: true
      });

      return { accessToken };
    }
  });
