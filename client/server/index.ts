/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';

import type { Express } from 'express';
import type { ViteDevServer } from 'vite';

import middlewares from './middlewares';
import resolver from './resolver';
import createViteServer from './createViteServer';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const IS_TEST = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
): Promise<{ app: Express, vite: ViteDevServer | null }> {
  const app = express();

  const vite = await createViteServer({ root, isProd, isTest: IS_TEST });
  const { serveStatic, compression } = await middlewares({ root, isProd, isTest: IS_TEST });

  if (!isProd && vite) {
    app.use(vite.middlewares);
  }

  if (isProd && compression && serveStatic) {
    app.use(serveStatic);
    app.use(compression);
  }

  app.use('*', await resolver(vite, { root, isProd, isTest: IS_TEST }));

  return {
    app,
    vite,
  };
}

function runServer(app: Express): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`🚀  Server listening on http://localhost:${PORT}`);
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function main() {
  const { app } = await createServer();
  await runServer(app);
}

if (!IS_TEST) {
  main();
}

export default createServer;
