import type { ViteDevServer } from 'vite';
import type { DefaultOptions } from '../entities/options';

async function createViteServer(
  options: DefaultOptions,
): Promise<ViteDevServer | null> {
  const { root, isProd, isTest } = options;

  let vite: ViteDevServer | null = null;

  if (!isProd) {
    vite = await import('vite').then(i => i.createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
      },
    }))
  }

  return vite;
}

export default createViteServer;
