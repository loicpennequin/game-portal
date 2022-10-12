export default defineNuxtPlugin(async nuxt => {
  if (nuxt.ssrContext) return;

  const [
    { default: initUnocssRuntime },
    { default: uno },
    { default: attributify }
  ] = await Promise.all([
    import('@unocss/runtime'),
    import('@unocss/preset-uno'),
    import('@unocss/preset-attributify')
  ]);
  initUnocssRuntime({
    defaults: {
      // @ts-ignore types are smoking crack
      presets: [attributify(), uno()]
    }
  });
  console.log('runtime loaded');
});
