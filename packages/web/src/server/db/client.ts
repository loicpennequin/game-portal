import { PrismaClient } from '@prisma/client';
import { prismaLogger } from '~~/src/utils/loggers';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();

  prismaLogger(`${params.model}.${params.action} - ${after - before}ms`);
  return result;
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
