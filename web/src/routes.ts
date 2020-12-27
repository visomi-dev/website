import fs from 'fs';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const pages = fs.readdirSync('./pages')
  .filter(filename => filename !== 'index.html')
  .map(filename => filename.replace('.html', ''));

const routes = pages.map(page => new HtmlWebpackPlugin({
  filename: `${page}/index.html`,
  template: `./pages/${page}.html`,
}));

routes.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './public/index.html',
}));

export default routes;
