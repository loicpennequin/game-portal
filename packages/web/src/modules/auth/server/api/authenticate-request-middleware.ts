// ~/server/middleware/proxy.ts
import chalk from 'chalk';
import { defineEventHandler } from 'h3';
import { AuthenticatedEvent } from '~~/src/modules/core/utils/types';
import { createEventContainer } from '~~/src/modules/di/utils/create-container';

const EXCLUDED_URLS = ['/api/trpc/auth.refreshJwt'] as const;

const normalizeRequestHeaders = (headers: any) => {
  if (headers instanceof Headers) {
    // when the function is called directly from a $fetch called server side, the headers can be an instanfe of Headers
    // we need to normalize them to a plain object
    return Object.fromEntries(headers.entries());
  }

  return headers;
};

export default defineEventHandler(async event => {
  if (!event.req.url?.startsWith('/api')) return;

  const isExcluded = EXCLUDED_URLS.some(url => event.req.url?.startsWith(url));
  if (isExcluded) return;

  event.req.headers = normalizeRequestHeaders(event.req.headers);
  const container = createEventContainer(event as AuthenticatedEvent);

  try {
    await container.authenticateRequestUseCase();
  } catch (err) {
    console.log(chalk.red('error while authenticating user', err));
  }
});
