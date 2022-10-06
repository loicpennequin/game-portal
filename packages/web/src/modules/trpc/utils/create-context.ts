import { CompatibilityEvent } from 'h3';
// import { Container, createEventContainer } from '../../app/utils/di';

import { client } from '@gp/db/client';

// export const createContext = (event: CompatibilityEvent): Container =>
//   createEventContainer(event);

export const createContext = (event: CompatibilityEvent) => {
  return {
    event,
    db: client
  };
};

export type Context = ReturnType<typeof createContext>;
