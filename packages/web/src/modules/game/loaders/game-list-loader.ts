import { createPageLoader } from '~~/src/modules/core/utils/create-page-loader';

export const gameListLoader = createPageLoader({
  games: () => ({
    key: ['game.findAll'],
    ssrPrefetch: true
  })
});
