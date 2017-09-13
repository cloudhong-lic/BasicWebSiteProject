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
        test: /\.jsx?$/, // 检测哪些文件需要此loader，是一个正则表达式. 在jsx后加了问号可以加载js和jsx文件
        include: [path.join(__dirname, 'src')], // 包含哪些文件
        exclude: /node_modules/, // 忽略哪些文件
        loader: 'babel-loader',
        options: {
          plugins: [
            'transform-class-properties', // 用于解决(static propTypes = {})中等号的编译错误, 这是由于还没采用ES2017导致
            'transform-object-rest-spread',
            'transform-export-extensions',
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

  devtool: 'source-map',

  // 定义能够被打包的文件，文件后缀名
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
