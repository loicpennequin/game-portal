import chalk from 'chalk';

export const trpcLog = (...messages: string[]) =>
  console.log(chalk.blue('[ TRPC ]'), ' - ', ...messages);
