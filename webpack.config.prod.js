import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: {
    public: './src/index.jsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        include: [path.join(__dirname, 'src')],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread',
            'transform-export-extensions',
            'istanbul'
          ],
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 versions', 'safari >= 7', 'ie >= 11'],
                }
              }
            ], // 使用babel-preset-env获取最新的ES版本支持
            'react',
          ]
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
