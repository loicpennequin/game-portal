// ~/server/trpc/index.ts
import type { inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';
import type { CompatibilityEvent } from 'h3';
import { prisma } from '~~/src/server/db/client';

export const createContext = (event: CompatibilityEvent) => {
  return {
    req: event.req,
    res: event.res,
    db: prisma
  };
};

export const router = trpc
  .router<inferAsyncReturnType<typeof createContext>>()
  // queries and mutations...
  .query('getExample', {
    resolve({ ctx }) {
      return ctx.db.example.findMany();
    }
  });
