import z from 'zod';

export const emailSigninDto = z.object({
  email: z.string().email().trim()
});
export type EmailSigninDto = z.infer<typeof emailSigninDto>;

export const tokenSigninDto = z.object({
  token: z.string()
});
export type TokenSigninDto = z.infer<typeof tokenSigninDto>;
