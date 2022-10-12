import { Entries } from '~~/src/utils/types';

export function objectEntries<T extends object>(t: T): Entries<T>[] {
  return Object.entries(t) as any;
}
