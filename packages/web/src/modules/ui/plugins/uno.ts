export default defineNuxtPlugin(async nuxt => {
  if (nuxt.ssrContext) return;

  const [
    { default: initUnocssRuntime },
    { default: uno },
    { default: attributify },
    { default: icons }
  ] = await Promise.all([
    import('@unocss/runtime'),
    import('@unocss/preset-uno'),
    import('@unocss/preset-attributify'),
    // @ts-ignore
    import('@unocss/preset-icons/browser')
  ]);
  initUnocssRuntime({
    defaults: {
      presets: [
        attributify(),
        uno(),
        icons({
          collections: {
            mdi: () =>
              // @ts-ignore
              import('@iconify-json/mdi/icons.json').then(i => i.default),
            carbon: () => import('@iconify-json/carbon').then(i => i.default)
          }
        })
      ]
    }
  });
});
