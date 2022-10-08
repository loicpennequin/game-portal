import { createRouter } from '@/modules/trpc/utils/create-router';
import { emailSigninDto, otpSigninDto } from '@/modules/auth/domain/auth-dtos';

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
  .mutation('refreshJwt', {
    resolve({ ctx }) {
      return ctx.refreshJwtUseCase();
    }
  })
  .mutation('logout', {
    resolve({ ctx }) {
      return ctx.logoutUseCase();
    }
  });
