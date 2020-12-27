import { Configuration as BaseWebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

export interface WebpackConfiguration extends BaseWebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

export interface Environment {
  mode: string;
  port: number;
}
