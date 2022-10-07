import { createRouter } from '@/modules/trpc/utils/create-router';
import { emailSigninDto } from '@/modules/auth/domain/auth-dtos';

export default createRouter().mutation('emailSignin', {
  input: emailSigninDto,
  async resolve({ ctx, input }) {
    await ctx.authService.signInByEmail(input.email);
    return true;
  }
});
