import { CompatibilityEvent } from 'h3';
import {
  Container,
  createEventContainer
} from '~~/src/modules/di/utils/create-container';

export const createContext = (event: CompatibilityEvent) => {
  return createEventContainer(event);
};

export type Context = Container;
