// ~/server/middleware/proxy.ts
import { defineEventHandler } from 'h3';
import { AuthenticatedEvent } from '~~/src/modules/core/utils/types';
import { createEventContainer } from '~~/src/modules/di/utils/create-container';

export default defineEventHandler(async event => {
  const container = createEventContainer(event as AuthenticatedEvent);

  await container.authenticateRequestUseCase();
});
