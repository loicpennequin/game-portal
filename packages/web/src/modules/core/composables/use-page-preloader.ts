export const usePagePreloader = () => {
  const isPreloading = ref(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  router.beforeEach(async (to, from, next) => {
    if (!from.name) return next();
    isPreloading.value = true;

    await Promise.allSettled(
      to.matched.map(match => match.meta.loader?.preload(to, queryClient))
    );

    next();
    isPreloading.value = false;
  });

  return isPreloading;
};
