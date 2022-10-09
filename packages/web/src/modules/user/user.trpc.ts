import { createRouter } from '@/modules/trpc/utils/create-router';
import { userOnboardingDto } from '~~/src/modules/user/domain/user-dtos';

export default createRouter().mutation('onboarding', {
  input: userOnboardingDto,
  meta: { needsAuth: true },
  resolve({ ctx, input }) {
    return ctx.userOnboardingUseCase(input.username);
  }
});
