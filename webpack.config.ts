import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';

const env = Object.entries(dotenv.config().parsed || {}).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: JSON.stringify(value),
  }),
  {},
);

const enum Mode {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

const isProduction = process.env.NODE_ENV === Mode.PRODUCTION;
const isWDS = !!process.env.WEBPACK_DEV_SERVER;
const devtool = isWDS ? 'cheap-module-eval-source-map' : 'nosources-source-map';

const config: webpack.Configuration = {
  mode: isProduction ? Mode.PRODUCTION : Mode.DEVELOPMENT,
  devtool,
  entry: './src/index.tsx',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },

  plugins: [
    ...(isProduction ? [new CleanWebpackPlugin()] : []),
    new webpack.DefinePlugin({
      PRODUCTION: isProduction,
      ...env,
    }),
    new HtmlWebpackPlugin({ template: './index.html' }),
  ],

  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    compress: false,
    open: true,
  },

  optimization: {
    noEmitOnErrors: true,
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};

export default config;
