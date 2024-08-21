const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 추가
const { server } = require('typescript');

dotenv.config();

module.exports = () => {
  const mode = 'development';
  const publicPath = '/toyou-frontend/';

  return {
    mode,
    entry: './src/index.tsx',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
      publicPath: publicPath, // 'PUBLIC_URL' 사용
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
                publicPath: publicPath + 'assets/', // 'PUBLIC_URL'을 사용하여 파일 경로 설정
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
        filename: 'index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/mockServiceWorker.js', to: 'mockServiceWorker.js' },
        ],
      }),
      new HtmlWebpackPlugin({
        template: './public/404.html',
        filename: '404.html',
      }),
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify('http://localhost:3000/'),
      }),
    ],
  };
};
