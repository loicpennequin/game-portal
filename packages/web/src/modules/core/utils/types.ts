import { CompatibilityEvent } from 'h3';
import { Session } from '~~/src/modules/auth/utils/types';

export type AuthenticatedEvent = CompatibilityEvent & {
  context: {
    session: Session;
  };
};
