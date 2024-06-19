const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

module.exports = () => {
  const mode = process.env.NODE_ENV ?? 'production';

  return {
    mode,
    entry: './src/index.tsx',
    output: {
      publicPath: '/',
      path: path.join(__dirname, '/build'),
      filename: 'index.js',
    },
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        '@apis': path.resolve(__dirname, 'src/apis/'),
        '@assets': path.resolve(__dirname, 'src/assets/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        '@mocks': path.resolve(__dirname, 'src/mocks/'),
        '@pages': path.resolve(__dirname, 'src/pages/'),
        '@': path.resolve(__dirname, 'src/'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'ts-loader'],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
        styled: 'styled-components',
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.API_URL': JSON.stringify(
          mode === 'production'
            ? process.env.API_PROD_URL
            : process.env.API_DEV_URL
        ),
      }),
    ],
  };
};
