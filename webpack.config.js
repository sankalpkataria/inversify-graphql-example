const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  externals: [ nodeExternals() ],
  devtool: 'source-map',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'ts-loader',
          options: {
            allowTsInNodeModules: true
          }
        }],
        exclude: /\.d\.ts$/,
      },
      {
        test: /\.d\.ts$/,
        use: [{
          loader: 'ignore-loader'
        }]
      }
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
      global: false,
      __dirname: false,
      __filename: false,
  }
};
