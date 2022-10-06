import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';

// declare global {
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }

const prismaLogger = (...args: any[]) => {
  // eslint-disable-next-line no-console
  console.log(chalk.magenta('[PRISMA]'), ' - ', ...args);
};

export const client = new PrismaClient();

client.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();

  prismaLogger(`${params.model}.${params.action} - ${after - before}ms`);
  return result;
});

// if (process.env.NODE_ENV !== 'production') {
//   global.prisma = prisma;
// }
