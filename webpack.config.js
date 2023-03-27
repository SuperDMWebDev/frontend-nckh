const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const port = process.env.PORT || 5000;
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  // Webpack configuration goes here
  mode: 'development',
  // change js to tsx
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: ASSET_PATH,
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      // First Rule
      {
        test: /\.(ts|js|jsx|json)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        },
        resolve: {
          extensions: ['', '.js', '.jsx']
        }
      },

      // Second Rule
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { sourceMap: true } }]
      },
      //third rule
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      //four rule
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        resolve: {
          extensions: ['.tsx', '.ts', '.js']
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },

          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new Dotenv(),
    new CopyPlugin({
      patterns: [
        { from: 'public/assets', to: 'assets' } //to the  root directory
      ]
    })
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  }
};
