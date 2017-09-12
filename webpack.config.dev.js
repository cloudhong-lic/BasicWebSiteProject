import path from 'path';

module.exports = {
  // 入口,定义要打包的文件
  entry: {
    public: './src/index.jsx'
  },

  // 出口，定义打包输出的文件；包括路径，文件名，还可能有运行时的访问路径（publicPath）参数
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist'
  },

  // 定义一些额外的插件
  plugins: [],

  // webpack将所有的资源都看做是模块，而模块就需要加载器；主要定义一些loaders,定义哪些后缀名的文件应该用哪些loader
  module: {
    loaders: [
      {
        test: /\.jsx$/, // 检测哪些文件需要此loader，是一个正则表达式
        include: [path.join(__dirname, 'src')],
        exclude: /node_modules/, // 忽略哪些文件
        loader: 'babel-loader',
        query: {
          presets: ['react', 'latest'] // 使用latest获取最新的ES版本支持(babel-preset-latest)
        }
      }
    ]
  },

  devtool: 'source-map',

  // 定义能够被打包的文件，文件后缀名
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
