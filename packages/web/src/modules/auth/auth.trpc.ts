import { createRouter } from '@/modules/trpc/utils/create-router';
import {
  discordSigninDto,
  emailSigninDto,
  otpSigninDto
} from '@/modules/auth/domain/auth-dtos';

export default createRouter()
  .mutation('emailSignin', {
    input: emailSigninDto,
    resolve({ ctx, input }) {
      return ctx.emailSigninUseCase(input);
    }
  })
  .mutation('oneTimePasswordSignin', {
    input: otpSigninDto,
    resolve({ ctx, input }) {
      return ctx.otpSigninUseCase(input);
    }
  })
  .mutation('discordSignin', {
    input: discordSigninDto,
    resolve({ ctx, input }) {
      return ctx.discordSigninUseCase(input.code);
    }
  })
  .mutation('refreshJwt', {
    resolve({ ctx }) {
      return ctx.refreshJwtUseCase();
    }
  })
  .mutation('logout', {
    resolve({ ctx }) {
      return ctx.logoutUseCase();
    }
  })
  .query('session', {
    resolve({ ctx }) {
      // @TODO make use case once we have dto mappers
      return ctx.event.context.session ?? null;
    }
  });
