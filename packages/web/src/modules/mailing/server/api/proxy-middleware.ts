// ~/server/middleware/proxy.ts
import { defineEventHandler } from 'h3';
import { createProxyMiddleware } from 'http-proxy-middleware'; // npm install http-proxy-middleware@beta

const proxy = createProxyMiddleware('/maildev', {
  target: `http://localhost:1080`
});

export default defineEventHandler(async event => {
  await new Promise((resolve, reject) => {
    const next = (err?: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    };

    // @ts-ignore dumbass type defs
    proxy(event.req, event.res, next);
  });
});
