import z from 'zod';

export const emailSigninDto = z.object({
  email: z.string().email().trim()
});
export type EmailSigninDto = z.infer<typeof emailSigninDto>;

export const otpSigninDto = z.object({
  token: z.string()
});
export type OtpSigninDto = z.infer<typeof otpSigninDto>;

export const discordSigninDto = z.object({
  code: z.string()
});
export type DiscordSigninDto = z.infer<typeof discordSigninDto>;
