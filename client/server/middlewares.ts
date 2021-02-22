import path from 'path';

import type { RequestHandler } from 'express';

import type { DefaultOptions } from '../entities/options';

interface Result {
  compression: RequestHandler | null;
  serveStatic: RequestHandler | null;
}

async function middlewares(
  options: DefaultOptions,
): Promise<Result> {
  const { root, isProd } = options;

  const resolve = (p: string) => path.resolve(root, p);

  let compression: RequestHandler | null = null;
  let serveStatic: RequestHandler | null = null;

  if (isProd) {
    compression = await import('compression').then((i) => i.default());
    serveStatic = await import('serve-static').then((i) => i.default(
      resolve('dist/client'),
      { index: false },
    ));
  }

  return {
    compression,
    serveStatic,
  };
}

export default middlewares;
