import path from 'path';
import fs from 'fs';

import type { RequestHandler } from 'express';
import type { ViteDevServer } from 'vite';

import type { DefaultOptions } from '../entities/options';

async function resolver(
  vite: ViteDevServer | null,
  options: DefaultOptions,
): Promise<RequestHandler> {
  const { isProd, root } = options;

  const resolve = (p: string) => path.resolve(root, p);

  const index = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : '';

  const manifest = isProd
    ? await import('../dist/client/ssr-manifest.json')
    : {};

  return async (req, res) => {
    try {
      const url = req.originalUrl;

      let template: string = '';
      let render;

      if (isProd) {
        template = index;

        // @ts-ignore
        render = await import('../dist/server/render.js').then((i) => i.default);
      }

      if (!isProd && vite) {
        template = fs.readFileSync(resolve('public/index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/server/render.ts')).default;
      }

      const [appHtml, preloadLinks] = await render(url, manifest);

      const html = template
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--app-html-->', appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (vite) { vite.ssrFixStacktrace(e); }
      // eslint-disable-next-line no-console
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  };
}

export default resolver;
