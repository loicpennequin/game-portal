import { AuthenticatedEvent } from '~~/src/modules/core/utils/types';
import {
  Container,
  createEventContainer
} from '~~/src/modules/di/utils/create-container';

export const createContext = (event: AuthenticatedEvent) => {
  return createEventContainer(event);
};

export type Context = Container;
