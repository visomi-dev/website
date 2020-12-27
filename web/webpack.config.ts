import path from 'path';

import { WebpackConfiguration } from './entities';

import env from './src/environment';
import routes from './src/routes';

const mode = env.mode !== 'production' ? 'development' : 'production'

const config: WebpackConfiguration = {
  mode,
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [
    ...routes,
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: env.port,
  }
};

export default config;
