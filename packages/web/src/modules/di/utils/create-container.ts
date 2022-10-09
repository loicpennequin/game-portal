import {
  AwilixContainer,
  createContainer,
  Resolver,
  ResolveOptions,
  asValue
} from 'awilix';
import { injectables, AuthenticatedEvent } from '@/generated/injectables';

type ContainerDefinition = Record<string, Resolver<unknown>>;

type ExtractResolverType<T> = T extends Resolver<infer X> ? X : null;

interface TypedAwilixContainer<T extends ContainerDefinition>
  extends Pick<
    AwilixContainer,
    Exclude<keyof AwilixContainer, 'resolve' | 'cradle'>
  > {
  resolve<K extends keyof T>(
    key: K,
    resolveOptions?: ResolveOptions
  ): ExtractResolverType<T[K]>;
  cradle: {
    [K in keyof T]: ExtractResolverType<T[K]>;
  };
}

const createTypedContainer = <T extends ContainerDefinition>(
  registrations: T
): TypedAwilixContainer<T> => {
  const container = createContainer().register(registrations) as any;

  return container;
};

export const createEventContainer = (event: AuthenticatedEvent) => {
  return createTypedContainer({
    event: asValue(event),
    ...injectables
  }).cradle;
};

export type Container = ReturnType<typeof createEventContainer>;
