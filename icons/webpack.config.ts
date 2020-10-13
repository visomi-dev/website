// eslint-disable-next-line import/no-extraneous-dependencies
require('ts-node/register');

// eslint-disable-next-line import/first
import path from 'path';

export default {
  entry: './src/lib.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    filename: 'lib.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
