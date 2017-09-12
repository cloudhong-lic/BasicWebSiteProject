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
        query: {
          presets: ['react', 'latest']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
