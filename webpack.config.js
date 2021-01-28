const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'src/index.html'),
  filename: 'index.html',
  inject: 'body',
});
// const webpack = require('webpack');

module.exports = {
  mode: `${process.env.MODE}`,
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve('public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/,
          /coverage/,
          /tests/,
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        exclude: /\.module\.css$/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    HTMLWebpackPluginConfig,
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // plugins: [
  //   // fix "process is not defined" error:
  //   // (do "npm install process" before running the build)
  //   new webpack.ProvidePlugin({
  //     process: 'process/browser',
  //   }),
  // ],
};
