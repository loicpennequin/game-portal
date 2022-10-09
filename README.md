# Game Portal Monorepo

This project is a monorepo for a game portal application. Users can play and add their own games to the platform by integrating them through a provided SDK.

## Prerequisites

- [NodeJS = 16.x](https://nodejs.org/en/)
- [Docker and docker-compose](https://docs.docker.com/get-docker/)

## Packages

- [@gp/web](packages/web/README.md)
- [@gp/sdk](packages/sdk/README.md)

Additional packages will be added later, providing simple example games for the portal

## Scripts

- `yarn web <script-name>`: run the seleced script from the `@gp/web` package
- `yarn sdk <script-name>`: run the seleced script from the `@gp/sdk` package

## Licence

[MIT](LICENSE)
