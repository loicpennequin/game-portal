import z from 'zod';

export const findGameByIdDto = z.object({
  id: z.string()
});
export type FindGameByIdDto = z.infer<typeof findGameByIdDto>;
