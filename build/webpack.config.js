const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    // 能够在引入模块时不带扩展名
    extensions: ['.ts', '.tsx', '.js', '.json'],
    // 引入模块时使用简单的前缀
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  // 是否生成，以及如何生成 source map
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: false,
    port: 9000,
  },
  // 如何处理项目中的不同类型的模块
  module: {
    rules: [{
      test: /\.tsx?$/,
      // 可以通过传入多个 loaders 以达到链式调用的效果，它们会从最后到最先被应用
      use: 'ts-loader',
      exclude: /node-modules/
    }]
  },
  plugins: [
    // 编译之前删除 dist 目录
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist']
    }),
    // 编译模板
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    })
  ]
}
