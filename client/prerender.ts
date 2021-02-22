/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';

const toAbsolute = (p: string) => path.resolve(__dirname, p);

function ensureDirExist(filePath: string) {
  const dirname = path.dirname(filePath);

  if (fs.existsSync(dirname)) { return true; }

  ensureDirExist(dirname);
  fs.mkdirSync(dirname);

  return true;
}

async function build() {
  const manifest = await import('./dist/static/ssr-manifest.json');
  const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');

  // @ts-ignore
  const render = await import('./dist/server/render.js');

  const files = await fg('**/*.{vue,md}', { cwd: path.resolve(process.cwd(), 'src/pages') });

  const routesToPrerender = files
    .filter((i) => !i.includes('['))
    .map((file) => {
      const name = file.replace(/\.(vue|md)$/, '').toLowerCase();
      return name === 'index' ? '/' : `/${name}`;
    });

  console.log(routesToPrerender);

  await Promise.all(routesToPrerender.map(async (url) => {
    const [appHtml, preloadLinks] = await render(url, manifest);

    const html = template
      .replace('<!--preload-links-->', preloadLinks)
      .replace('<!--app-html-->', appHtml);

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`;

    ensureDirExist(filePath);

    fs.writeFileSync(toAbsolute(filePath), html);

    console.log('pre-rendered:', filePath);
  }));

  fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'));
}

build();

export default build;
