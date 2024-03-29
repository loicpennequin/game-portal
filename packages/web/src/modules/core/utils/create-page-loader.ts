import { QueryClient, UseQueryOptions } from '@tanstack/vue-query';
import { RouteLocationNormalized } from 'vue-router';
import { TrpcQueryOptions } from '~~/src/modules/trpc/composables/use-trpc-query';
import { PathAndInput, TrpcQueryPath } from '~~/src/modules/trpc/utils/types';
import { objectEntries } from '~~/src/utils/object-entries';

export type TrpcKeyDictionary = Record<string, TrpcQueryPath>;

type LoaderDependencies<T extends TrpcKeyDictionary> = {
  [Property in keyof T]?: ReturnType<
    typeof useTrpcQuery<T[Property], TrpcQueryOptions<T[Property]>>
  >['data']['value'];
};

export type LoaderConfig<T extends TrpcKeyDictionary> = {
  [Property in keyof T]: (
    route: RouteLocationNormalized,
    deps: Record<string, any>
  ) => {
    key: PathAndInput<T[Property]>;
    queryOptions?: UseQueryOptions;
    ssrPrefetch?: boolean;
    waitPreloadBeforeNavigation?: boolean;
  };
};

type UseTrpcQueryRecord<T extends TrpcKeyDictionary> = {
  [Property in keyof T]: ReturnType<
    typeof useTrpcQuery<T[Property], TrpcQueryOptions<T[Property]>>
  >;
};

type Loader<T extends TrpcKeyDictionary> = {
  load(): UseTrpcQueryRecord<T>;
  preload(
    route: RouteLocationNormalized,
    queryClient: QueryClient
  ): Promise<void>;
};

export const createPageLoader = <T extends TrpcKeyDictionary>(
  options: LoaderConfig<T>
): Loader<T> => {
  return {
    load() {
      const queryClient = useQueryClient();
      const route = useRoute();

      const initialRouteName = route.name;
      const resolvedData: LoaderDependencies<T> = reactive({});

      const entries: [keyof T, ReturnType<typeof useTrpcQuery>][] =
        objectEntries(options).map(([name, queryDef]) => {
          const pathAndInput = computed<any>(
            () => queryDef(route, resolvedData).key
          );

          const resolvedQueryOptions = computed<any>(() => {
            const { queryOptions = {} } = queryDef(route, resolvedData);

            return {
              ...queryOptions,
              // options can be recomputed when leaving the page, giving wrong params to the query
              enabled: route.name === initialRouteName && queryOptions.enabled,
              onSuccess(data: any) {
                // @ts-ignore
                resolvedData[name as keyof T] = data;
                return (queryOptions as any).onSuccess?.(data);
              }
            };
          });

          const query = useTrpcQuery(pathAndInput, resolvedQueryOptions as any);
          // @ts-ignore
          resolvedData[name as keyof T] = query.data.value;

          const getDependentSSRPromise = () => {
            return new Promise<void>(resolve => {
              watch(
                () => resolvedQueryOptions.value.enabled,
                async newVal => {
                  if (!newVal) return;

                  await query.suspense();
                  const data = query.data.value;
                  queryClient.setQueryData(pathAndInput.value, data);
                  queryClient.removeQueries([pathAndInput.value[0], undefined]);
                  resolve();
                },
                { immediate: true }
              );
            });
          };

          const { ssrPrefetch } = queryDef(route, resolvedData);
          if (ssrPrefetch) {
            onServerPrefetch(async () => {
              if (query.fetchStatus.value === 'idle') {
                return getDependentSSRPromise();
              }
              try {
                await query.suspense();
              } catch {}
            });
          }

          watch(
            query.data,
            newData => {
              // @ts-ignore
              resolvedData[name as keyof T] = newData;
            },
            { immediate: true }
          );

          return [name, query];
        });

      return Object.fromEntries(entries) as unknown as UseTrpcQueryRecord<T>;
    },
    preload(route: RouteLocationNormalized, queryClient: QueryClient) {
      return new Promise<void>(resolve => {
        if (!window.navigator.onLine) return resolve();
        if (import.meta.env.SSR) return resolve();

        const client = useClient();

        const queryKeys = new Map<keyof T, PathAndInput<any>>();
        const resolvedData: LoaderDependencies<T> = {};

        function resolveQueryKeys() {
          objectEntries(options).forEach(([name, queryDef]) => {
            const config = queryDef(route, resolvedData);
            const isEnabled =
              !config.queryOptions || (config.queryOptions.enabled ?? true);
            if (!isEnabled) return;
            queryKeys.set(name, config.key as any);

            if (!resolvedData[name]) {
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              preloadQuery(name, config);
            }
          });

          const isDone = objectEntries(options).every(([name, queryDef]) => {
            const { waitPreloadBeforeNavigation } = queryDef(
              route,
              resolvedData
            );

            return !waitPreloadBeforeNavigation || resolvedData[name];
          });

          if (isDone) resolve();
        }

        function preloadQuery(name: keyof T, { key, queryOptions }: any) {
          const resolvedQueryOptions = {
            cacheTime: queryOptions?.cacheTime,
            staleTime: queryOptions?.staleTime || 30_000
          };

          queryClient
            .fetchQuery(
              key,
              () => (client as any).query(...key),
              resolvedQueryOptions
            )
            .then(data => {
              resolvedData[name] = data;
              resolveQueryKeys();
            });
        }

        resolveQueryKeys();
      });
    }
  };
};
