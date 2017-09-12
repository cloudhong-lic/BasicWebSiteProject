import path from 'path';

module.exports = {
  entry: {
    public: './src/index.jsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist'
  },
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
  devtool: 'source-map',
  // resolve: {
  //     extensions: ['.js', '.jsx'],
  // },
};
