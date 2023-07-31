const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        publicPath: 'auto',
        path: path.join(__dirname, 'dist'),
        filename: 'InvoiceApp.js',
      },
      module: {
        rules: [
        {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        },
        ],
    },
    plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'template.html'),
      filename: 'index.html',
    }),
  ],
  resolve: { 
    alias: { 
      Components : path.resolve(__dirname, 'src/components/'),
      Http : path.resolve(__dirname, 'src/http/'),
      Src : path.resolve(__dirname, 'src/'),
      Utils : path.resolve(__dirname, 'src/utils/'),
      Pages : path.resolve(__dirname, 'src/pages/'),
      Store : path.resolve(__dirname, 'src/store/')       
    } 
  } ,
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    port: 3000,
    historyApiFallback: true
  },
};