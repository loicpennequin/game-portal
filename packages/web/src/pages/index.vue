<template>
  <ul grid grid-cols="6" gap-4 m-t-8>
    <li grid-col-span="full sm:3">
      <StackCard
        name="Nuxt"
        description="The Hybrid Vue Framework"
        link="https://v3.nuxtjs.org/"
      />
    </li>

    <li grid-col-span="full sm:3">
      <StackCard
        name="UnoCSS"
        description="The instant on-demand Atomic CSS engine"
        link="https://uno.antfu.me/"
      />
    </li>

    <li grid-col-span="full sm:3">
      <StackCard
        name="Vue query"
        description="Hooks for fetching, caching and updating asynchronous data in Vue"
        link="https://vue-query.vercel.app"
      />
    </li>

    <li grid-col-span="full sm:3">
      <StackCard
        name="Prisma"
        description="Next-generation Node.js and TypeScript ORM"
        link="https://www.prisma.io/"
      />
    </li>

    <li grid-col-span="full sm:3">
      <StackCard
        name="tRPC"
        description="End-to-end typesafe APIs made easy"
        link="https://trpc.io/"
      />
    </li>

    <li grid-col-span="full sm:3">
      <StackCard
        name="Vitest"
        description="Blazing Fast Unit Test Framework"
        link="https://vitest.dev/"
      />
    </li>

    <li grid-col-span="full sm:3 lg:2">
      <StackCard
        name="Nuxt Auth"
        description="Zero-boilerplate authentication support for Nuxt 3"
        :is-ready="false"
      />
    </li>

    <li grid-col-span="full sm:3 lg:2">
      <StackCard
        name="Daria UI"
        description="No nonsense component library based on UnoCSS and Headless UI"
        :is-ready="false"
      />
    </li>
  </ul>
</template>
