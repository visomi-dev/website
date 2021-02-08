/* eslint-disable no-param-reassign */
import * as fs from 'fs';
import * as path from 'path';

import * as Koa from 'koa';
import { createServer as createViteServer } from 'vite';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

async function createServer() {
  const app = new Koa();

  const vite = await createViteServer({
    server: { middlewareMode: true },
  });

  app.use((ctx, next) => vite.middlewares(ctx.req, ctx.res, next));

  app.use(async (ctx) => {
    const url = ctx.request.originalUrl;

    try {
      const entryFile = path.resolve(path.basename(__dirname), 'public/index.html');
      let template = fs.readFileSync(entryFile, 'utf-8');

      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule('/src/entry-server.js');

      const appHtml = await render(url);

      const html = template.replace('<!--ssr-outlet-->', appHtml);

      ctx.status = 200;
      ctx.type = 'text/html';
      ctx.body = html;
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      ctx.status = 500;
      ctx.body = e.message;
    }
  });

  app.listen(PORT);
}

createServer();
