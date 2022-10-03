import chalk from 'chalk';

export const prismaLogger = (...args: any[]) => {
  console.log(chalk.magenta('[PRISMA]'), ' - ', ...args);
};
