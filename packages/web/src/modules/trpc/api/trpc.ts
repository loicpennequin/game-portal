import chalk from 'chalk';
import { resolveHTTPResponse } from '@trpc/server';
import { createURL } from 'ufo';
import { isMethod } from 'h3';
import { createContext } from '../utils/create-context';
import { router } from '~~/src/generated/trpc-router';
import { AuthenticatedEvent } from '~~/src/generated/injectables';

export default defineEventHandler(async event => {
  const endpoint = '/api/trpc/';
  const { req, res } = event;
  const $url = createURL(req.url!);

  const httpResponse = await resolveHTTPResponse({
    router,
    req: {
      method: req.method!,
      headers: req.headers,
      body: isMethod(event, 'GET') ? null : await useBody(event),
      query: $url.searchParams
    },
    path: $url.pathname.substring(endpoint.length),
    createContext: () =>
      Promise.resolve(createContext(event as AuthenticatedEvent)),
    onError({ error, path }) {
      // eslint-disable-next-line no-console
      console.log(chalk.red('[ERROR]'), '-', path, '-', error.message);
      // eslint-disable-next-line no-console
      // console.error(error.cause);
    }
  });

  const { status, headers, body } = httpResponse;
  res.statusCode = status;

  headers &&
    Object.keys(headers).forEach(key => {
      res.setHeader(key, headers[key]!);
    });

  return body;
});
