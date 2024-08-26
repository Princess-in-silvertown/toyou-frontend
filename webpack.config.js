const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

module.exports = () => {
  const mode = process.env.NODE_ENV ?? 'production';
  const publicPath = process.env.REACT_PUBLIC_PATH ?? '/';

  return {
    mode,
    entry: './src/index.tsx',
    output: {
      path: path.join(__dirname, '/build'),
      filename: 'bundle.js',
      publicPath,
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
        '@constants': path.resolve(__dirname, 'src/constants/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        '@mocks': path.resolve(__dirname, 'src/mocks/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
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
          test: /\.(png|jpe?g|gif|svg|ttf|woff)$/i,
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
        'process.env.PUBLIC_PATH': JSON.stringify(publicPath),
        'process.env.API_URL': JSON.stringify(
          mode === 'production'
            ? process.env.REACT_API_PROD_URL
            : process.env.REACT_API_DEV_URL
        ),
      }),
    ],
  };
};
