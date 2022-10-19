export const useSession = () => {
  const query = useTrpcQuery(['auth.session']);

  onServerPrefetch(async () => {
    try {
      await query.suspense();
    } catch {}
  });

  return query;
};
