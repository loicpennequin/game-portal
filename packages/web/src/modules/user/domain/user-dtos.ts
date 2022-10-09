import z from 'zod';
import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH
} from '~~/src/modules/user/domain/user-constants';

export const userOnboardingDto = z.object({
  username: z.string().trim().min(USERNAME_MIN_LENGTH).max(USERNAME_MAX_LENGTH)
});

export type UserOnboardingDto = z.infer<typeof userOnboardingDto>;
