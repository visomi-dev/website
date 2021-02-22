/* eslint-disable import/no-extraneous-dependencies */
import { renderToString, SSRContext } from '@vue/server-renderer';

import createApp from '../src/createApp';

function renderPreloadLink(file: string) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  }
  if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`;
  }

  // TODO
  return '';
}

function renderPreloadLinks(modules: Set<string>, manifest: Record<string, string[]>) {
  let links = '';
  const seen = new Set<string>();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

async function render(url: string, manifest: Record<string, string[]>) {
  const { app, router } = createApp();

  router.push(url);

  await router.isReady();

  const ctx: SSRContext = {};
  const html = await renderToString(app, ctx);

  const preloadLinks = renderPreloadLinks(ctx.modules || new Set<string>(), manifest);

  return [html, preloadLinks];
}

export default render;
