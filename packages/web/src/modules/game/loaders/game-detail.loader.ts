import { createPageLoader } from '~~/src/modules/core/utils/create-page-loader';

export const gameDetailLoader = createPageLoader({
  game: route => ({
    key: ['game.findById', { id: route.params.id as string }],
    ssrPrefetch: true
  })
});
