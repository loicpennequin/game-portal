import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';

import { trpcLog } from './create-logger';
import { Context } from '~~/src/modules/trpc/utils/create-context';

export type TrpcRouterMeta = {
  needsAuth?: boolean;
};

export const createRouter = ({ middlewares = false } = {}) => {
  const router = trpc.router<Context, TrpcRouterMeta>();

  if (!middlewares) return router;
  return router
    .middleware(async ({ path, next }) => {
      trpcLog(`${path}`);

      const start = Date.now();
      const result = await next();
      const durationMs = Date.now() - start;
      trpcLog(`${path} - END : ${durationMs}ms`);

      return result;
    })
    .middleware(({ meta, next, ctx }) => {
      if (meta?.needsAuth && !ctx.event.context.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      return next();
    });

  // .middleware(({ meta, next, ctx }) => {
  //   if (meta?.permissions) {
  //     if (!ctx.event.context.user) throw new TRPCError({ code: 'FORBIDDEN' });

  //     const isAuthorized = hasPermission(
  //       ctx.event.context.user,
  //       meta.permissions
  //     );
  //     if (!isAuthorized) throw new TRPCError({ code: 'FORBIDDEN' });
  //   }

  //   return next();
  // })
  // .middleware(async ({ path, next }) => {
  //   if (!isRoot) return next();

  //   const result = await next();
  //   if (!result.ok) return result;

  //   if (!(result.data as any)?.__isSerialized) {
  //     trpcLog(
  //       chalk.red(
  //         `${path} - Unserialized response. You may leak sensitive data !`
  //       )
  //     );
  //   } else {
  //     trpcLog(chalk.green(`${path} - Serialization ok`));
  //   }

  //   return result;
  // })
};
