# @gp/web

## Prerequisites

- [NodeJS >= 16.0](https://nodejs.org/en/)
- [Docker and docker-compose](https://docs.docker.com/get-docker/)

## Stack reference

### Global

- Framework: [Nuxt 3](https://v3.nuxtjs.org/)
- Real time communication: not implemented, depends on serverless hosting or not

### Front End

- State Management: [Vue-Query](https://tanstack.com/query/v4/docs/adapters/vue-query)
- CSS Engine: [unoCSS](https://github.com/unocss/unocss) (still up to discussion)

### Back end

- ORM: [Prisma](https://www.prisma.io/docs/)
- Routing: [tRPC](https://trpc.io/)
- Dependency injection: [awilix](https://github.com/jeffijoe/awilix)

### Testing

- Unit / integration: [Vitest](https://vitest.dev/)
- E2E: not implemented

## Installation

Create .env file by copying .env-sample and fill out the missing values

```bash
cp .env-sample .env
```

Install dependencies

```bash
yarn install
```

Start the database container

```bash
yarn db:start
```

Generate your Prisma schema and sync it to your database

```
yarn db:sync
```

## Local development

Make sure your database container is running

```bash
yarn db:start
```

Start the dev server

```bash
yarn dev
```

You're good to go

Note: the dev server also starts a maildev server that is proxied by the app at `localhost:3000/maildev`

## Folder Structure

### /generated

Contains all generated files

### /layouts

see [Nuxt layouts](https://v3.nuxtjs.org/getting-started/views#layouts)

### /modules

This project is divided into multiple feature folders located in `src/modules`. They effectively act as [nuxt modules](https://v3.nuxtjs.org/guide/concepts/modules) and are setup to mirror what would be expected in the root folder of a nuxt application, like auto import of components, composables and plugins.

> ⚠️ If you want to register pages, middlewares or api routes you will need to do it manually, see [@nuxt/kit](https://v3.nuxtjs.org/guide/going-further/kit#nuxt-kit) helpers instead

In order to create a new module, you can use the scriptIBack end d

### /modules/domain

The business logic of a feature will reside here. This includes the use cases, services, dtos, data mappers, email templates...

### /modules/server/api

Special api routes and middlewares will reside here

```bash
yarn gen:module <name>
```

### /pages

see [Nuxt pages](https://v3.nuxtjs.org/getting-started/views#pages)

### /plugins

This directory is only here because nuxt-typed-router generates a file here (TODO: bonk the maintainer on the head and make a PR to change this). Please place your plugins in their respective feature modules.

### /utils

General utilities and types that can be used anywhere

## tRPC

To create a tRPC sub-router, create a file ending in `.trpc.ts` anywhere in the `src` folder. It's default export should be a router created with the utility `createRouter` in `src@/modules/trpc/utils/create-router`. All tRPC routes will be merged into the main router located at `src/generated/trpc-router.ts`

#### Exemple

```ts
import { createRouter } from '@/modules/trpc/utils/create-router';

export default createRouter().query('getThings', {
  resolve({ ctx }) {
    return ctx.getThingsUseCase();
  }
});
```

## Dependency Injection

the backend of the application is using a [dependency injection container](https://stackoverflow.com/questions/50718586/what-is-a-di-container) with the use of the `awilix` library. To add a dependency to the container, just create a file ending in `/injectable.ts`, anywhere in the `src` folder. Its default export will be added to the container, with the camelCased name of the file as its name.

The list of injectables and their return types will be located in `src/generated/injectables.ts`

> ⚠️ All injectables are registered using Awilix's `asFunction`, so your file should default export a function taking its dependencies as parameters and returning what you wish to expose in the DI container.

To create a DI Container in an API route / middleware, call the method `createEventContainer` from `src/modules/di/utils/create-container.ts`. **_You do not_** need to do this in tRPC procedures as the container is directly added to the `ctx`.

> The continer recieves by default the event information, meaning the request / response. The type is derived from h3's `CompatibilityEvent`, with a nullable session object in its context

#### Example

```ts
import {
  Config,
  AuthenticatedEvent,
  SomeService
} from '~~/src/generated/injectables';

type Injected = {
  config: Config;
  event: AuthenticatedEvent;
  someService: SomeService;
};

export default ({ config, event, someService }: Injected) => {
  return {
    doSomething() {
      someService.doSomething(config.foo);
      someService.doSomethingElse(config.bar);
    },
    doAnotherThing() {
      if (!event.context.session) return;

      someService.doSomeAuthenticatedThing();
    }
  };
};
```

> To regenerate the generated files (injectables, front end routes, trpc routers) without starting the dev server, use the script `yarn postinstall`.

## Scripts

- `yarn build`: builds the application
- `yarn dev`: starts the local development server
- `yarn preview`: runs the build application locally
- `yarn postinstall`: regenerates the auto generated files (among other things). You probably don't need to run it manually
- `yarn lint`: runs eslint
- `yarn format`: run prettier
- `yarn test`: run the unit tests, once
- `yarn test:watch`: run the unit tests in watch mode
- `yarn lint-staged`: runs eslint and prettier only on changed file. IT is automatically called with a pre-push hook. You don't need to run it manually
- `yarn gen:module`: generates a new feature module
- `yarn db:start`: starts the database docker container,
- `yarn db:stop`: stops the database docker container,
- `yarn db:sync`: synchronizes your prisma schema with the database. Don't forget to run it after all schema changes !,
- `yarn db:ui": starts the ui to visually see the content / edit your local database
